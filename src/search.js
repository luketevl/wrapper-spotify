function searchRequest(type, query){
  return this.request(`${this.apiURL}/search?q=${query}&type=${type}`);
} 
    
export default function search(){
  return {
    albums:   searchRequest.bind(this, 'album'),
    artists:   searchRequest.bind(this, 'artist'),
    tracks:   searchRequest.bind(this, 'track'),
    playLists:   searchRequest.bind(this, 'playlist'),
  }
}