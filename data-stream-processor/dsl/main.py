from eval import eval_statement
from textx import metamodel_from_file

meta_model = metamodel_from_file('grammar.tx')

model = meta_model.model_from_file("test.etl")


stream = [
  {
    "firstName": "Luka",
    "lastName": "Bjelica"
  },
  {
    "firstName": "Luka",
    "lastName": "Test",
    "list": [
      'L'
    ]
  },
  {
    "accountId": 1,
    "name": "test"
  }
]



for statement in model.statements:
  target, result = eval_statement(statement, stream)
  print(target, result)
