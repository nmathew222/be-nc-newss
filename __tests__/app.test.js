const db= require("../db/connection.js");
const app= require("../app.js");
const request= require("supertest");
const seed= require("../db/seeds/seed")
const testData= require("../db/data/test-data/index.js");
const topics = require("../db/data/test-data/topics.js");

beforeEach(()=>seed(testData));

afterAll(()=>db.end());





describe("getAPI/Topics", ()=>{
    test("200: an array of topic objects with the properties slug and description", () =>{
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({body})=>{
        body.topics.forEach((topic) => {expect(topic).toEqual({slug: expect.any(String), description: expect.any(String),
        });
    });
        expect(Array.isArray(body.topics)).toBe(true);
        expect(body.topics.length).toBe(3)
        

    })
})
test('status:404, responds with an error message when passed a invalid get pathway' ,() => {
    return request(app)
        .get("/guyyfggygbgygbygyuggyg g g")
        .expect(404)
        .then((res)=>{
           
            expect(res.body.msg).toBe("NOT FOUND")
        })
})

})