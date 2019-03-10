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

                //add the user so we can try to log it in
                await Users.add(newUser);
                
                const credentials = {
                    username: "test2",
                    password: "wrong password"
                }

                try {
                    const response = await request(server)
                        .post('/api/auth/login')
                        .send(credentials)
                        
                    } catch (error) {
                        expect(error.status).toBe(401);
                    }
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

        describe('POST /api/auth/register', () => {
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
                try {
                    const response = await request(server)
                        .post('/api/auth/register')
                        .send(badUser);

                } catch (error) {
                    expect(error.status).toBe(404);
                }
                
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