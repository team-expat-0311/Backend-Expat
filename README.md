# Expat API


#### Deployed API url
https://expat-journal.herokuapp.com/
***

# *Auth* 


## REGISTER A NEW USER

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

## LOGIN A USER

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

## GET ALL PHOTOS
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
---

# *PROTECTED ROUTES*
The remaining routes are all protected, they are unaccessable with providing the token generated during the login process.  They also require for the user to have the `role: expat`.

When making a call to any of these endpoints, you'll need to provide the following object as the second argument to the axios call:
```javascript
{
    headers: {
        Authorization: <token received on login>
    }
}
```

If something is wrong with the token, you'll get the following reponse:

**401 (Unauthorized)**
There are two reasons you might get this response.  First, if a token is not provided along with the request, you'll get the 401 error and the following message.
```javascript
{ message: 'You need a token to acccess this resource' }
```
If for some reason, the token provided does not match the token that is passed with the request, you'll get the following message.  This will happen if a token is provided, but not the correct token.  Usually, this is caused by the user trying to modify the token.
```javascript
{ message: 'Modifying my token are you? '}
```
---

If the user has the wrong role (anything besides 'expat'), you'll get the following response:

**403 (Forbidden)**
A 403 error means that the user does have the correct role to access the resource.  This resource is protected and only users with `role: expat` can access it.  If a user with any other role tries to access this endpoint, they'll get the following message:
```javascript
{ message: 'You do not have the right type of role to access this resource' }
```
---

## GET PHOTOS BY USER_ID
*HTTP METHOD: [GET]*
*URL: /api/photos/all/:id*

**Reponse**

**200 (OK)**
If you successfully fetch the photos, the endpoints will return an HTTP response with a status of 200 and a array of photo objects such as below.  These photos will only be the ones that belong to the :id parameter which is the user's id.  So `/api/photos/all/1` will return all of the photos in the database belonging to user 1.
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

---
## ADD A PHOTO

*HTTP METHOD: [POST]*
*URL: /api/photos/all/:id*

**Reponses**
---
**201 (Created)**
If the endpoint is hit with the correct token and the user has the correct role, the endpoint will send a 201 successful response and return a json like below:
```javascript
{
    "id": 15,
    "user_id": 1,
    "location": "kyoto",
    "description": "bamboo forest",
    "img_url": "https://dynaimage.cdn.cnn.com/cnn/w_1200/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F140807200033-1-sagano-bamboo-forest-super-tease.jpg",
    "created_at": "2019-03-11 23:04:23",
    "updated_at": "2019-03-11 23:04:23"
}
```

---
**400 (Bad Request)**
If the endpoint is hit with the correct token and the user has the correct role, but the photo object passed into the request does not have the required information `location` and `img_url`, the endpoint will return a response with status 400 and the following object:
```javascript
{ message: 'Please provide the user_id, location, and img_url for this photo' }
```

---
## DELETE A PHOTO
*HTTP METHOD: [DELETE]*
*URL: /api/photos/all/:photoId*

**Responses**
---
**204 (No Content)**
If the endpoint is hit with the correct token and the user has the correct role, and the photo with the passed id exists, the endpoint will return an HTTP response with a status code of 204.  No other information will be passed back to the client.

---

**404 (Not Found)**
If the endpoint is hit with the correct token and the user has the correct role, but a photo with the passed id does not exist in the database, the endpoint will return a response with a 400 status code and the following object:
```javascript
{ message: `A photo with id <photoId> could not be found.` }
```
---
## UPDATE A PHOTO
*HTTP METHOD: [PUT]*
*URL: /api/photos/all:photoId*

**Responses**
---
**200 (OK)**
If the endpoint is hit with the correct token and user has the correct role, and the photo with the passed id exists, the endpoints will return an HTTP response with a status code of 200.  A JSON object with the updated photo will be returned such as below:
```javascript
{
    "id": 10,
    "user_id": 1,
    "location": "kyoto",
    "description": "bamboo forest",
    "img_url": "https://via.placeholder.com/150",
    "created_at": "2019-03-12T14:46:54.465Z",
    "updated_at": "2019-03-12T14:46:54.465Z"
}
```
The `updated_at` value will be equal to the `created_at field` at the time of creation.  After this endpoint is hit, the `updated_at` value will be the time when the photo was updated.

---

**400 (Bad Request)**
If the endpoint is hit with the correct token and the user has the correct role, but the newPhoto object passed in does not have the fields `location` or `img_url` a 400 status code will be returned with the following error:
```javascript
{ message: 'Please provide a location and img_url for the photo' }
```

**404 (Not Found)**
If the endpoint is hit with the correct token and the user has the correct role, but a photo with the passed id does not exist in the database, the endpoint will return a response with a 400 status code and the following object:
```javascript
{ "message": "The photo with id of <photoId> does not exist." }
```








