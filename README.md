
# Authentication API

This is a Noje.js based Authenticaton API, which can be used with any application for Login and Authentication purposes.



## API Reference

### Register a new user

```http
  POST /api/user/register
```

Sample request body:
```http
  { 
    "name": "sampleName",
    "email": "sampleEmail@gmail.com",
    "password": "samplePassword",
  }
```

Success response:
```http
  {
    "status": "success",
    "user": "636f8c6ebe9c8d7df9b5fb99"
  }
```

### Login a user
```http
  POST api/user/login
```
Sample request body:
```http
  {
    "email": "sampleEmail@gmail.com",
    "password": "samplePassword",
  }
```
Success response:
```http
  {
    "token": "sampleToken"
  }
```

### Access to protected data

```http
  GET api/posts
```

| Headers | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `auth-token` | `string` | **Required**  |


