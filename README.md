# Expat API


#### Deployed API url
https://expat-journal.herokuapp.com/
***

# *Auth* 


## Register a new user

*HTTP MEHTHOD: [POST]* 
*URL: /api/auth/register*


**Schema:**

| name | type | required | description |
| :----  | :-----  | :-------- | :----------- |
| username | string | yes | username (unique) |
| password | string | yes | password |
| name | string | yes | user's first name |
| role | string | yes | either viewer or traveler |
| age | integer | no | user's age |
| location | string | no | user's location |

*Example*

```javascript
{
    "username": "test2",
	"password": "test",
	"name": "dan",
	"role": "viewer",
	"age": 30,
	"location": "Tokyo"
}
```

**Reponses:**
---
**201 (OK)**
If you successfully register a user, the endpoint will return an HTTP reponse with status code 201 and a JSON representation of the new user that was created such as below
```javascript
{
    "id": 3,
    "username": "test2",
    "name": "dan",
    "role": "viewer",
    "age": 30,
    "location": "Tokyo"
}
```
***
**404 (Bad Request)**
If you try to register a user without a username, password, role, or name, the endpoint will return an HTTP response with status code 404 and a message such as below
```javascript
{
    "message": "Please provide at least username, password, role, name for a new user"
}
```
***
**500 (Internal Server Error)**
The most likely cause for this is registering a duplicate username.  You'll get back an HTTP response with status cod 500 and the following object
```javascript
{
    "message": "The username <username> already exists, please choose another username"
}
```
***

## Login a user

*HTTP MEHTHOD: [POST]* 
*URL: /api/auth/login*


**Schema:**

| name | type | required | description |
| :----  | :-----  | :-------- | :----------- |
| username | string | yes | username (unique) |
| password | string | yes | password |

**Reponses:**
---
**200 (OK)**
If you successfully login a user, the endpoing will return a status code of 200 and an object with a welcome message, and a json web token.

The object returned will look like:
```javascript
{
    "message": "Welcome <username>!, here's your token",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InRlc3QxIiwicm9sZSI6InZpZXdlciIsImlhdCI6MTU1MjE1MDE4MSwiZXhwIjoxNTUyMjM2NTgxfQ.xAMg_VX1LstUcL0PJLJYJGEwZ9dkehHx_ZWAc4UzT5s"
}
```

After a succesfful response, you'll want to store the token in localStorage, for later use in accessing protected resources.

---
**401 (Unauthorized)**
If you try to login a user that does not exist in the database, or the password is incorrect, you'll get this response from the endpoint with a 401 status code.  The object returned will be:
```javascript
{
    "message": "Invalid Credentials"
}
```

***
# *Photos*

## Get all photos
*HTTP MEHTHOD: [GET]*
*URL: /api/photos/all*

**Reponses**
---
**200 (OK)**
If you successfully fetch the photos, the endpoints will return an HTTP response with a status of 200 and a array of photo objects such as below
```javascript
[
    {
        "id": 1,
        "user_id": 1,
        "location": "tokyo",
        "description": "downtown tokyo from above",
        "img_url": "https://cdn.japantimes.2xx.jp/wp-content/uploads/2018/07/n-tokyo-a-20180715-870x580.jpg",
        "created_at": "2019-03-10 23:55:12",
        "updated_at": "2019-03-10 23:55:12"
    },
]
```




