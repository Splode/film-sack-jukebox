<template>
  <div id="app">
    <h1>{{ currentEpisode.title }}</h1>
    <p>{{ currentEpisode.date }}</p>
    <audio :src="currentEpisode.link" controls></audio>
    <ul>
      <li v-for="(episode, index) in episodes" v-bind:key="index">
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
    }
  },
  methods: {
    select(episode) {
      this.currentEpisode.title = episode.title;
      this.currentEpisode.link = episode.link;
    }
  },
  created() {
    // production => path needs to be set to directory relative during build if not on root
    // dev => path proxied for apache server
    // this.$http.get('./static/frog.php')
    this.$http.get('/api/static/frog.php')
    .then(response => {
      return response.json();
    })
    .then(data => {
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
    })
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
