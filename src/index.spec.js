import chai, { expect } from 'chai';
import SpotifyWrapper from './index';
import { API_URL} from './config';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

sinonStubPromise(sinon);
chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Sotify Wrapper', () => {
  let promise;
  let stubedFecth;
  beforeEach(()=>{
    stubedFecth = sinon.stub(global, 'fetch');
    promise = stubedFecth.returnsPromise();
  })

  afterEach(() => {
    stubedFecth.restore();
  })

  it('should create an instance of `Sotify Wrapper`', () =>{
    const spotify = new SpotifyWrapper({});
    expect(spotify).to.been.an.instanceof(SpotifyWrapper);
  });
  it('should receive `API_URL` as an options', () =>{
    const spotify = new SpotifyWrapper({
      apiURL: 'xxxxx'
    });

    expect(spotify.apiURL).to.be.equal('xxxxx');
  });

  it('should use the `apuURL` if not provided', () =>{
    const spotify = new SpotifyWrapper({});
    expect(spotify.apiURL).to.be.equal(API_URL);
  });

  it('should receive `TOKEN` as an options', () => {
    const spotify = new SpotifyWrapper({
      token: 'xxxxx'
    });
    expect(spotify.token).to.be.equal('xxxxx');
  }); 

  describe('Request Method', () =>{
    it('should have `request` method', () =>{
      const spotify = new SpotifyWrapper({});
      expect(spotify.request).to.exist;
    });
  });
  it('should call fetch when `request`', () =>{
    const spotify = new SpotifyWrapper({
      token: 'xxxxx'
    });
    spotify.request('');
    expect(stubedFecth).to.have.been.calledOnce;

  });

  it('should call fetch when `request`  with URL passed ', () => {
    const spotify = new SpotifyWrapper({
      token: 'xxxxx'
    });
    spotify.request('url');
    expect(stubedFecth).to.have.been.calledWith('url');
  });

  it('should call fetch when `request`  with headers passed ', () => {
    const spotify = new SpotifyWrapper({
      token: 'x',
      apiURL: 'y'
    });
    const header = {
      headers: {
        'Authorization': `Bearer x`
      }
    };
    spotify.request('url');
    expect(stubedFecth).to.have.been.calledWith('url', header);
  });

})