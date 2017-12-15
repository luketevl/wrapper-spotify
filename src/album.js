import { API_URL } from './config';
import { toJSON } from './utils';

export const getAlbum = id => fetch(`${API_URL}/albums/${id}`).then(data => data.toJSON());
export const getAlbums = ids => fetch(`${API_URL}/albums/?ids=${ids}`).then(data => data.toJSON());
export const getAlbumTracks = id => fetch(`${API_URL}/albums/${id}/tracks`).then(data => data.toJSON());