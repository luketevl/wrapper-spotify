'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchPlayLists = exports.searchTracks = exports.searchArtists = exports.searchAlbums = exports.search = undefined;

var _config = require('./config');

var _utils = require('./utils');

var search = exports.search = function search(query, type) {
  return fetch(_config.API_URL + '/search?q=' + query + '&type=' + type, _config.HEADERS).then(function (data) {
    return (0, _utils.toJSON)(data);
  });
};

var searchAlbums = exports.searchAlbums = function searchAlbums(artist) {
  return search(artist, 'album');
};
var searchArtists = exports.searchArtists = function searchArtists(artist) {
  return search(artist, 'artist');
};
var searchTracks = exports.searchTracks = function searchTracks(artist) {
  return search(artist, 'track');
};
var searchPlayLists = exports.searchPlayLists = function searchPlayLists(artist) {
  return search(artist, 'playlist');
};