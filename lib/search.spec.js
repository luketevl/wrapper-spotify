'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _sinonChai = require('sinon-chai');

var _sinonChai2 = _interopRequireDefault(_sinonChai);

var _sinonStubPromise = require('sinon-stub-promise');

var _sinonStubPromise2 = _interopRequireDefault(_sinonStubPromise);

var _search = require('./search');

var _config = require('./config');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);
(0, _sinonStubPromise2.default)(_sinon2.default);

global.fetch = require('node-fetch');

describe('Search', function () {
  describe('Smoke tests', function () {

    // it('should exists the `search generic` method', () =>{
    //   expect(spotify.search.generic).to.exist;
    // });

    it('should exists the `albums` method', function () {
      (0, _chai.expect)(spotify.search.albums).to.exist;
    });

    it('should exists the `artists` method', function () {
      (0, _chai.expect)(spotify.search.artists).to.exist;
    });

    it('should exists the `tracks` method', function () {
      (0, _chai.expect)(spotify.search.tracks).to.exist;
    });

    it('should exists the `playLists` method', function () {
      (0, _chai.expect)(spotify.search.playLists).to.exist;
    });
  });

  var fetchedStub = void 0;
  var promise = void 0;
  var spotify = void 0;
  beforeEach(function () {
    spotify = new _index2.default({ token: 'x' });
    fetchedStub = _sinon2.default.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(function () {
    fetchedStub.restore();
  });

  describe('Artists search', function () {
    it('should call fetch function', function () {
      var artists = spotify.search.artists('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = spotify.search.artists('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=artist');
      });
    });
  });

  describe('Albums search', function () {
    it('should call fetch function', function () {
      var artists = spotify.search.albums('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = spotify.search.albums('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=album');
      });
    });
  });

  describe('PlayList search', function () {
    it('should call fetch function', function () {
      var artists = spotify.search.playLists('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = spotify.search.playLists('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=playlist');
      });
    });
  });

  describe('Tracks search', function () {
    it('should call fetch function', function () {
      var artists = spotify.search.tracks('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = spotify.search.tracks('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=track');
      });
    });
  });
});