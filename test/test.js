var request = require('supertest');
var expect = require('chai').expect;
var koa = require('koa');

var qs = require('..');

describe('koa-qs-lru', function () {
  it('should return an empty object', function (done) {
    var app = qs(koa());
    app.use(function *() {this.body = this.query;});

    request(app.listen())
      .get('/')
      .expect(200, {}, done);
  });

  it('should work', function (done) {
    var app = qs(koa());
    app.use(function *() {this.body = this.query;});

    request(app.listen())
      .get('/?a=b')
      .expect(200, {a: 'b'}, done);
  });

  it('should cache', function (done) {
    var app = qs(koa());
    app.use(function *() {this.body = this.query;});

    var agent = request(app.listen());
    agent.get('/?a[]=b&a[]=c').end(function(err, res){
      agent.get('/?a[]=b&a[]=c').expect(200, {a: ['b', 'c']}, done);
    });
  });

  it('should set', function (done) {
    var app = qs(koa());
    app.use(function *(next) {
      yield next;
      this.body = this.query;
    });

    app.use(function *(next) {
      this.query = {a: ['b', 'c']}
      yield next;
    });

    request(app.listen())
      .get('/')
      .expect(200, {a: ['b', 'c']}, done);
  });
});
