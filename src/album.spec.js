import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from './index';

import { API_URL } from './config';

describe('Album lib', () => {
  let stubedFetch;
  let promise;
  let spotify;
  beforeEach(() => {
    spotify = new SpotifyWrapper({ token: 'x' });
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests',() => {
    it('should have method `getAlbum`', () => {
      expect(spotify.album.getAlbum).to.exist;
    });
    it('should have method `getTracks`', () => {
      expect(spotify.album.getTracks).to.exist;
    });
    it('should have method `getAlbums`', () => {
      expect(spotify.album.getAlbums).to.exist;
    });
  });
  
  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);
    });

    it('should return the corret data from Promise', () => {
      promise.resolves({album: 'name'});
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name'});
    });
  });

  describe('getTracks', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);
    });

    it('should return the corret data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

});