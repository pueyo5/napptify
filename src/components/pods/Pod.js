import { head } from 'lodash'

export class Pod {

  constructor(props) {
    this.id = props.id;
    this.updated = props.updated;
    this.title = props._title || this._setTitle(props);
    this.image = props._image || this._setImage(props);
    this.author = props._author || this._setAuthor(props);
    this.description = props._description || this._setDescription(props);
    this.episodes = props._episodes || this._setEpisodes(props);
  }

  _setTitle(props){
    return head(props.title) || "Default Title";
  }

  _setImage(props){
    const base = null;
    if (!head(props.image) || !head(props.image).url) return base;
    return head(props.image[0].url) || base;
  }

  _setAuthor(props){
    return head(props['itunes:author']) || "Default Author";
  }

  _setDescription(props){
    return head(props.description) || "Default Description";
  }

  _setEpisodes(props){
    return props.item || [];
  }

  params(){
    return {
      id: this.id,
      updated: this.updated,
      _title: this.title,
      _image: this.image,
      _author: this.author,
      _description: this.description,
      _episodes: this.episodes
    }
  }
}