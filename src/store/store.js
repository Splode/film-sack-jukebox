import Vue from 'vue'
import Vuex from 'vuex'

const moment = require('moment')
const localforage = require('localforage')
import jump from 'jump.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentEpisode: {
      date: '',
      link: '',
      title: ''
    },
    episodes: [],
    loader: true,
    query: ''
  },

  actions: {

    // fetch rss data using local php script and handle response, set localStorage
    fetch(context) {
      // production => path needs to be set to directory relative during build if not on root
      // dev => path proxied for apache server
      // Vue.http.get('./static/frog.php')
      Vue.http.get('/api/static/frog.php')
        .then(response => {
          return response.json();
        })
        .then(data => {

          context.commit('setRssData', data);

          // store api call response using localForage
          localforage.setItem('rssData', data)
            .then(value => {
              console.log('Successfully stored rss data');
            })
            .catch(err => {
              console.log(err);
            })
        })
    },

    // retrieve data from local storage or fetch
    retrieveData(context) {
      localforage.getItem('rssData')
        .then(value => {
          if (value !== null) {
            context.commit('setRssData', value);
          } else {
            context.dispatch('fetch');
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    search(context, val) {
      context.commit('setQuery', val);
    },

    select(context, episode) {
      context.commit('setCurrentEpisode', episode);

      // autoplay episode on selection
      document.querySelector('#player').autoplay = true;
    },

    // check for feed updates
    updateCheck(context) {
      const $vue = Vue;
      const $context = context;
      setInterval(() => {
        // Vue.http.get('./static/frog.php')
        $vue.http.get('/api/static/frog.php')
          .then(response => {
            return response.json();
          })
          .then(data => {
            // check if remote feed length differs from local feed length
            const feed = data.channel.item.length;
            const episodes = $context.state.episodes.length;

            console.log('Updated Feed')

            if (feed > episodes) {
              $context.commit('fetch');
            }
          })
          .catch(err => {
            console.log(err);
          })
      }, 3600000); // every hour
    },

  },

  getters: {

    currentEpisode: state => {
      return state.currentEpisode;
    },

    filteredEpisodes: state => {
      const vm = state;
      return state.episodes.filter(episode => {
        return episode.title.toLowerCase().includes(vm.query.toLowerCase());
      })
    }

  },

  mutations: {

    setCurrentEpisode(state, episode) {
      state.currentEpisode.title = episode.title;
      state.currentEpisode.link = episode.link;
    },

    setQuery(state, val) {
      state.query = val;
    },

    // set rssData from localStorage or api call
    setRssData(state, data) {

      // format publish date for each episode using moment.js
      data.channel.item.forEach(el => {
        el.date = moment(el.pubDate).format('MMMM DD, YYYY');
      });

      // set api response object\
      state.episodes = data.channel.item;

      // set current episode to the latest episode
      state.currentEpisode.title = data.channel.item[0].title;
      state.currentEpisode.link = data.channel.item[0].link;
      state.currentEpisode.date = data.channel.item[0].date;
    },

  },

})