global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQBdSyD6F7KHmUX-cn-HX3BxoW2NUtmyG-3uQRJbU-YyLI4EajPDyu9LCXamuE7GkJxIqogRFv7Igkv7oDnoirR9L3Xe9Ax-7K_cC6buiQwEyJSMfmx8qJ5UVgdNY-njF4hpD6c6keI'
})
const albums = spotify.search.albums('Eminem');

albums.then(data => data.albums.items.map(item => console.log(item.name)));