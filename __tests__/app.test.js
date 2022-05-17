const db= require("../db/connection.js");
const app= require("../app.js");
const request= require("supertest");
const seed= require("../db/seeds/seed")
const testData= require("../db/data/test-data/index.js");

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
           
            expect(res.body.msg).toBe("not found")
        })
})
describe('GET /api/articles/:article_id' ,() => {
test('status:200, responds with a single matching article', () => {   
    const article_id=1;
    return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(200)
        .then(({body})=>{
            expect(body.article).toEqual({
                   article_id: 1,
                   title:'Living in the shadow of a great man',
                   topic:'mitch',
                   author: 'butter_bridge',
                    body:'I find this existence challenging',
                    created_at: "2020-07-09T20:11:00.000Z",
                     votes: 100

                    

            })
        })

    })
})
test('status:404, responds with an error message when passed a id that does not exist but is valid' ,() => {
    return request(app)
        .get("/api/articles/20000000")
        .expect(404)
        .then((res)=>{
            expect(res.body.msg).toBe("not found")
        })
    })
    test('status:400, responds with an error message when passed a invalid id type' ,() => {
        return request(app)
            .get("/api/articles/snowwww")
            .expect(400)
            .then((res)=>{
                expect(res.body.msg).toBe("bad request")
            })
        })
});
