
# MedSoft Backend

MedSoft is a website that shows us how to get more information about medicine world. This repository is backend side of the project. 

I have tried to use different methods to get data more efficiently. We have worked with approximately 3k+ data. Nearly all the medicine data has 700+ line data. I put some postman request screenshots for examining


## Language/Technologies/Libraries

* Javascript  
* Node JS
* Express JS
* body-parser
* cors
* dotenv
* mongodb
* morgan
* node-cache
* nodemon
* swagger-ui-express
* yamljs
* jest
* mongodb-memory-server
* mongoose
* supertest
  
## API USAGE
To see API documantation of the project, please go to "http://localhost:${PORT}/api-docs/#/" after you run

#### Get All Medicines

```http
  GET api/alldrugs
```


#### Get a single Medicine

```http
  GET api/singledrug/${id}
```

| Param     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Object id of medicine |


#### Get a single Medicine by Name

```http
  GET /api/showdrug?name=${name}
```

| Param     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | The name of the medicine |

#### Create a Medicine

```http
  POST /api/createdrug
```

| Body     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Medicine`      | `Drug` | A medicine/drug object |

#### Update a Medicine

```http
  PUT /api/updatedrug/${id}
```

| Body     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Medicine`      | `Drug` | A medicine/drug object |
| Param     | Type     | Description                       |
| `id`      | `String` | The object id of the medicine |



#### Delete a Medicine

```http
  DELETE /api/deletedrug/${id}
```

| Param     | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `String` |The object id of the medicine |






  
## Tests

If you want to run test, please make sure you are inside of backend folder. Then run the command:

```bash
  npm run test
```

  
## Install 

To download project:

Please clone the project
```bash 
    git clone https://github.com/drugBankVTYS/backend.git
```
Then open the folder and run commands below
```bash 
    cd backend
    npm install 
  ```
Before run the project, please make sure you have .env file under backend folder. Please fill the places based on your preferences
```bash 
    PORT=..... 
    DATABASE=" " 
  ```
You are already ready to run project. Run the command:
```bash 
    npm start
  ```

  
## Ekran Görüntüleri

![Uygulama Ekran Görüntüsü](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

  