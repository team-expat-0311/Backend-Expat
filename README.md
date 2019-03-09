# Expat API


### Deployed API url
API is not deployed yet, check back here soon...
***

## Auth Routes

### [POST] /api/auth/register

**Body**
| name | type | required | description |
| -----  | -----  | -------- | ----------- |
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

**Reponses**
***
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
    "message": "The username test2 already exists, please choose another username"
}
```
