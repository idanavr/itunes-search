/* eslint-disable */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const logger = new (require('../logger'))('Users Test');
const agent = chai.request.agent(app);
chai.should();
chai.use(chaiHttp);

const usersData = require('./test-data').users;

describe('Users', () => {

    let generalUserId = '';

    before((done) => {
        const data = usersData.generalUser;

        agent
            .post('/api/users')
            .send(data)
            .end((err, res) => {
                if (err) {
                    logger.error(err);
                }
                res.should.have.cookie('jwt');
                generalUserId = res.body.id;
                done();
            });
    });

    after(() => {
        agent.close();
    });

    describe('/GET users', () => {
        it('it should fail GET all users since user\'s role is not authorized for that', (done) => {
            agent
                .get('/api/users')
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(401);
                    done();
                });
        });

        it('it should GET user by id', (done) => {
            agent
                .get('/api/users/' + generalUserId)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(usersData.generalUser.firstName);
                    res.body.should.have.property('lastName').eql(usersData.generalUser.lastName);
                    res.body.should.have.property('email').eql(usersData.generalUser.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(usersData.generalUser.gender);
                    done();
                });
        });
    });


    describe('/POST users', () => {
        it('it should POST a new user', (done) => {
            const data = usersData.newUser;

            chai.request(app)
                .post('/api/users')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName').eql(data.firstName);
                    res.body.should.have.property('lastName').eql(data.lastName);
                    res.body.should.have.property('email').eql(data.email);
                    res.body.should.not.have.property('password');
                    res.body.should.have.property('gender').eql(data.gender);

                    Cookies = res.headers['set-cookie'].pop().split(';')[0];
                    done();
                });
        });
    });

    describe('/DELETE users', () => {
        it('it should fail DELETE the user since user\'s role is not authorized for that', (done) => {
            agent
                .delete('/api/users')
                .send({ id: generalUserId })
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(401);
                    done();
                });
        });
    });

});