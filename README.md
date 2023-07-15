
# Intersecting Points
API for finding Intersecting Points between coordinates.




### API Reference

##### Takes linestring (GeoJSON) as body and returns intersecting points. and if in case of any errors, returns an appropriate error message with an error status code. 

```http
  points /api/points
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authtoken` | `string` | **Required**. For Auth Check |

Checks first if auth header is present or not. Then Checks for if the body schema is the same which is expected to come. At last returns the result.



### Dependencies Used

`turf`
`express`
`bodyparser`
`nodemon`
`jsonschema`


### How to Test
1) In folder run npm i first & run nodemon app.js
2) hit https://intersection-point-production.up.railway.app/api/points/api/points endpoint on postman
3) Enter the required Header and a valid body containing LineString(JSON)


