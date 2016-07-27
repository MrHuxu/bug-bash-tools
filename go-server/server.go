package main

import (
	"encoding/binary"
	"encoding/json"
	"github.com/boltdb/bolt"
	"github.com/go-martini/martini"
	"github.com/martini-contrib/render"
	"log"
	"net/http"
)

type bugBash struct {
	ID        int
	Name      string
	Ticket    string
	Version   string
	StartTime string
	EndTime   string
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

func createBugBash(db *bolt.DB, bb *bugBash) {
	db.Update(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))

		id, err := bucket.NextSequence()
		bb.ID = int(id)
		buf, err := json.Marshal(bb)
		if err != nil {
			log.Fatal(err)
		}

		return bucket.Put([]byte(itob(bb.ID)), buf)
	})
}

func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
}

func findAndRenderBugBash(db *bolt.DB, r render.Render) {
	db.View(func(tx *bolt.Tx) error {
		bucket := tx.Bucket([]byte("bug-bash"))
		cursor := bucket.Cursor()
		var records []*bugBash
		for k, v := cursor.First(); k != nil; k, v = cursor.Next() {
			var bb bugBash
			json.Unmarshal(v, &bb)
			records = append(records, &bb)
		}
		log.Println("=======", records)
		r.JSON(200, map[string][]*bugBash{"records": records})
		return nil
	})
}

func main() {
	server := martini.Classic()
	server.Use(render.Renderer())

	// init database settings
	db := createOrLoadDB()
	createBucket(db, "bug-bash")

	// implement bug-bash series routers
	server.Group("/bug-bash", func(r martini.Router) {
		r.Get("/", func(req *http.Request, r render.Render) {
			findAndRenderBugBash(db, r)
		})

		r.Post("/new", func(req *http.Request) {
			decoder := json.NewDecoder(req.Body)
			var bb bugBash
			err := decoder.Decode(&bb)
			if err != nil {
				log.Fatal(err)
			}
			createBugBash(db, &bb)
		})

		r.Put("/update", func(req *http.Request) {
			log.Println(req)
		})

		r.Delete("/destroy", func(req *http.Request) {
			log.Println(req)
		})
	})

	// implement member series routers
	server.Group("/member", func(r martini.Router) {
		r.Get("/", func(req *http.Request) {
			log.Println(req)
		})
	})

	// implement root router
	server.Get("/", func(r render.Render) {
		r.HTML(200, "hello", "jeremy")
	})
	server.RunOnAddr(":13109")
}
