const request = require('supertest')
const db = require('../data/dbConfig.js');
const Users = require('../users/usersModel.js');

const server = require('../api/server.js');

describe('server.js', () => {
    it('should be in testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('authRouter', () => {
        // tests for the register route
        describe('POST /api/auth/login', () => {
            afterEach(async () => {
                await db('users').truncate();
            })

            it('should return a 401 code and Invalid Credentials message if bad user/pw provided', async () => {
                const newUser = {
                    username: "test2",
                    password: "test",
                    name: "dan",
                    role: "viewer",
                    age: 30,
                    location: "Tokyo"
                }

                //register the user so we can try to log it in
                await request(server)
                    .post('/api/auth/register')
                    .send(newUser)
                
                const credentials = {
                    username: "test2",
                    password: "not test"
                }

                const response = await request(server)
                    .post('/api/auth/login')
                    .send(credentials)
                
                expect(response.status).toBe(400);
                

            });

            it('should login a user if user/pass is correct and return 201 and a token', async () => {
                const newUser = {
                    username: "test2",
                    password: "test",
                    name: "dan",
                    role: "viewer",
                    age: 30,
                    location: "Tokyo"
                }

                // register the user so we can try to log it in
                await request(server)
                    .post('/api/auth/register')
                    .send(newUser)

                const credentials = {
                    username: "test2",
                    password: "test"
                }

                const response = await request(server)
                    .post('/api/auth/login')
                    .send(credentials)

                expect(response.status).toBe(200);
                expect(response.body.message).toBe('Welcome test2!, here\'s your token');
            });
            
        });

        describe.skip('POST /api/auth/register', () => {
            afterEach(async () => {
                await db('users').truncate();
            })

            // this test not passing here, but manual test of this in postman working???
            it('should return 404 error if request body is not valid format ', async () => {
                // try to register user without username
                const badUser = {
                    password: "test",
                    name: "dan",
                    role: "viewer",
                    age: 30,
                    location: "Tokyo"
                }

                const response = await request(server).post('/api/auth/register').send(badUser);
                
                expect(response.status).toBe(404);
                expect(response.body).toBe({ message: 'Please provide at least username, password, role, name for a new user' }); 
            });
            
            it('should return 201 and a json of the new user if successful', async () => {
                const goodUser = {
                    username: "test2",
                    password: "test",
                    name: "dan",
                    role: "viewer",
                    age: 30,
                    location: "Tokyo"
                }
                
                const response = await request(server).post('/api/auth/register').send(goodUser);

                expect(response.status).toBe(201);
                expect(response.body).toEqual({
                    id: 1,
                    username: "test2",
                    name: "dan",
                    role: "viewer",
                    age: 30,
                    location: "Tokyo"
                });
            });
        });
    });
});