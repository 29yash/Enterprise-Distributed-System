var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

const cValue = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2Fib3V0bWUiOiJJJ20gQmFkIiwidXNlcl9nZW5kZXIiOiIiLCJ1c2VyX3Bob25lX251bWJlciI6IiIsInVzZXJfbGFuZ3VhZ2VzIjoiRW5nbGlzaCwgSGluZGkiLCJ1c2VyX2NpdHkiOiJJbmRvcmUiLCJ1c2VyX2NvbXBhbnkiOiJJbmZvQmVhbnMiLCJ1c2VyX3NjaG9vbCI6IlNHU0lUUyIsInVzZXJfaG9tZXRvd24iOiJJbmRvcmUiLCJ1c2VyX3JvbGUiOiJUcmF2ZWxsZXIiLCJ1c2VyX3BpY191cmwiOiJodHRwOi8vZWMyLTE4LTIyNC0yMTUtMTQxLnVzLWVhc3QtMi5jb21wdXRlLmFtYXpvbmF3cy5jb206ODA4MC9waG90b3MvOGRiNjNmM2QtOGQ3Yy00OWNhLThhNDgtZjFkMDJjMmQ2YTljLmpwZyIsIl9pZCI6IjViZDJlODcyYjljYmIwMTZiNjRkY2MzYSIsInVzZXJfZW1haWwiOiJ5YXNoQGdtYWlsLmNvbSIsInVzZXJfZmlyc3RfbmFtZSI6IkFuc2h1bCIsInVzZXJfbGFzdF9uYW1lIjoiTWFoYWphbiIsInVzZXJfcGFzc3dvcmQiOiIkMmEkMTAkRmJHZ1hYRWRVR243SjhUSTBoZUV4T0ozVGpxUmd5dWEwVUJHVFFJVWVaU3hqY1A5TlUwQzIiLCJfX3YiOjAsImlhdCI6MTU0MTM3NDcwMywiZXhwIjoxNTQxMzg0NzgzfQ.dObE6TQzl2o2z8GXU7zUoheTmzDqcQQ0Rzn6rsgy47k";

it("Should get logged in for traveller with status code 200, success true and message User logged in successfully", function(done){
    chai.request('http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080')
    .post('/login')
    .send({ "username": "yash@gmail.com", "password" : "123456", "role":"Traveller" })
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
    chai.request('http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080')
    .get('/userProfile/getProfile')
    .set('Authorization', cValue)
    .send()
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.user_email).to.be.string;
        expect(res.body.user.user_email).to.equal("yash@gmail.com");
        expect(res.body.user.user_first_name).to.be.string;
        expect(res.body.user.user_first_name).to.equal("Yash");
        expect(res.body.user.user_hometown).to.be.string;
        expect(res.body.user.user_hometown).to.equal("Indore");
        done();
    });
});

it("Should return the available properties", function(done){
    chai.request('http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080')
    .post('/searchProperty')
    .set('Authorization', cValue)
    .send({ "location": "Pune", "arrivalDate" : "2018-10-10", "departureDate": "2018-10-12", "guests":"3" })
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
    chai.request('http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080')
    .post('/userProfile/editProfile')
    .set('Authorization', cValue)
    .send({ "user_first_name": "Yash", "user_last_name" : "Mahajan", "user_city": "London", "user_company":"Google", "user_hometown" : "Indore"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body.success).to.be.true;
        expect(res.body.message).to.be.string;
        expect(res.body.message).to.equal('User Details Updated successfully');
        done();
    });
});

it("Should get logged out successfully", function(done){
    chai.request('http://ec2-18-224-215-141.us-east-2.compute.amazonaws.com:8080')
    .delete('/logout')
    .set('Authorization', cValue)
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
    

