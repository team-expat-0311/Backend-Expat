# Expat API


#### Deployed API url
API is not deployed yet, check back here soon...
***

# Auth 

## Register a new user

#### HTTP MEHTHOD: [POST] 
#### URL: /api/auth/register


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
    "username": "test1",
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
    "id": 2,
    "username": "test2",
    "password": "$2a$08$4bHCx7Zou/vdsGTU6WyxBuqRWKnzBUN6e9awNAz2KMSe.C88PvuyO",
    "name": "dan",
    "role": "viewer",
    "age": 30,
    "location": "Tokyo",
    "created_at": "2019-03-09 15:58:59",
    "updated_at": "2019-03-09 15:58:59"
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
    "error": {
        "errno": 19,
        "code": "SQLITE_CONSTRAINT"
    },
    "message": "The username <username> already exists, please choose another username"
}
```
***

## Login a user

#### HTTP MEHTHOD: [POST] 
#### URL: /api/auth/login


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
