import json

months = [{"month" : "January", "numberOfDays" : 31},
	{"month" : "February", "numberOfDays" : 29},
	{"month" : "March", "numberOfDays" : 31},
	{"month" : "April", "numberOfDays" : 30},
	{"month" : "May", "numberOfDays" : 31},
	{"month" : "June", "numberOfDays" : 30},
	{"month" : "July", "numberOfDays" : 31},
	{"month" : "August", "numberOfDays" :31},
	{"month" : "September", "numberOfDays" : 30},
	{"month" : "October", "numberOfDays" : 31},
	{"month" : "November", "numberOfDays" : 30},
	{"month" : "December", "numberOfDays" : 31}
]

months_json = json.dumps(months)

with open("months.json", "w") as f:
    f.write(months_json)
