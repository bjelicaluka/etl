package test

import (
	"stream-processor/src"
	"testing"
)

func TestTransformEmptyStreamAndRules(t *testing.T) {
	stream := `[]`
	rules := ``
	expected := `[]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformEmptyStream(t *testing.T) {
	stream := `[]`
	rules := `take first User select firstName;`
	expected := `[{"type": "User", "result": []}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformAllUserFirstName(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica"},
		{"firstName": "Pera", "lastName": "Peric"}
	]`

	rules := `take all User select firstName;`
	expected := `[{"type": "User", "result": [{"firstName": "Luka"}, {"firstName": "Pera"}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformAllUserFirstNameAsName(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica"},
		{"firstName": "Pera", "lastName": "Peric"}
	]`

	rules := `take all User select firstName as name;`
	expected := `[{"type": "User", "result": [{"name": "Luka"}, {"name": "Pera"}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformFirstUserFirstName(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica"},
		{"firstName": "Pera", "lastName": "Peric"}
	]`

	rules := `take first User select firstName;`
	expected := `[{"type": "User", "result": {"firstName": "Luka"}}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformLastUserFirstName(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica"},
		{"firstName": "Pera", "lastName": "Peric"}
	]`

	rules := `take last User select firstName;`
	expected := `[{"type": "User", "result": {"firstName": "Pera"}}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformMultipleStatements(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica", "type": "User"},
		{"firstName": "Pera", "lastName": "Peric", "type": "User"},
		{"username": "luka023", "accountId": 1},
		{"username": "pera021", "accountId": 2}
	]`

	rules := `
		take all User where type == "User" select firstName;
		take all Account where type != "User" select accountId;
	`
	expected := `[{"type": "User", "result": [{"firstName": "Luka"}, {"firstName": "Pera"}]}, {"type": "Account", "result": [{"accountId": 1}, {"accountId": 2}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformLogicalExpressions(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica", "type": "User"},
		{"firstName": "Pera", "lastName": "Peric", "type": "User"},
		{"username": "luka023", "accountId": 1},
		{"username": "pera021", "accountId": 2}
	]`

	rules := `
		take all User where type == "User" and startswith(firstName, "Lu") or endswith(lastName, "ic") select firstName;
	`
	expected := `[{"type": "User", "result": [{"firstName": "Luka"}, {"firstName": "Pera"}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformLogicalExpressionsParentheses(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica", "type": "User"},
		{"firstName": "Pera", "lastName": "Peric", "type": "User"},
		{"username": "luka023", "accountId": 1},
		{"username": "pera021", "accountId": 2}
	]`

	rules := `
		take all User where type == "User" and (startswith(firstName, "Lu") or endswith(lastName, "ic")) select firstName;
	`
	expected := `[{"type": "User", "result": [{"firstName": "Luka"}, {"firstName": "Pera"}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformLogicalExpressionsContains(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica", "type": "User"},
		{"firstName": "Pera", "lastName": "Peric", "type": "User"},
		{"username": "luka023", "accountId": 1},
		{"username": "pera021", "accountId": 2}
	]`

	rules := `
		take all User where type == "User" and contains(lastName, "ic") select firstName;
	`
	expected := `[{"type": "User", "result": [{"firstName": "Luka"}, {"firstName": "Pera"}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformLogicalExpressionsExists(t *testing.T) {
	stream := `[
		{"firstName": "Luka", "lastName": "Bjelica", "type": "User"},
		{"firstName": "Pera", "lastName": "Peric", "type": "User"},
		{"username": "luka023", "accountId": 1},
		{"username": "pera021", "accountId": 2}
	]`

	rules := `
		take all User where exists(firstName) select firstName;
	`
	expected := `[{"type": "User", "result": [{"firstName": "Luka"}, {"firstName": "Pera"}]}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformListElements(t *testing.T) {
	stream := `[
		{"list": [{"a": 1}]}
	]`

	rules := `
		take first A where exists(list.0) select list.0 as elem;
	`
	expected := `[{"type": "A", "result": {"elem": {"a": 1}}}]`

	testTransformFor(stream, rules, expected, t)
}

func TestTransformRootListElements(t *testing.T) {
	stream := `[
		[{"a": 1}]
	]`

	rules := `
		take first A where exists(_.0) select _.0 as elem;
	`
	expected := `[{"type": "A", "result": {"elem": {"a": 1}}}]`

	testTransformFor(stream, rules, expected, t)
}

func testTransformFor(stream string, rules string, expected string, t *testing.T) {
	src.DslProjectPath = "../dsl"

	result, err := src.Transform(stream, rules)

	if err != nil {
		t.Fatalf(`Failed %s %s`, err, result)
		return
	}
	if expected != result || err != nil {
		t.Fatalf(`Expected: %s, Result: %s`, expected, result)
	}
}
