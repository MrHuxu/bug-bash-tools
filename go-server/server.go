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

func itob(v int) []byte {
	b := make([]byte, 8)
	binary.BigEndian.PutUint64(b, uint64(v))
	return b
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
			findBugBashAndRender(db, r)
		})

		r.Post("/new", func(req *http.Request, r render.Render) {
			decoder := json.NewDecoder(req.Body)
			var bb bugBash
			err := decoder.Decode(&bb)
			if err != nil {
				log.Fatal(err)
			}
			createBugBashAndRender(db, &bb, r)
		})

		r.Put("/update", func(req *http.Request, r render.Render) {
			decoder := json.NewDecoder(req.Body)
			var bb bugBash
			err := decoder.Decode(&bb)
			if err != nil {
				log.Fatal(err)
			}
			updateBugBashAndRender(db, &bb, r)
		})

		r.Delete("/destroy", func(req *http.Request, r render.Render) {
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
