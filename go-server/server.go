package main

import (
	"encoding/binary"
	"encoding/json"
	"github.com/andygrunwald/go-jira"
	"github.com/boltdb/bolt"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"log"
	"net/http"
	"strconv"
)

type bugBash struct {
	ID        int
	Name      string
	Ticket    string
	Version   string
	StartTime string
	EndTime   string
}

type info struct {
	Tickets []*ticket
	Score   *score
}

type score struct {
	P1         int
	P2         int
	P3         int
	P4         int
	Historical int
	Sum        float32
}

type ticket struct {
	Key         string
	Link        string
	Module      string
	Priority    string
	Assignee    string
	Status      string
	Summary     string
	Labels      []string
	FixVersions []string
}

func createOrLoadDB() *bolt.DB {
	db, err := bolt.Open("db/bug-bash-tool", 0600, nil)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func createBucket(db *bolt.DB, bucketName string) {
	db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucket([]byte("bug-bash"))
		// err := tx.DeleteBucket([]byte("bug-bash"))
		return err
	})
}

func findBugBashAndRender(db *bolt.DB, r render.Render) {
	db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))
		cursor := bucket.Cursor()
		var records []*bugBash
		for k, v := cursor.First(); k != nil; k, v = cursor.Next() {
			var bb bugBash
			json.Unmarshal(v, &bb)
			records = append(records, &bb)
		}
		r.JSON(200, map[string][]*bugBash{"records": records})
		return nil
	})
}

func createBugBashAndRender(db *bolt.DB, bb *bugBash, r render.Render) {
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))

		id, err := bucket.NextSequence()
		bb.ID = int(id)
		buf, err := json.Marshal(bb)
		if err != nil {
			log.Fatal(err)
		}

		r.JSON(200, map[string]*bugBash{"record": bb})
		return bucket.Put([]byte(itob(bb.ID)), buf)
	})
}

func updateBugBashAndRender(db *bolt.DB, bb *bugBash, r render.Render) {
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))
		buf, err := json.Marshal(bb)
		if err != nil {
			log.Fatal(err)
		}

		r.JSON(200, map[string]*bugBash{"record": bb})
		return bucket.Put(itob(bb.ID), buf)
	})
}

func destroyBugBashAndRender(db *bolt.DB, bb *bugBash, r render.Render) {
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))
		err := bucket.Delete(itob(bb.ID))
		if err != nil {
			log.Fatal(err)
		}

		r.JSON(200, map[string]*bugBash{"record": bb})
		return err
	})
}

func formatIssues(issues []jira.Issue, bb *bugBash) map[string]*info {
	results := make(map[string]*info)
	for _, issue := range issues {
		var fixVersions []string
		for _, version := range issue.Fields.FixVersions {
			fixVersions = append(fixVersions, version.Name)
		}
		t := ticket{issue.Key, "", bb.Name, issue.Fields.Priority.ID, issue.Fields.Assignee.Name, issue.Fields.Status.Name, issue.Fields.Summary, issue.Fields.Labels, fixVersions}
		t.Link = "http://jira.freewheel.tv/browse/" + issue.Key

		name := issue.Fields.Creator.Name
		if results[name] == nil {
			results[name] = &info{[]*ticket{&t}, &score{0, 0, 0, 0, 0, 0}}
		} else {
			results[name].Tickets = append(results[name].Tickets, &t)
		}
		for _, label := range issue.Fields.Labels {
			if label == "historical-debts" {
				results[name].Score.Historical++
			}
		}

		switch t.Priority {
		case "1":
			results[name].Score.P1++
			results[name].Score.Sum += 7
		case "2":
			results[name].Score.P2++
			results[name].Score.Sum += 3
		case "3":
			results[name].Score.P3++
			results[name].Score.Sum++
		case "4":
			results[name].Score.P4++
			results[name].Score.Sum += 0.5
		}
	}
	return results
}

