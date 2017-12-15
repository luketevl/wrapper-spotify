import { API_URL, HEADERS } from './config';
import { toJSON } from './utils';

export const search  = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`, HEADERS)
    .then(data => toJSON(data));
    
export const searchAlbums = artist => search(artist, 'album');
export const searchArtists = artist => search(artist, 'artist');
export const searchTracks = artist => search(artist, 'track');
export const searchPlayLists = artist => search(artist, 'playlist');