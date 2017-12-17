'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _sinonStubPromise = require('sinon-stub-promise');

var _sinonStubPromise2 = _interopRequireDefault(_sinonStubPromise);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sinonStubPromise2.default)(_sinon2.default);
_chai2.default.use(_sinonChai2.default);

global.fetch = require('node-fetch');

describe('Album lib', function () {
  var stubedFetch = void 0;
  var promise = void 0;
  var spotify = void 0;
  beforeEach(function () {
    spotify = new _index2.default({ token: 'x' });
    stubedFetch = _sinon2.default.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(function () {
    stubedFetch.restore();
  });

  describe('Smoke tests', function () {
    it('should have method `getAlbum`', function () {
      (0, _chai.expect)(spotify.album.getAlbum).to.exist;
    });
    it('should have method `getTracks`', function () {
      (0, _chai.expect)(spotify.album.getTracks).to.exist;
    });
    it('should have method `getAlbums`', function () {
      (0, _chai.expect)(spotify.album.getAlbums).to.exist;
    });
  });

  describe('getAlbum', function () {
    it('should call fetch method', function () {
      var album = spotify.album.getAlbum();
      (0, _chai.expect)(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      var album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(stubedFetch).to.have.been.calledWith(_config.API_URL + '/albums/4aawyAB9vmqN3uQ7FjRGTy');
    });

    it('should return the corret data from Promise', function () {
      promise.resolves({ album: 'name' });
      var album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getTracks', function () {
    it('should call fetch method', function () {
      var album = spotify.album.getTracks();
      (0, _chai.expect)(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      var album = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(stubedFetch).to.have.been.calledWith(_config.API_URL + '/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the corret data from Promise', function () {
      promise.resolves({ album: 'name' });
      var album = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      (0, _chai.expect)(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});