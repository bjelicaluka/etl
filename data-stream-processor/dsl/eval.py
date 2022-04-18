def eval_statement(statement, stream):
  results = []
  op = statement.op
  iterator = range(len(stream)) if op != "last" else range(len(stream)-1, 0, -1)
  for i in iterator:
    obj = stream[i]
    result = {}
    if statement.where is not None \
      and not eval_multi_log_exp(statement.where.exp, obj):
      continue
    for prop in statement.props:
      target = prop.target if prop.target is not None else prop.src
      dynamic_set(target, result, eval_multi_exp(prop.src, obj))
    if op == "last" or op == "first":
      return statement.target, result
    results.append(result)
  return statement.target, results

op_registry = {
  "+": lambda a, b: a + b,
  "-": lambda a, b: a - b,
  "*": lambda a, b: a * b,
  "/": lambda a, b: a / b,
}

rel_op_registry = {
  "==": lambda a, b: a == b,
  "<=": lambda a, b: a <= b,
  ">=": lambda a, b: a >= b,
  "!=": lambda a, b: a != b,
  ">": lambda a, b: a > b,
  "<": lambda a, b: a < b,
}

log_op_registry = {
  "and": lambda a, b: a and b,
  "or": lambda a, b: a or b,
}

def contains(target, arg):
  try:
    return arg in target
  except:
    return False


def startswith(target, arg):
  try:
    return target.startswith(arg)
  except:
    return False


def endswith(target, arg):
  try:
    return target.endswith(arg)
  except:
    return False


def exists(target):
  try:
    return target is not None
  except:
    return False


built_in_fn_registry = {
  "contains": contains,
  "startswith": startswith,
  "endswith": endswith,
  "exists": exists,
}


def eval_multi_exp(exp, obj):
  if type(exp) is str:
    return eval_exp(exp, obj)
  elif exp.exp is not None:
    return eval_exp(exp.exp, obj)
  else:
    return op_registry[exp.op](eval_exp(exp.left, obj), eval_exp(exp.right, obj))


def eval_exp(exp, obj):
  if type(exp) is str:
    return dynamic_access(exp, obj)
  elif exp.mexp is not None:
    return eval_multi_exp(exp.mexp, obj)
  elif exp.rexp is not None:
    return op_registry[exp.op](eval_operand(exp.left, exp.leftLit, obj), eval_exp(exp.rexp, obj))
  else:
    return op_registry[exp.op](eval_operand(exp.left, exp.leftLit, obj), eval_operand(exp.right, exp.rightLit, obj))

def eval_multi_log_exp(exp, obj):
  if exp.exp is not None:
    return eval_log_exp(exp.exp, obj)
  else:
    return log_op_registry[exp.op](eval_log_exp(exp.left, obj), eval_log_exp(exp.right, obj))


def eval_log_exp(exp, obj):
  if exp.exp is not None:
    return eval_rel_exp(exp.exp, obj)
  elif exp.mexp is not None:
    return eval_multi_log_exp(exp.mexp, obj)
  elif exp.fn is not None:
    return eval_fn_call(exp.fn, obj)
  else:
    return log_op_registry[exp.op](eval_rel_exp(exp.left, obj), eval_log_exp(exp.right, obj))


def eval_fn_call(fn, obj):
  args = [eval_operand(param.prop, param.lit, obj) for param in fn.parameters]
  return built_in_fn_registry[fn.name](*args)


def eval_rel_exp(exp, obj):
  return rel_op_registry[exp.op](eval_operand(exp.left, exp.leftLit, obj), eval_operand(exp.right, exp.rightLit, obj))


def eval_operand(property, literal, obj):
  return dynamic_access(property, obj) if property is not None else eval_literal(literal)


def eval_literal(lit):
  return lit.strip("'\"") if type(lit) == str else lit


def dynamic_access(keyString, obj):
  keys = keyString.split(".")
  curr = obj
  for i in range(len(keys)):
    key = keys[i]
    if key == "_": continue
    if type(curr) is list:
      curr = {f"{i}": value for i, value in enumerate(curr)}
    if key in curr:
      curr = curr[key]
    else:
      return None
  return curr

def dynamic_set(keyString, obj, value):
  keys = keyString.split(".")
  curr = obj
  for i in range(len(keys)):
    key = keys[i]
    if key not in obj:
      curr[key] = {}
    if i == len(keys) - 1:
      curr[key] = value
    curr = curr[key]
  return curr