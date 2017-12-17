'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _sinonStubPromise = require('sinon-stub-promise');

var _sinonStubPromise2 = _interopRequireDefault(_sinonStubPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sinonStubPromise2.default)(_sinon2.default);
_chai2.default.use(_sinonChai2.default);

global.fetch = require('node-fetch');

describe('Sotify Wrapper', function () {
  var promise = void 0;
  var stubedFecth = void 0;
  beforeEach(function () {
    stubedFecth = _sinon2.default.stub(global, 'fetch');
    promise = stubedFecth.returnsPromise();
  });

  afterEach(function () {
    stubedFecth.restore();
  });

  it('should create an instance of `Sotify Wrapper`', function () {
    var spotify = new _index2.default({});
    (0, _chai.expect)(spotify).to.been.an.instanceof(_index2.default);
  });
  it('should receive `API_URL` as an options', function () {
    var spotify = new _index2.default({
      apiURL: 'xxxxx'
    });

    (0, _chai.expect)(spotify.apiURL).to.be.equal('xxxxx');
  });

  it('should use the `apuURL` if not provided', function () {
    var spotify = new _index2.default({});
    (0, _chai.expect)(spotify.apiURL).to.be.equal(_config.API_URL);
  });

  it('should receive `TOKEN` as an options', function () {
    var spotify = new _index2.default({
      token: 'xxxxx'
    });
    (0, _chai.expect)(spotify.token).to.be.equal('xxxxx');
  });

  describe('Request Method', function () {
    it('should have `request` method', function () {
      var spotify = new _index2.default({});
      (0, _chai.expect)(spotify.request).to.exist;
    });
  });
  it('should call fetch when `request`', function () {
    var spotify = new _index2.default({
      token: 'xxxxx'
    });
    spotify.request('');
    (0, _chai.expect)(stubedFecth).to.have.been.calledOnce;
  });

  it('should call fetch when `request`  with URL passed ', function () {
    var spotify = new _index2.default({
      token: 'xxxxx'
    });
    spotify.request('url');
    (0, _chai.expect)(stubedFecth).to.have.been.calledWith('url');
  });

  it('should call fetch when `request`  with headers passed ', function () {
    var spotify = new _index2.default({
      token: 'x',
      apiURL: 'y'
    });
    var header = {
      headers: {
        'Authorization': 'Bearer x'
      }
    };
    spotify.request('url');
    (0, _chai.expect)(stubedFecth).to.have.been.calledWith('url', header);
  });
});