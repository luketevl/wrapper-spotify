import{
  search,
  searchArtists,
  searchPlayLists,
  searchAlbums
} from './search';

import album from './album';

import { API_URL } from './config';

export default class SpotifyWrapper{
  constructor(options = {}){
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
    this.album = album.bind(this);
  }

  request(url){
    return fetch(url, {
      headers:{
        'Authorization': `Bearer ${this.token}`
      }
    });
  }


}