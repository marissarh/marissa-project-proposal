const request = require("supertest");
const app = require("../app");
const User = require('../models/user.js');
const server = require('../server');
const bcrypt = require('bcrypt');

describe('POST /signup', () => {

    it('should create a new user and return a token', async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('1234567', salt);
        
        const userData = {
            fullName: 'John Doe',
            username: 'johndoe',
            password: 1234567,
            confirmPassword: 1234567,
        };

        const response = await request(app)
        .post('/api/auth/signup')
        .send(userData)
        .expect(201);
        

        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('_id');
        expect(response.body.fullName).toBe('John Doe');
        expect(response.body.username).toBe('johndoe');

     
    });
});

describe('POST /login', () => {
    let hashedPassword;
    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('1234567', salt);
     
    });

    it('Login with valid credentials should return a token and user details', async () => {
        
        const user = {
            username: 'johndoe',
            password: hashedPassword,
            fullName: 'John Doe'
        };
        await request(app).post('/signup').send(user);

        const response = await request(app)
        .post('/login')
        .send({
            username: 'johndoe',
            password: '1234567'
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('_id');
        expect(response.body.fullName).toBe('John Doe');
        expect(response.body.username).toBe('johndoe');
    
    });

    it('Login with invalid credentials should return an error', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            username: 'johndoe',
            password: '12345'
        });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid username or password');
    });
});

