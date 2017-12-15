'use strict';

var _search = require('./search');

var _album = require('./album');

module.exports = {
  search: _search.search,
  searchArtists: _search.searchArtists,
  searchPlayLists: _search.searchPlayLists,
  searchAlbums: _search.searchAlbums,
  getAlbum: _album.getAlbum,
  getAlbums: _album.getAlbums,
  getAlbumTracks: _album.getAlbumTracks
};