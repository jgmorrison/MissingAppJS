from pymongo import MongoClient
import json

conn = MongoClient('localhost', 27017)

db = conn['missing_persons']

coll = db['charley']

json_list = []
states = open("list_of_states.txt", "r")
for state in states:
	data = coll.find({"State" : state.strip("\n")})
	cities = []
	for item in data:
		if item["City"] != "N/A":
			cities.append(str(item["City"]))

	city_state_dict = {}
	clean = list(sorted(set(cities)))
	city_state_dict["state"] = state.strip("\n")
	city_state_dict["cities"] = clean
	json_list.append(city_state_dict)


j = json.dumps(json_list)

file = open("cityStateInfo.json", "w")
with file as f:
	f.write(j)
