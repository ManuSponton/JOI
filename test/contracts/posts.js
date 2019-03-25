const Joi = require('joi');
const request = require('supertest');
const joiAssert = require('joi-assert');

const URL = "https://jsonplaceholder.typicode.com"

describe('GET /post', () => {
    it('Deve retornar uma lista de posts', done => {
        const postsList = Joi.array().items(Joi.object().keys({
            userId: Joi.number(),
            id: Joi.number(),
            title: Joi.string(),
            body: Joi.string()

        }));

        request(URL)
            .get("/posts")
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                joiAssert(res.body, postsList);
                done(err);
            });
    });

    it('Deve retornar um post único', done => {
        const postsList = Joi.object().keys({
            userId: Joi.number(),
            id: Joi.number(),
            title: Joi.string(),
            body: Joi.string()
        });

        request(URL)
            .get("/posts/1")
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                joiAssert(res.body, postsList);
                done(err);
            });
        });
    });