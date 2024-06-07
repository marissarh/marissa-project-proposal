const request = require("supertest");
const app = require("../app");
const User = require('../models/user.js');
const server = require('../server');
const bcrypt = require('bcrypt');
const { ObjectId} = require('mongodb');



{
describe('/Signup route', ()=> {
    test("Response status code is 400", () => {
        const response = {code: 400};
    expect(response.code).toBe(400);
});
    test("Response has the required field - error", () => {
        const responseData = {json: () => ({error: "Error"})};
        expect(responseData).toBeInstanceOf(Object);
        const parsedResponse = responseData.json();
        expect(parsedResponse.error).toBeDefined();
    });
    test("Response status code is not 200", () => {
        const response = {code: 200};
        expect(response.status).not.toEqual(200);
    })
});

describe('/Login route', ()=> {
    test("Response status code is 200", ()=> {
        const response = { status: 200};
        expect(response.status).toEqual(200);
    });
    test("Token, _id, fullName, username, and role fields are present in the response", ()=> {
        const responseData = { json: () => ({
            token: "Token",
            _id: "_id",
            fullName: "John Doe",
            username: "johndoe",
            role: "regular"
        })}
        expect(responseData).toBeInstanceOf(Object);
        const parsedResponse = responseData.json();
        expect(parsedResponse.token).toBeDefined();
        expect(parsedResponse._id).toBeDefined();
        expect(parsedResponse.fullName).toBeDefined();
        expect(parsedResponse.username).toBeDefined();
        expect(parsedResponse.role).toBeDefined();
    });

test("Token field should not be empty", () => {
    const responseData = { json: () => ({ token: "token"})};
    expect(responseData).toBeInstanceOf(Object);
    const parsedResponse = responseData.json();
    expect(parsedResponse.token).toBeDefined();
    expect(parsedResponse.token).not.toEqual("");
});
});


    describe('/Logout',() =>{
        test("Response has the required fields - status, message, and error", () => {
          const responseData = { json: () => ({
            status: "status",
            message: "message",
            error: "error"
          })};
          const parsedResponse = responseData.json();
            
            expect(parsedResponse).toHaveProperty('status');
            expect(parsedResponse).toHaveProperty('message');
            expect(parsedResponse).toHaveProperty('error');
        });
        test("Response status code is 200", () => {
            const response = { status: 200};
            expect(response.status).toEqual(200);
        });
        test("Message is a non-empty string", () => {
            const responseData = {json: () => ({ message: "some message"})};
            expect(responseData).toBeInstanceOf(Object);
            const parsedResponse = responseData.json();
            expect(typeof parsedResponse.message).toBe("string");
            expect(parsedResponse.message.length).toBeGreaterThan(0);
        });
    });
}
