import json
import sys
from eval import eval_statement
from textx import metamodel_from_file


if __name__ == "__main__":
  stream = json.loads(sys.argv[1]) if len(sys.argv) >= 2 else []
  rules = sys.argv[2] if len(sys.argv) >= 3 else ''

  grammar_path = sys.argv[3] if len(sys.argv) >= 4 else 'grammar.tx'
  
  meta_model = metamodel_from_file(grammar_path)
  model = meta_model.model_from_str(rules)

  results = []
  if type(model) != str and model.statements is not None:
    for statement in model.statements:
      type, result = eval_statement(statement, stream)
      results.append({ "type": type, "result": result })
  print(results)
