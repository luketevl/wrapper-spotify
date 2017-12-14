export const search  = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
    .then(data => data.json());
    
export const searchAlbums = artist => search(artist, 'album');
export const searchArtists = artist => search(artist, 'artist');
export const searchTracks = artist => search(artist, 'track');
export const searchPlayLists = artist => search(artist, 'playlist');