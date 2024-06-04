const request = require("supertest");
const app = require("../app");
const User = require('../models/user');
const server = require('../server');
const bcrypt = require('bcrypt');

describe('Authentication Routes', () => {
    beforeEach(async () => {
        await User.deleteMany({});
       
    });

    it('POST /signup - should return a token and user details on successful sign-up', async () => {
        const userData = {
            fullName: 'John Doe',
            username: 'johndoe',
            password: '1234567',
            confirmPassword: '1234567',
        };

        const response = await request(app)
        .post('/signup')
        .send(userData)
        .expect(201);

        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('_id');
       //expect(response.body).toHaveProperty('fullName', 'John Doe');
        //expect(response.body).toHaveProperty('username','johndoe');

        const user = await findOne({ username: 'johndoe'});
        expect(user).toBeTruthy();
        expect(user.fullName).toBe('John Doe');
        
    });
});

describe('POST /login', () => {
    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('1234567', salt);

        await User.create({
            username: 'johndoe',
            password: hashedPassword,
            fullName: 'John Doe'
        });
    });



    test('Login with valid credentials should return a token and user details', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            username: 'johndoe',
            password: '1234567'
        });

        expect(response.status).toBe(200);
        expect(response.status).toHaveProperty('token');
        expect(response.status).toHaveProperty('_id');
        expect(response.status).toHaveProperty('fullName', 'John Doe');
        expect(response.status).toHaveProperty('username', 'johndoe');
    
    });

    test('Login with invalid credentials should return an error', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            username: 'johndoe',
            password: '12345'
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid username or password');
    })
})

