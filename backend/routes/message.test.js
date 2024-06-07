const request = require('supertest');
const app = require("express");
{
    const response = {
        code: 500,
        json: function() {
            return {
                error: 'Sample error'
            };
        }
    };
    
    describe('/SEND message', () => {
        test('Response status code is 500', () => {
            expect(response.code).toEqual(500);
        });
    
        test('Response has the required fields', () => {
            const responseData = response.json();
            expect(responseData).toBeInstanceOf(Object);
            expect(responseData.error).toBeDefined();
        });
    });
};


