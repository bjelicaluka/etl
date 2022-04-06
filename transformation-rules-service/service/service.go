package service

import (
	"reflect"
	"transformation-rules-service/store"
	"transformation-rules-service/types"

	"github.com/ravendb/ravendb-go-client"
)

type TransformationRulesService struct {
	documentStore *ravendb.DocumentStore
}

func New() (TransformationRulesService, error) {
	documentStore, err := store.GetDocumentStore("TransformationRules")
	documentStore.GetConventions().IdentityPartsSeparator = "-"
	if err != nil {
		return TransformationRulesService{}, err
	}
	return TransformationRulesService{
		documentStore: documentStore,
	}, nil
}

func GetAll(svc *TransformationRulesService) ([]*types.TransformationRule, error) {
	session, err := svc.documentStore.OpenSession("")
	if err != nil {
		return nil, err
	}

	q := session.QueryCollectionForType(reflect.TypeOf(&types.TransformationRule{}))

	var transformationRules []*types.TransformationRule
	err = q.GetResults(&transformationRules)
	if err != nil {
		return nil, err
	}

	return transformationRules, nil
}

func Get(svc *TransformationRulesService, id string) (*types.TransformationRule, error) {
	session, err := svc.documentStore.OpenSession("")

	var transformationRule *types.TransformationRule
	err = session.Load(&transformationRule, id)
	if transformationRule == nil || err != nil {
		return nil, err
	}

	return transformationRule, nil
}

func Create(svc *TransformationRulesService, transformationRule *types.TransformationRule) (*types.TransformationRule, error) {
	session, err := svc.documentStore.OpenSession("")
	if err != nil {
		return nil, err
	}

	errStore := session.Store(transformationRule)
	errSave := session.SaveChanges()
	if errStore != nil || errSave != nil {
		return nil, err
	}

	return transformationRule, nil
}

func Update(svc *TransformationRulesService, id string, transformationRule *types.TransformationRule) (*types.TransformationRule, error) {
	session, err := svc.documentStore.OpenSession("")
	if err != nil {
		return nil, err
	}

	var existingTransformationRule *types.TransformationRule
	err = session.Load(&existingTransformationRule, id)
	if existingTransformationRule == nil || err != nil {
		return nil, err
	}

	existingTransformationRule.Rules = transformationRule.Rules

	errStore := session.Store(existingTransformationRule)
	errSave := session.SaveChanges()
	if errStore != nil || errSave != nil {
		return nil, err
	}

	return existingTransformationRule, nil
}

func Delete(svc *TransformationRulesService, id string) (*types.TransformationRule, error) {
	session, err := svc.documentStore.OpenSession("")
	if err != nil {
		return nil, err
	}

	var existingTransformationRule *types.TransformationRule
	err = session.Load(&existingTransformationRule, id)
	if existingTransformationRule == nil || err != nil {
		return nil, err
	}

	errDelete := session.Delete(existingTransformationRule)
	errSave := session.SaveChanges()
	if errDelete != nil || errSave != nil {
		return nil, err
	}

	return existingTransformationRule, nil
}
