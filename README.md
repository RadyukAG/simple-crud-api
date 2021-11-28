# simple-crud-api

## This API can be used to store info about persons.
## API path `/person`:
    * **GET** `/person` or `/person/${personId}` should return all persons or person with corresponding `personId`
    * **POST** `/person` is used to create record about new person and store it in database
    * **PUT** `/person/${personId}` is used to update record about existing person
    * **DELETE** `/person/${personId}` is used to delete record about existing person from database
## Persons are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

## To run app in dev mode use 'npm run start:dev'. To run app in prod mode use 'npm run start:prod'.
## You can use Postman or another app for API calls. No auth needed.
## Server will be listening port 8000, or port you've set in .env. There is an example of .env (.env.example).
## So API url can be 'localhost:3001/person'

## For Postman testing you can use small collection from 'for testing/simple_crud_api/postman_collection.json'.