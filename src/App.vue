<template>
  <div id="app">
    <h1>{{ currentEpisode.title }}</h1>
    <p>{{ currentEpisode.date }}</p>
    <audio :src="currentEpisode.link" controls></audio>
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
// TODO: create a button that retrieves a random episode
// TODO: background check rss feed for new data

const moment = require('moment')

export default {
  data() {
    return {
      currentEpisode: {
        title: '',
        link: '',
        date: ''
      },
      episodes: null,
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
          // // format publish date for each episode using moment.js
          // data.channel.item.forEach(el => {
          //   el.date = moment(el.pubDate).format('MMMM DD, YYYY');
          // });

          // // set api response object\
          // this.episodes = data.channel.item;

          // // set current episode to the latest episode
          // this.currentEpisode.title = data.channel.item[0].title;
          // this.currentEpisode.link = data.channel.item[0].link;
          // this.currentEpisode.date = data.channel.item[0].date;

          this.setRssData(data);

          // store api call response in localStorage
          localStorage['rssData'] = JSON.stringify(data);
        })
    },

    // choose an episode and send its data to currentEpisode
    select(episode) {
      this.currentEpisode.title = episode.title;
      this.currentEpisode.link = episode.link;
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
  },

  created() {

    // check to see if rssData has previously been stored in localStorage
    if (localStorage.rssData) {
      const data = JSON.parse(localStorage.rssData);
      this.setRssData(data);
    } else {
      this.fetch();
    }
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