func mergeResults(map1 map[string]*info, map2 map[string]*info) map[string]*info {
	for k, v := range map1 {
		var ts []*ticket
		var s score
		if map2[k] != nil {
			ts = append(v.Tickets, map2[k].Tickets...)
			s = score{v.Score.P1 + map2[k].Score.P1, v.Score.P2 + map2[k].Score.P2, v.Score.P3 + map2[k].Score.P3, v.Score.P4 + map2[k].Score.P4, v.Score.Historical + map2[k].Score.Historical, v.Score.Sum + map2[k].Score.Sum}
			map1[k] = &info{ts, &s}
		}
	}
	for k := range map2 {
		if map1[k] == nil {
			map1[k] = map2[k]
		}
	}
	return map1
}

func fetchIssuesFromJira(issue *jira.IssueService, bbs []*bugBash) map[string]*info {
	results := make(map[string]*info)
	for _, bb := range bbs {
		condition := "project = INK and parent = " + bb.Ticket + " and (created >= \"" + bb.StartTime + "\" and created <= \"" + bb.EndTime + "\") and type = \"INK Bug (sub-task)\" and (status != FINISHED or resolution not in (\"Duplicate\", \"By Design\", \"Cannot Reproduce\"))"
		issues, _, err := issue.Search(condition, nil)
		if err != nil {
			panic(err)
		}
		results = mergeResults(results, formatIssues(issues, bb))
	}

	return results
}

func findMemberAndRender(issue *jira.IssueService, db *bolt.DB, ids []int, r render.Render) {
	db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))
		var bbs []*bugBash
		for _, id := range ids {
			record := bucket.Get(itob(id))
			var bb bugBash
			json.Unmarshal(record, &bb)
			bbs = append(bbs, &bb)
		}
		r.JSON(200, map[string]*info(fetchIssuesFromJira(issue, bbs)))
		return nil
	})
}

func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}

func main() {
	jiraClient, err := jira.NewClient(nil, "http://jira.freewheel.tv/")
	if err != nil {
		panic(err)
	}

	res, err := jiraClient.Authentication.AcquireSessionCookie("deploy", "uideployzzz")
	if err != nil || res == false {
		panic(err)
	}

	server := martini.Classic()
	server.Use(render.Renderer())

	// init database settings
	db := createOrLoadDB()
	createBucket(db, "bug-bash")

	// implement bug-bash series routers
	server.Group("/bug-bash", func(router martini.Router) {
		router.Get("/", func(req *http.Request, r render.Render) {
			findBugBashAndRender(db, r)
		})

		router.Post("/new", func(req *http.Request, r render.Render) {
			decoder := json.NewDecoder(req.Body)
			var bb bugBash
			err := decoder.Decode(&bb)
			if err != nil {
				log.Fatal(err)
			}
			createBugBashAndRender(db, &bb, r)
		})

		router.Put("/update", func(req *http.Request, r render.Render) {
			decoder := json.NewDecoder(req.Body)
			var bb bugBash
			err := decoder.Decode(&bb)
			if err != nil {
				log.Fatal(err)
			}
			updateBugBashAndRender(db, &bb, r)
		})

		router.Delete("/destroy", func(req *http.Request, r render.Render) {
			decoder := json.NewDecoder(req.Body)
			var bb bugBash
			err := decoder.Decode(&bb)
			if err != nil {
				log.Fatal(err)
			}
			destroyBugBashAndRender(db, &bb, r)
		})
	})

	// implement member series routers
	server.Group("/member", func(router martini.Router) {
		router.Get("/", func(req *http.Request, r render.Render) {
			var bugBashIds []int
			for _, v := range req.URL.Query() {
				for _, str := range v {
					num, _ := strconv.Atoi(str)
					bugBashIds = append(bugBashIds, num)
				}
			}
			findMemberAndRender(jiraClient.Issue, db, bugBashIds, r)
		})
	})

	// implement root router
	server.Get("/", func(router render.Render) {
		router.HTML(200, "index", "bug-bash-tool")
	})
	server.RunOnAddr(":13109")
}
