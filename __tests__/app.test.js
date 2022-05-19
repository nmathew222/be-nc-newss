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
            expect(body.article).toMatchObject({
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
        describe('patch /api/articles/:article_id' ,() => {
            test('status:200, updated object is returned', () => {   
                ;
                return request(app)
                    .patch(`/api/articles/1`)
                    .send({inc_votes: 1})
                    .expect(200)
                    .then(({body})=>{
                        expect(body.updatedVotes).toEqual({
                               article_id: 1,
                               title:'Living in the shadow of a great man',
                               topic:'mitch',
                               author: 'butter_bridge',
                                body:'I find this existence challenging',
                                created_at: "2020-07-09T20:11:00.000Z",
                                 votes: 101
            
                                
            
                        })
                    })
            
                })
            })
            test('status:404, responds with an error message when passed a id that does not exist but is valid' ,() => {
                return request(app)
                    .patch("/api/articles/20000000")
                    .expect(404)
                    .then((res)=>{
                        expect(res.body.msg).toBe("not found")
                    })
                })
                test('status:400, responds with an error message when passed a invalid id type' ,() => {
                    return request(app)
                        .patch("/api/articles/snowwww")
                        .expect(400)
                        .then((res)=>{
                            expect(res.body.msg).toBe("bad request")
                        })
                    })
                    test('status:400, responds with an error message when passed a empty body' ,() => {
                        return request(app)
                            .patch("/api/articles/1")
                            .send({inc_votes: {}})
                            .expect(400)
                            .then((res)=>{
                                expect(res.body.msg).toBe("bad request")
                            })
                        })
                        test('status:400, responds with an error message when passed a incorrect body type' ,() => {
                            return request(app)
                                .patch("/api/articles/snowwww")
                                .send({inc_votes: "word"})
                                .expect(400)
                                .then((res)=>{
                                    expect(res.body.msg).toBe("bad request")
                                })
                            })

});
describe("getAPI/users", ()=>{
    test("200: an array of user objects with the property username", () =>{
    return request(app)
    .get("/api/users")
    .expect(200)
    .then(({body})=>{
        
        body.users.forEach((user) => {expect(user).toEqual({username: expect.any(String),name: expect.any(String),avatar_url: expect.any(String)});
    });
        expect(Array.isArray(body.users)).toBe(true);
       expect(body.users.length).toBe(4)
        

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
})
describe('GET /api/articles/:article_id and comment count' ,() => {
    test('status:200, responds with a single matching article and all its properties and the comment count', () => {   
        return request(app)
            .get(`/api/articles/1`)
            .expect(200)
            .then(({body})=>{
                expect(body.article).toMatchObject({
                       article_id: 1,
                       title:'Living in the shadow of a great man',
                       topic:'mitch',
                       author: 'butter_bridge',
                        body:'I find this existence challenging',
                        created_at: "2020-07-09T20:11:00.000Z",
                         votes: 100,
                         comment_count: 11
    
                        
    
                })
            })
    
        })
    })


    describe('GET /api/articles and comment count' ,() => {
        test('status:200, responds with all articles and all its properties and the comment count and articles sorted out by date in descending order', () => {   
            return request(app)
                .get(`/api/articles`)
                .expect(200)
                .then(({body})=>{
                    body.articles.forEach((article) => {expect(article).toEqual({article_id: expect.any(Number),title: expect.any(String),topic: expect.any(String),author: expect.any(String),created_at: expect.any(String),votes: expect.any(Number),comment_count: expect.any(Number),});
    });
    expect(body.articles).toBeSorted("created_at", {descending:true});

                    
                })
        
            })
        })
        describe('GET /api/articles/:article_id/comments' ,() => {
            test('status:200, responds with all the comments that match the article_id', () => {   
                const article_id=1;
                return request(app)
                    .get(`/api/articles/${article_id}/comments`)
                    .expect(200)
                    .then(({body})=>{
                        console.log(body.comments, "hsb");
                        body.comments.forEach((comment) => {expect(comment).toEqual({comment_id: expect.any(Number),author: expect.any(String),created_at: expect.any(String), votes: expect.any(Number),body: expect.any(String),article_id: expect.any(Number) });
    });
   
                                
            
                        })
                    })
                    test('status:404, responds with an error message when passed a id that does not exist but is valid' ,() => {
                        return request(app)
                            .get("/api/articles/20000000/comments")
                            .expect(404)
                            .then((res)=>{
                                expect(res.body.msg).toBe("not found")
                            })
                        })
                        test('status:400, responds with an error message when passed a invalid id type' ,() => {
                            return request(app)
                                .get("/api/articles/snowwww/comments")
                                .expect(400)
                                .then((res)=>{
                                    expect(res.body.msg).toBe("bad request")
                                })
                            })    

                })
                    