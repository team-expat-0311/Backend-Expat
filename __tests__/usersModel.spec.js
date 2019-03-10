const db = require('../data/dbConfig.js');
const Users = require('../users/usersModel.js')

describe('users model', () => {
    describe('add()', () => {
        afterEach(async () => {
            await db('users').truncate();
        })

        it('should insert user to the db', async () => {
            const testUser = {
                username: 'test',
                password: 'test',
                name: 'dan',
                role: 'viewer',
                age: 30,
                location: 'tokyo'
            };
            const user = await Users.add(testUser);

            expect(user.name).toBe('dan');
        });
    });
});