import axios from 'axios'
import {isEmpty} from 'lodash'
var parseString = require('xml2js').parseString;

class PodsService {
  getPods() {
    if (this._freshDataPresentLocally()) {
      return this._fetchPodsFromLocalStorage();
    }
    else {
      return this._fetchPodsFromAPI();
    }
  }

  _freshDataPresentLocally() {
    let data = JSON.parse(localStorage.getItem('pods'));
    if (isEmpty(data)) return false;
    let updated_at = new Date(data.updated.label);
    let date = new Date();
    date.setDate(date.getDate() - 1);
    return updated_at.getTime() > date.getTime();
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
    return new Promise((resolve, reject) => {
      this._fetchPodDetails(data.podId, resolve);
    })
  }

  _fetchPodDetails(podId, resolve, reject) {
    const cors_api_url = 'https://cors.io/?';
    const itunes_api_url = 'https://itunes.apple.com/lookup?id=';
    axios.get(cors_api_url + itunes_api_url + podId).then(res => {
      if (Boolean(resolve)) {
        resolve(res.data.results[0]);
      }
    })
  }

  getPodFeed(data) {
    return new Promise((resolve, reject) => {
      this._fetchPodFeed(data.feedUrl, resolve);
    })
  }

  _fetchPodFeed(feedUrl, resolve, reject) {
    const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    axios.get(cors_api_url + feedUrl, {dataType: 'xml'}).then(res => {
      parseString(res.data, function (err, result) {
        if (Boolean(resolve)) {
          resolve(result.rss.channel[0]);
        }
      });
    })
  }
}

export let podsService = new PodsService();