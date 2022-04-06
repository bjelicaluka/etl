package store

import (
	ravendb "github.com/ravendb/ravendb-go-client"
)

func GetDocumentStore(databaseName string) (*ravendb.DocumentStore, error) {
	serverNodes := []string{"http://localhost:8080"}
	store := ravendb.NewDocumentStore(serverNodes, databaseName)
	if err := store.Initialize(); err != nil {
		return nil, err
	}
	return store, nil
}
