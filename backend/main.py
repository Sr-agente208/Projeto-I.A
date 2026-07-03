from fastapi import FastAPI
app=FastAPI()
@app.get('/')
def root():
 return {'app':'ASTRA 208'}
