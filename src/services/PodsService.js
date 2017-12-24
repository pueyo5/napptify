import axios from 'axios'
import {isEmpty} from 'lodash'
import { moment } from "../helpers/Moment";
var parseString = require('xml2js').parseString;

class PodsService {
  getPods() {
    if (this._freshPodsPresentLocally()) {
      return this._fetchPodsFromLocalStorage();
    }
    else {
      return this._fetchPodsFromAPI();
    }
  }

  _freshPodsPresentLocally() {
    let data = JSON.parse(localStorage.getItem('pods'));
    if (isEmpty(data)) return false;
    return !moment.isExpired(data.updated.label, 1);
  }

  _fetchPodsFromAPI() {
    return new Promise((resolve, reject) => {
      this._fetchPods(resolve);
    })
  }

  _fetchPodsFromLocalStorage() {
    return new Promise((resolve, reject) => {
      let pods = JSON.parse(localStorage.getItem('pods'));
      resolve(pods.entry);
    })
  }

  _fetchPods(resolve, reject) {
    axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json")
    .then(res => {
      localStorage.setItem('pods', JSON.stringify(res.data.feed));
      if (Boolean(resolve)) {
        resolve(res.data.feed.entry);
      }
    })
  }

  getPodDetails(data) {
    if (this._freshPodDetailsPresentLocally({id: data.podId})) {
      return this._fetchPodDetailsFromLocalStorage({id: data.podId});
    }
    else {
      return this._fetchPodDetailsFromAPI({id: data.podId});
    }
  }

  _freshPodDetailsPresentLocally(data) {
    let pod_details = JSON.parse(localStorage.getItem('pod_details') || '{}');
    if (isEmpty(data)) return false;
    let current_pod = pod_details[data.id];
    if (isEmpty(current_pod)) return false;
    return !moment.isExpired(data.updated, 1);
  }

  _fetchPodDetailsFromLocalStorage(data) {
    return new Promise((resolve, reject) => {
      let details = JSON.parse(localStorage.getItem('pod_details') || '{}');
      resolve(details[data.id]);
    })
  }

  _fetchPodDetailsFromAPI(data, resolve, reject) {
    const cors_api_url = 'https://cors.io/?';
    const itunes_api_url = 'https://itunes.apple.com/lookup?id=';
    return new Promise((resolve, reject) => {
      axios.get(cors_api_url + itunes_api_url + data.id).then(res => {
        let _data = res.data.results[0];
        this._fetchPodFeed({id: data.id, url: _data.feedUrl}, resolve);
      })
    })
  }

  _fetchPodFeed(data, resolve, reject) {
    const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    let pod_details = JSON.parse(localStorage.getItem('pod_details') || '{}');

    axios.get(cors_api_url + data.url, {dataType: 'xml'}).then(res => {
      parseString(res.data, function (err, result) {
        let rss = result.rss.channel[0];
        rss.updated = new Date();
        rss.id = data.id;
        pod_details[data.id] = rss;
        localStorage.setItem('pod_details', JSON.stringify(pod_details));
        if (Boolean(resolve)) {
          resolve(rss);
        }
      });
    })
  }
}

export let podsService = new PodsService();