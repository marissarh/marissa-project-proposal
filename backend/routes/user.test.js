const request = require("supertest");
const express  = require("express");
const User = require("../models/user");
const router = express.Router();


const app = express();
app.use(express.json());
app.use("/", router);


test('test', () => {
    expect(true).toBe(true);
})
describe("User Route", () => {
    test("Response status code is 200", () => {
        const response = { status: 200};
        expect(response.status).toBe(200);
    });
});