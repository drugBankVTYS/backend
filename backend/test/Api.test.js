const request = require("supertest");
const app = require("../App");
const mongoose = require("mongoose");
//It provides us a fake database to avoid manupulatin real database
const { MongoMemoryServer } = require("mongodb-memory-server");
const Drug = require("../models/DrugSchema");

let mongoServer;

const exampleDrugData = {
  drug_id: "65521e7b13f6f29d4c469e93",
  drug_name: "Example Drug",
  drug_state: "Active",
  drug_kingdom: "Animalia",
  drug_superclass: "Organic compounds",
  drug_interactions: ["Interaction1", "Interaction2"],
  drug_pathways: ["Pathway1", "Pathway2"],
  drug_toxicity: ["Toxicity1", "Toxicity2"],
  drug_food_interactions: ["FoodInteraction1", "FoodInteraction2"],
  target_name: "TargetName",
  target_uniprot: "TargetUniprot",
  target_gene_name: "TargetGeneName",
  action: "Action",
  cell_loc: "CellLocation",
};

//Before test start, we create a fake mongodb
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.createConnection(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

//before test, we create a sample data
beforeEach(async () => {
  await Drug.create(exampleDrugData);
}, 20000);

afterEach(async () => {
  //After done, we clean fake db
  await Drug.deleteMany({});
}, 20000);

//after test is done, we close connection
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

//api/singledrug/{drug_id}
describe("Get single drug successful", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get(
      "/api/singledrug/65521e7b13f6f29d4c469e93"
    );
    expect(response.statusCode).toBe(200);
  });
}, 20000);

//api/alldrugs
describe("Get all drugs", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/alldrugs?pageNumber=1");
    expect(response.statusCode).toBe(200);
  });
}, 20000);

//api/showdrug
describe("Get drug given name", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/api/showdrug?name=Example Drug");
    expect(response.statusCode).toBe(200);
  }, 20000);
});

//api/createdrug
describe("Post a new drug", () => {
  test("Post drug", async () => {
    const response = await request(app)
      .post("/api/createdrug")
      .send(exampleDrugData);


      //We try see if our new data matches to schema
    expect(response.statusCode).toBe(201);
    expect(response.body.drug).toHaveProperty(
      "drug_id",
      "65521e7b13f6f29d4c469e93"
    );
    expect(response.body.drug).toHaveProperty("drug_name", "Example Drug");
    expect(response.body.drug).toHaveProperty("drug_state", "Active");
    expect(response.body.drug).toHaveProperty("drug_kingdom", "Animalia");
    expect(response.body.drug).toHaveProperty(
      "drug_superclass",
      "Organic compounds"
    );
    expect(response.body.drug).toHaveProperty("drug_interactions", [
      "Interaction1",
      "Interaction2",
    ]);
    expect(response.body.drug).toHaveProperty("drug_pathways", [
      "Pathway1",
      "Pathway2",
    ]);
    expect(response.body.drug).toHaveProperty("drug_toxicity", [
      "Toxicity1",
      "Toxicity2",
    ]);
    expect(response.body.drug).toHaveProperty("drug_food_interactions", [
      "FoodInteraction1",
      "FoodInteraction2",
    ]);
    expect(response.body.drug).toHaveProperty("target_name", "TargetName");
    expect(response.body.drug).toHaveProperty(
      "target_uniprot",
      "TargetUniprot"
    );
    expect(response.body.drug).toHaveProperty(
      "target_gene_name",
      "TargetGeneName"
    );
    expect(response.body.drug).toHaveProperty("action", "Action");
    expect(response.body.drug).toHaveProperty("cell_loc", "CellLocation");
  });
}, 20000);

//api/updatedrug/:{id}
describe("Update a new drug", () => {
  test("Update drug", async () => {
    
    const drug = await Drug.create(exampleDrugData);

    // We are sending same data as required body parameter.( We just need to see if it works correctly)
    const response = await request(app)
      .put(`/api/updatedrug/${drug.drug_id}`)
      .send(exampleDrugData);

    expect(response.statusCode).toBe(200); // we expect statusCode==200
  });
}, 20000);


//api/deletedrug/:{id}
describe("Delete the drug", () =>{
  test("Delete drug", async() =>{

    const response = await request(app).delete(`/api/deletedrug/${exampleDrugData.drug_id}`);
    //Control if deleted successfully
    expect(response.statusCode).toBe(200);
  });
},20000);