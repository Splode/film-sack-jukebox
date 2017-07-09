<template>
  <main id="app" class="container">
  
    <transition name="fade" mode="out-in">
  
      <div v-if="running">
  
        <header class="row">
          <h1>Film Sack Jukebox</h1>
        </header>
  
        <section class="row">
          <h2>{{ currentEpisode.title }}</h2>
          <p>{{ currentEpisode.date }}</p>
        </section>
  
        <section class="row">
          <app-player></app-player>
        </section>
  
        <section class="row d-flex justify-content-end">
          <button class="btn-circle" @click="toggleDrawer">
            <transition name="fade" mode="out-in">
              <i class="material-icons" v-if="!drawerOpen">expand_more</i>
              <i class="material-icons" v-else>expand_less</i>
            </transition>
          </button>
        </section>
  
        <transition name="fade">
          <div v-if="drawerOpen">
            <section class="row">
              <div class="search-container">
                <input type="text" @input="search">
                <i class="material-icons icon-search">search</i>
              </div>
            </section>
  
            <section class="row">
              <ul>
                <li v-for="(episode, index) in episodes" v-bind:key="index">
                  <button @click="select(episode)">
                    <h3>{{ episode.title }}</h3>
                    <p>{{ episode.date }}</p>
                  </button>
                </li>
              </ul>
            </section>
          </div>
        </transition>
  
      </div>
  
      <app-worm-loader v-else></app-worm-loader>
  
    </transition>
  
  </main>
</template>

<script>
// TODO: write currently playing episode to local storage

const moment = require('moment')
const localforage = require('localforage')
import jump from 'jump.js'

import appPlayer from './components/player'
import appLoader from './components/loader'
import appWormLoader from './components/worm-loader'

export default {

  components: {
    appPlayer,
    appLoader,
    appWormLoader
  },

  computed: {

    // filteredEpisodes() {
    //   return this.episodes.filter(episode => {
    //     return episode.title.toLowerCase().includes(this.search.toLowerCase());
    //   })
    // }

    currentEpisode() {
      return this.$store.getters.currentEpisode;
    },

    drawerOpen() {
      return this.$store.state.drawerOpen;
    },

    episodes() {
      return this.$store.getters.filteredEpisodes;
    },

    running() {
      return this.$store.state.running;
    }

  },

  methods: {

    // fetch rss data using local php script and handle response, set localStorage
    // fetch() {
    //   // production => path needs to be set to directory relative during build if not on root
    //   // dev => path proxied for apache server
    //   // this.$http.get('./static/frog.php')
    //   this.$http.get('/api/static/frog.php')
    //     .then(response => {
    //       return response.json();
    //     })
    //     .then(data => {

    //       this.setRssData(data);

    //       // store api call response using localForage
    //       localforage.setItem('rssData', data)
    //         .then(value => {
    //           console.log('Successfully stored rss data');
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         })
    //     })
    // },

    // get a random episode
    // randomEpisode() {
    //   const length = this.episodes.length;
    //   const rand = Math.floor(Math.random() * (length - 0 + 1)) + 0;
    //   const episode = this.episodes[rand];
    //   this.select(episode);
    // },

    // retrieve data from local storage or fetch
    // retrieveData() {
    //   localforage.getItem('rssData')
    //     .then(value => {
    //       if (value !== null) {
    //         this.setRssData(value);
    //       } else {
    //         this.fetch();
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    // },

    // choose an episode and send its data to currentEpisode
    select(episode) {
      // this.currentEpisode.title = episode.title;
      // this.currentEpisode.link = episode.link;

      this.$store.dispatch('select', episode);
      this.toggleDrawer();

      // autoplay episode on selection
      // document.querySelector('#player').autoplay = true;

      jump('#app');
    },

    // // set rssData from localStorage or api call
    // setRssData(data) {

    //   // format publish date for each episode using moment.js
    //   data.channel.item.forEach(el => {
    //     el.date = moment(el.pubDate).format('MMMM DD, YYYY');
    //   });

    //   // set api response object\
    //   this.episodes = data.channel.item;

    //   // set current episode to the latest episode
    //   this.currentEpisode.title = data.channel.item[0].title;
    //   this.currentEpisode.link = data.channel.item[0].link;
    //   this.currentEpisode.date = data.channel.item[0].date;
    // },

    // check for feed updates
    // updateCheck() {
    //   const vm = this;
    //   setInterval(() => {
    //     // this.$http.get('./static/frog.php')
    //     this.$http.get('/api/static/frog.php')
    //       .then(response => {
    //         return response.json();
    //       })
    //       .then(data => {
    //         // check if remote feed length differs from local feed length
    //         const feed = data.channel.item.length;
    //         const episodes = vm.episodes.length;

    //         if (feed > episodes) {
    //           vm.fetch();
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       })
    //   }, 3600000); // every hour
    // },

    search(e) {
      this.$store.dispatch('search', e.target.value);
    },

    toggleDrawer() {
      this.$store.dispatch('toggleDrawer');
    }

  },

  created() {

    // retrieve rss data from local storage or api call
    // this.retrieveData();

    // retrieve rss data from local storage or api call
    this.$store.dispatch('retrieveData');

    // check for new episodes
    this.$store.dispatch('updateCheck');

    // check for new episodes
    // this.updateCheck();

  }
}
</script>

<style lang="scss">
@import "./assets/normalize.css";
@import "./assets/reset.css";
@import "./assets/helper.scss";
@import "./assets/main.scss";

button {
  cursor: pointer;
}

ul {
  list-style-type: none;
}

.icon-search {
  position: absolute;
  right: 0;
  top: -2px;
}

.search-container {
  position: relative;
  margin: 2em auto;
  width: 400px;
}
</style>
