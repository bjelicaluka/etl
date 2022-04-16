package store

import (
	"os"

	ravendb "github.com/ravendb/ravendb-go-client"
)

func GetDocumentStore(databaseName string) (*ravendb.DocumentStore, error) {
	serverNodes := []string{os.Getenv("RAVENDB_URL")}
	store := ravendb.NewDocumentStore(serverNodes, databaseName)
	if err := store.Initialize(); err != nil {
		return nil, err
	}
	return store, nil
}
