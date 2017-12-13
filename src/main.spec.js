import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise  from 'sinon-stub-promise';

import { search, searchAlbums, searchArtists, searchTracking, searchPlayLists } from './main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () =>{
  describe('Smoke tests', () => {
    
    it('should exists the search method', () =>{
      expect(search).to.exist;
    });

    it('should exists the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exists the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exists the searchTracking method', () => {
      expect(searchTracking).to.exist;
    });

    it('should exists the searchPlayLists method', () => {
      expect(searchPlayLists).to.exist;
    });
  });

 let fetchedStub;
    let promise;
    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });

    it('should call fetch function', () => {      
      const artists = search();      
      expect(fetchedStub).to.have.been.calledOnce;
    });

  describe('Generic Search', () =>{
   
      it('should call fetch with the correct URL', () => {
        context('passing one type', () => {
          const artists = search('Eminem', 'artist');
          expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Eminem&type=artist');
        });

        context('passing more one type', () => {
          const artists = search('Eminem', ['artist', 'album']);
          expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Eminem&type=artist,album');
        })
      });

      it('should return the JSON Data from Promise', ()=>{
        promise.resolves({body: 'json'});
        const artists = search('Eminem', 'artist');

        expect(artists.resolveValue).to.be.eql({ body: 'json' });
      })
  });

});