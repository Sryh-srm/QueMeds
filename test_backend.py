import sys
sys.path.insert(0, 'backend')
from app import app
print('Backend app loaded successfully')
print('Routes:', [r.path for r in app.routes])