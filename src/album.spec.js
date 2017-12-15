import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

import { getAlbum, getAlbumTracks, getAlbums } from './album';
import { API_URL } from './config';

describe('Album lib', () => {
  let stubedFetch;
  let promise;
  beforeEach( ()=>{
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests',() => {
    it('should have method `getAlbum`', () => {
      expect(getAlbum).to.exist;
    });
    it('should have method `getAlbumTracks`', () => {
      expect(getAlbumTracks).to.exist;
    });
    it('should have method `getAlbums`', () => {
      expect(getAlbums).to.exist;
    });
  });
  
  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy`);
    });

    it('should return the corret data from Promise', () => {
      promise.resolves({album: 'name'});
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name'});
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const album = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith(`${API_URL}/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks`);
    });

    it('should return the corret data from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

});