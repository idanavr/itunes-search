/* eslint-disable */
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const logger = new (require('../logger'))('Itunes Search Test');
chai.should();
chai.use(chaiHttp);
const agent = chai.request.agent(app);

const itunesContentLimit = global.config.itunesContentLimit;
const { itunesSearch: itunesSearchData, users: usersData} = require('./test-data');

describe('Itunes Search', () => {

    before((done) => {
        const data = usersData.userForItunes;

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

    describe('/GET itunes', () => {
        
        it(`it should GET ${itunesContentLimit} contents from itunes`, (done) => {
            agent
                .get('/api/itunes/' + itunesSearchData.query)
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(itunesContentLimit);
                    done();
                });
        });

        it(`it should GET user\'s top 10 queries`, (done) => {
            agent
                .get('/api/itunes')
                .end((err, res) => {
                    if (err) {
                        logger.error(err);
                    }
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.should.have.lengthOf(1);
                    done();
                });
        });

        it(`it should fail GET user\'s top 10 queries since there is no user`, (done) => {
            chai.request(app)
                .get('/api/itunes')
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