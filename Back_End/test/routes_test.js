var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

const cValue = "HomeawayAuth=j%3A%7B%22user_email%22%3A%22firstUser%40gmail.com%22%2C%22user_first_name%22%3A%22Yash%22%2C%22user_last_name%22%3A%22Mahajan%22%2C%22user_role%22%3A%22Traveller%22%2C%22user_profile_picture%22%3A%22http%3A%2F%2Flocalhost%3A8080%2Fphotos%2Fd36c0026-1ad8-4024-80af-306b03610172.png%22%7D";

it("Should get logged in for traveller with status code 200, success true and message User logged in successfully", function(done){
    chai.request('http://localhost:8080')
    .post('/login')
    .send({ "username": "firstUser@gmail.com", "password" : "123456", "role":"Traveller" })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.be.string;
        expect(res.body.message).to.equal('User Logged in successfully');
        done();
    });
});

it("Should successfully return the profile of the user", function(done){
    chai.request('http://localhost:8080')
    .get('/userProfile/getProfile')
    .set('Cookie', cValue)
    .send({ "location": "Indore", "arrivalDate" : "2018-10-10", "departureDate": "2018-10-12", "guests":"3" })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.user_email).to.be.string;
        expect(res.body.user.user_email).to.equal("firstUser@gmail.com");
        expect(res.body.user.user_first_name).to.be.string;
        expect(res.body.user.user_first_name).to.equal("Yash");
        expect(res.body.user.user_hometown).to.be.string;
        expect(res.body.user.user_hometown).to.equal("Indore");
        done();
    });
});

it("Should return the available properties", function(done){
    chai.request('http://localhost:8080')
    .post('/searchProperty')
    .set('Cookie', cValue)
    .send({ "location": "Indore", "arrivalDate" : "2018-10-10", "departureDate": "2018-10-12", "guests":"3" })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.properties).to.be.an('array');
        done();
    });
});

it("Should update the user profile details City and Company", function(done){
    chai.request('http://localhost:8080')
    .post('/userProfile/editProfile')
    .set('Cookie', cValue)
    .send({ "user_first_name": "Yash", "user_last_name" : "Mahajan", "user_city": "London", "user_company":"Google", "user_hometown" : "Indore"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.be.string;
        expect(res.body.message).to.equal('Your profile has been updated.');
        done();
    });
});

it("Should get logged out successfully", function(done){
    chai.request('http://localhost:8080')
    .delete('/logout')
    .set('Cookie', cValue)
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.be.string;
        expect(res.body.message).to.equal('User Logged out successfully');
        done();
    });
});
    

