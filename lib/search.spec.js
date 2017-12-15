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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_sinonChai2.default);
(0, _sinonStubPromise2.default)(_sinon2.default);

global.fetch = require('node-fetch');

describe('Search', function () {
  describe('Smoke tests', function () {

    it('should exists the search method', function () {
      (0, _chai.expect)(_search.search).to.exist;
    });

    it('should exists the searchAlbums method', function () {
      (0, _chai.expect)(_search.searchAlbums).to.exist;
    });

    it('should exists the searchArtists method', function () {
      (0, _chai.expect)(_search.searchArtists).to.exist;
    });

    it('should exists the searchTracks method', function () {
      (0, _chai.expect)(_search.searchTracks).to.exist;
    });

    it('should exists the searchPlayLists method', function () {
      (0, _chai.expect)(_search.searchPlayLists).to.exist;
    });
  });

  var fetchedStub = void 0;
  var promise = void 0;
  beforeEach(function () {
    fetchedStub = _sinon2.default.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(function () {
    fetchedStub.restore();
  });

  describe('Generic Search', function () {
    it('should call fetch function', function () {
      var result = (0, _search.search)();
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = (0, _search.search)('Eminem', 'artist');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=artist');
      });

      context('passing more one type', function () {
        var artists = (0, _search.search)('Eminem', ['artist', 'album']);
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=artist,album');
      });
    });

    it('should return the JSON Data from Promise', function () {
      promise.resolves({ body: 'json' });
      var artists = (0, _search.search)('Eminem', 'artist');

      (0, _chai.expect)(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('Artists search', function () {
    it('should call fetch function', function () {
      var artists = (0, _search.searchArtists)('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = (0, _search.searchArtists)('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=artist');
      });
    });
  });

  describe('Albums search', function () {
    it('should call fetch function', function () {
      var artists = (0, _search.searchAlbums)('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = (0, _search.searchAlbums)('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=album');
      });
    });
  });

  describe('PlayList search', function () {
    it('should call fetch function', function () {
      var artists = (0, _search.searchPlayLists)('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = (0, _search.searchPlayLists)('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=playlist');
      });
    });
  });

  describe('Tracks search', function () {
    it('should call fetch function', function () {
      var artists = (0, _search.searchTracks)('Eminem');
      (0, _chai.expect)(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', function () {
      context('passing one type', function () {
        var artists = (0, _search.searchTracks)('Eminem');
        (0, _chai.expect)(fetchedStub).to.have.been.calledWith(_config.API_URL + '/search?q=Eminem&type=track');
      });
    });
  });
});