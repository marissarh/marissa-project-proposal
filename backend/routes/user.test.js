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
    it("should return all users except the logged-in user", async () => {
        const loggedInUserId = "logged_in_user_id";
        const loggedInUser = { _id: loggedInUserId};

        const users = [
            {_id: "user1_id", username: "user1"},
            {_id: "user2_id", username: "user2"}
        ];

        User.find = jest.fn().mockResolvedValue(users);

        const response = await request(app)
        .get("/")
        .set("Authorization", `Bearer ${process.env.JWT_SECRET}`)
        .send();

        expect(response.statusCode).toBe(404);
        expect(response.body).equal(users);
    })
})
