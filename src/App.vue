<template>
  <div id="app">
    <h1>{{ currentEpisode.title }}</h1>
    <p>{{ currentEpisode.date }}</p>
    <audio :src="currentEpisode.link" controls></audio>
    <button @click="randomEpisode">Random</button>
    <input type="text" v-model="search">
    <ul>
      <li v-for="(episode, index) in filteredEpisodes" v-bind:key="index">
        <button @click="select(episode)">
          <h4>{{ episode.title }}</h4>
          <small>{{ episode.date }}</small>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// TODO: write currently playing episode to local storage

const moment = require('moment')
const localforage = require('localforage')

export default {
  data() {
    return {
      currentEpisode: {
        title: '',
        link: '',
        date: ''
      },
      episodes: [],
      search: '',
    }
  },

  computed: {

    filteredEpisodes() {
      return this.episodes.filter(episode => {
        return episode.title.toLowerCase().includes(this.search.toLowerCase());
      })
    }

  },

  methods: {

    // fetch rss data using local php script and handle response, set localStorage
    fetch() {
      // production => path needs to be set to directory relative during build if not on root
      // dev => path proxied for apache server
      // this.$http.get('./static/frog.php')
      this.$http.get('/api/static/frog.php')
        .then(response => {
          return response.json();
        })
        .then(data => {

          this.setRssData(data);

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

    // get a random episode
    randomEpisode() {
      const length = this.episodes.length;
      const rand = Math.floor(Math.random() * (length - 0 + 1)) + 0;
      const episode = this.episodes[rand];
      this.select(episode);
    },

    // retrieve data from local storage or fetch
    retrieveData() {
      localforage.getItem('rssData')
        .then(value => {
          if (value !== null) {
            this.setRssData(value);
          } else {
            this.fetch();
          }
        })
        .catch(err => {
          console.log(err);
        })
    },

    // choose an episode and send its data to currentEpisode
    select(episode) {
      this.currentEpisode.title = episode.title;
      this.currentEpisode.link = episode.link;
      
      // autoplay episode on selection
      document.querySelector('audio').autoplay = true;
    },

    // set rssData from localStorage or api call
    setRssData(data) {

      // format publish date for each episode using moment.js
      data.channel.item.forEach(el => {
        el.date = moment(el.pubDate).format('MMMM DD, YYYY');
      });

      // set api response object\
      this.episodes = data.channel.item;

      // set current episode to the latest episode
      this.currentEpisode.title = data.channel.item[0].title;
      this.currentEpisode.link = data.channel.item[0].link;
      this.currentEpisode.date = data.channel.item[0].date;
    },

    // check for feed updates
    updateCheck() {
      const vm = this;
      setInterval(() => {
        // this.$http.get('./static/frog.php')
        this.$http.get('/api/static/frog.php')
        .then(response => {
          return response.json();
        })
        .then(data => {
          // check if remote feed length differs from local feed length
          const feed = data.channel.item.length;
          const episodes = vm.episodes.length;

          if (feed > episodes) {
            vm.fetch();
          }
        })
        .catch(err => {
          console.log(err);
        })
      }, 3600000); // every hour
    }

  },

  created() {
    // retrieve rss data from local storage or api call
    this.retrieveData();
    
    // check for new episodes
    this.updateCheck();

  }
}
</script>

<style lang="scss">
@import "./assets/normalize.css";
@import "./assets/reset.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button {
  cursor: pointer;
}

ul {
  list-style-type: none;
}
</style>
