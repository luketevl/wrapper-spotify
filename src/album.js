export default function album(){
  return {
    getAlbum(id){
      return this.request(`${this.apiURL}/albums/${id}`);
    },
    getAlbums(ids){
      return this.request(`${API_URL}/albums/?ids=${ids}`);
    },
    getAlbumTracks(id){
      return this.request(`${API_URL}/albums/${id}/tracks`);
    }
  }
};
