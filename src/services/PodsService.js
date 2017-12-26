import axios from 'axios'
import {isEmpty, head} from 'lodash'
import { moment } from "../helpers/Moment";
import { Pod } from "../components/pods/Pod"
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
      this._fetchPods(resolve, reject);
    })
  }

  _fetchPodsFromLocalStorage() {
    return new Promise((resolve, reject) => {
      let pods = JSON.parse(localStorage.getItem('pods'));
      resolve(pods.entry);
    })
  }

  _fetchPods(resolve, reject) {
    axios.get("https://itunes.apple.com/us/rss/toppodcasts/limit=120/genre=1310/json")
    .then(res => {
      let feed = res.data.feed;
      feed.entry = feed.entry.slice(0, 100);
      localStorage.setItem('pods', JSON.stringify(feed));
      if (Boolean(resolve)) {
        resolve(feed.entry);
      }
    })
    .catch( error => {
      this._handleError(error, reject);
    });
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
      const pod = new Pod(details[data.id]);
      resolve(pod.params());
    })
  }

  _fetchPodDetailsFromAPI(data) {
    const cors_api_url = 'https://cors.io/?';
    const itunes_api_url = 'https://itunes.apple.com/lookup?id=';
    return new Promise((resolve, reject) => {
      axios.get(cors_api_url + itunes_api_url + data.id)
      .then(res => {
        let _data = res.data.results[0];
        this._fetchPodFeed({id: data.id, url: _data.feedUrl}, resolve, reject);
      })
      .catch( error => {
        this._handleError(error, reject);
      });
    })
  }

  _fetchPodFeed(data, resolve, reject) {
    const cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    let pod_details = JSON.parse(localStorage.getItem('pod_details') || '{}');

    axios.get(cors_api_url + data.url, {dataType: 'xml'})
    .then(res => {
      parseString(res.data, (err, result) => {
        if (!result || !result.rss || !head(result.rss.channel)) {
          return this._handleError(
            {message: "Pod with id " + data.id + " has an invalid RSS response format"},
            reject
          )
        }
        let rss = head(result.rss.channel);
        rss.updated = new Date();
        rss.id = data.id;
        let pod = new Pod(rss);
        pod_details[data.id] = pod.params();
        if (result) localStorage.setItem('pod_details', JSON.stringify(pod_details));
        if (Boolean(resolve)) {
          resolve(pod.params());
        }
      });
    })
    .catch( error => {
      this._handleError(error, reject);
    });
  }

  _handleError(error, reject){
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.request);
    }

    console.log(error.config);
    console.log('Error', error.message);
    reject(error.message);
  }

}

export let podsService = new PodsService();