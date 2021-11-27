var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


/* 
testing https://jsonplaceholder.typicode.com
JSONPlaceholder is a free online REST service that you can use whenever you need some fake data.
You can refer to the website for the API documentation and examples.
*/

testCase('/GET posts?userId&title', function () {
	it('Correct res', (done) => { // true
		chai.request('https://jsonplaceholder.typicode.com')
			.get(`/posts?userId=1&title=nesciunt quas odio`)
			.end((err, res) => {
				res.should.have.status(200);
				res.should.have.json;
				res.body.length.should.be.eql(1);
				res.body.should.be.a('array');
				res.body[0].should.be.a('object');
				done();
			});
	});

	it('Correct post property', (done) => { // true
		chai.request('https://jsonplaceholder.typicode.com')
			.get(`/posts?userId=1&title=nesciunt quas odio`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].should.be.property('userId');
				res.body[0].should.be.property('id');
				res.body[0].should.be.property('title');
				res.body[0].should.be.property('body');
				done();
			});
	});

	it('Correct userId value and type', (done) => { // true
		chai.request('https://jsonplaceholder.typicode.com')
			.get(`/posts?userId=1&title=nesciunt quas odio`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].should.be.property('userId').equal(1);
				res.body[0].should.be.property('userId').a('number');
				done();
			});
	});

	it('Correct title value and type', (done) => { // true
		chai.request('https://jsonplaceholder.typicode.com')
			.get(`/posts?userId=1&title=nesciunt quas odio`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body[0].should.be.property('title').equal('nesciunt quas odio');
				res.body[0].should.be.property('title').a('string');
				done();
			});
	});

	it('Incorrect userId and title', (done) => { // false
		chai.request('https://jsonplaceholder.typicode.com')
			.get(`/posts?userId=11&title=hello world`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('array');
				res.body.length.should.be.eql(0);
				done();
			});
	});
});