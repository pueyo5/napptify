import { head } from 'lodash'

export class Pod {

  constructor(props) {
    this.id = props.id;
    this.updated = props.updated;
    this.name = props.name || head(props.title) || "Default Title";
    this.img = props.img || this.getImageFromServer(props);
    this.author = props.author || head(props['itunes:author']) || "Default Author";
    this.desc = props.desc || head(props.description) || "Default Description";
    this.episodes = props.episodes || props.item || [];
  }

  getImageFromServer(props){
    const base = null;
    if (!head(props.image) || !head(props.image).url) return base;
    return head(props.image[0].url) || base;
  }

  params(){
    return {
      id: this.id,
      updated: this.updated,
      name: this.name,
      img: this.img,
      author: this.author,
      desc: this.desc,
      episodes: this.episodes
    }
  }
}