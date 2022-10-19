'use strict';

const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
var event, context;

describe('The system under test', function () {
  it('behaves in this manner', async () => {
    event = {};
    const result = await app.handler(event, context);

    expect(result).to.be.an('object');
    expect(result).to.have.all.keys('body', 'statusCode');
    expect(result.statusCode).to.equal(200);

    const body = JSON.parse(result.body);
    expect(body).to.be.an('object');
    expect(body).to.have.all.keys('message', 'location');
    expect(body.message).to.equal("Hallo Welt");
  });
});