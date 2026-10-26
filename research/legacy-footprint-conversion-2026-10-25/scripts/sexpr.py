"""Small lossless S-expression reader for conversion fixtures (not footprint runtime)."""
import re,json
class Atom(str):
 def __new__(cls,value,quoted=False):
  obj=super().__new__(cls,value);obj.quoted=quoted;return obj
def parse(text):
 tokens=re.findall(r'"(?:\\.|[^"\\])*"|[()]|[^\s()]+',text);stack=[[]]
 for t in tokens:
  if t=='(':n=[];stack[-1].append(n);stack.append(n)
  elif t==')':
   if len(stack)==1:raise ValueError('Unexpected closing parenthesis')
   stack.pop()
  else:stack[-1].append(Atom(json.loads(t) if t.startswith('"') else t,t.startswith('"')))
 if len(stack)!=1:raise ValueError('Unclosed S-expression')
 return stack[0]
def dump(x):
 if isinstance(x,list):return '('+' '.join(dump(a) for a in x)+')'
 return json.dumps(str(x),ensure_ascii=False) if getattr(x,'quoted',False) else str(x)
def children(n,kind):return [x for x in n if isinstance(x,list) and x and x[0]==kind]
def child(n,kind,default=None):return next(iter(children(n,kind)),default)
def clean(n):
 if not isinstance(n,list):return n
 return [clean(x) for x in n if not (isinstance(x,list) and x and x[0] in ['uuid','tstamp','tedit'])]
def pretty(n,indent=0):
 if not isinstance(n,list):return dump(n)
 if not any(isinstance(x,list) for x in n):return dump(n)
 prefix=[];rest=[]
 for x in n:
  if not isinstance(x,list) and not rest:prefix.append(x)
  else:rest.append(x)
 return '('+' '.join(dump(x) for x in prefix)+'\n'+'\n'.join(' '*(indent+2)+pretty(x,indent+2) for x in rest)+'\n'+' '*indent+')'
