from pymongo import MongoClient
import json

conn = MongoClient('localhost', 27017)

db = conn['missing_persons']

coll = db['charley']

citydic = {}
states = open("states.txt", "r")
for state in states:
	data = coll.find({"State" : state.strip("\n")})
	cities = []
	for item in data:
		cities.append(str(item["City"]))

	clean = list(sorted(set(cities)))
	citydic[state] = clean



j = json.dumps(citydic)

file = open("cityState.json", "w")
with file as f:
	f.write(j)
