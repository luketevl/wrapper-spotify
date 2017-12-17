'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = search;
function searchRequest(type, query) {
  return this.request(this.apiURL + '/search?q=' + query + '&type=' + type);
}

function search() {
  return {
    albums: searchRequest.bind(this, 'album'),
    artists: searchRequest.bind(this, 'artist'),
    tracks: searchRequest.bind(this, 'track'),
    playLists: searchRequest.bind(this, 'playlist')
  };
}