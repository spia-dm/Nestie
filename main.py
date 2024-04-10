#uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import nltk
from nltk.metrics.distance import jaro_winkler_similarity

app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/api/search")
async def run(req_body: dict):
    new_data = []
    for i in req_body["data"]:
        temp=[]
        temp2=i["house_name"].split(" ")
        for j in temp2:
            temp.append(j)
        temp3=i["location"].split(" ")
        for k in temp3:
            temp.append(j)
        temp4=i["size"].split(" ")
        for l in temp4:
            temp.append(l)
        temp.append(i["price"])
        temp5=i["description"].split(" ")
        for m in temp5:
            temp.append(m)
        new_data.append(temp)
    new_data2=[]
    for i in new_data:
        sum=0
        for j in i:
            sum+=jaro_winkler_similarity(req_body["search"],j)
        new_data2.append(sum/len(i))
    t=1
    new_data=[]
    for i in new_data2:
        new_data.append({t:i})
        t+=1
    sorted_data = sorted(new_data, key=lambda x: list(x.values())[0], reverse=True)
    new_data=[]
    for i in sorted_data:
        for j in i.keys():
            new_data.append((req_body["data"][j-1]))
    return new_data    