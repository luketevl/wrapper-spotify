import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise  from 'sinon-stub-promise';

import { search, albums, artists, tracks, playLists } from './search';
import { API_URL } from './config';

import SpotifyWrapper from './index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () =>{
  describe('Smoke tests', () => {
    
    // it('should exists the `search generic` method', () =>{
    //   expect(spotify.search.generic).to.exist;
    // });

    it('should exists the `albums` method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exists the `artists` method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exists the `tracks` method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exists the `playLists` method', () => {
      expect(spotify.search.playLists).to.exist;
    });
  });

    let fetchedStub;
    let promise;
    let spotify;
    beforeEach(() => {
      spotify = new SpotifyWrapper({token: 'x'});
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

  describe('Artists search', ()=>{
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Eminem');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = spotify.search.artists('Eminem');
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Eminem&type=artist`);
      });
    });
  });

  describe('Albums search', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.albums('Eminem');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = spotify.search.albums('Eminem');
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Eminem&type=album`);
      });
    });
  });

  describe('PlayList search', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.playLists('Eminem');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = spotify.search.playLists('Eminem');
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Eminem&type=playlist`);
      });
    });
  });

  describe('Tracks search', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.tracks('Eminem');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = spotify.search.tracks('Eminem');
        expect(fetchedStub).to.have.been.calledWith(`${API_URL}/search?q=Eminem&type=track`);
      });
    });
  });

});