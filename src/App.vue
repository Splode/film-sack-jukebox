<template>
  <main id="app">
  
    <transition name="fade" mode="out-in">
      <app-info v-if="infoOpen"></app-info>
    </transition>
  
    <div class="container">
  
      <transition name="fade" mode="out-in">
  
        <!-- main app -->
        <div v-if="running" class="content mt-2">
  
          <header class="row">
            <h1>Film Sack Jukebox</h1>
          </header>
  
          <!-- current episode -->
          <section class="row mb-2">
            <h2>{{ currentEpisode.title }}</h2>
            <p>{{ currentEpisode.date }}</p>
          </section>
  
          <!-- custom audio player -->
          <section class="row">
            <app-player></app-player>
          </section>
  
          <!-- episode drawer -->
          <a id="drawer"></a>
          <!-- episode drawer toggler -->
          <section class="row d-flex justify-content-center">
  
            <button class="btn-circle" title="About" @click="toggleInfo">
              <i class="material-icons">more_horiz</i>
            </button>
  
            <button class="btn-circle" @click="toggleDrawer" title="Toggle all episodes">
              <transition name="fade" mode="out-in">
                <i class="material-icons" v-if="!drawerOpen">expand_more</i>
                <i class="material-icons" v-else>expand_less</i>
              </transition>
            </button>
          </section>
  
          <!-- episode filter input field -->
          <transition name="fade">
            <div v-if="drawerOpen">
              <section class="row">
                <div class="search-container">
                  <input type="text" @input="search" v-model="query">
                  <transition name="fade" mode="out-in">
                    <i class="material-icons icon-search" v-if="query === ''">search</i>
                    <i class="material-icons icon-search icon-close" v-else @click="searchClose('')">close</i>
                  </transition>
                </div>
              </section>
  
              <!-- episode list -->
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
  
        <!-- initial loading screen -->
        <app-worm-loader v-else></app-worm-loader>
  
      </transition>
  
    </div>
  
  </main>
</template>

<script>
// TODO: write currently playing episode to local storage

const moment = require('moment')
const localforage = require('localforage')
import jump from 'jump.js'

import appInfo from './components/info'
import appPlayer from './components/player'
import appLoader from './components/loader'
import appWormLoader from './components/worm-loader'

export default {

  components: {
    appInfo,
    appPlayer,
    appLoader,
    appWormLoader
  },

  computed: {
    currentEpisode() {
      return this.$store.getters.currentEpisode;
    },

    drawerOpen() {
      return this.$store.state.drawerOpen;
    },

    episodes() {
      return this.$store.getters.filteredEpisodes;
    },

    infoOpen() {
      return this.$store.state.infoOpen;
    },

    query() {
      return this.$store.state.query;
    },

    running() {
      return this.$store.state.running;
    }

  },

  methods: {
    // choose an episode and send its data to currentEpisode
    select(episode) {

      this.$store.dispatch('select', episode);

      // close drawer after selecting episode
      this.toggleDrawer();
    },

    search(e) {
      this.$store.dispatch('search', e.target.value);
    },

    searchClose(val) {
      this.$store.dispatch('search', val);
    },

    toggleDrawer() {
      // open drawer if closed
      if (!this.drawerOpen) {
        jump('#drawer');
        this.$store.dispatch('toggleState', 'drawer');
      } else {
        // move to top first
        jump('#app');
        // then close drawer after 1.5s for smooth transition
        const vm = this;
        setTimeout(() => {
          vm.$store.dispatch('toggleState', 'drawer');
        }, 1500);
      }
    },

    toggleInfo() {
      if (this.drawerOpen) {
        jump('#app');
      }
      this.$store.dispatch('toggleState', 'info');
      this.$store.dispatch('noScroll');
    }

  },

  created() {
    // retrieve rss data from local storage or api call
    this.$store.dispatch('retrieveData');

    // check for new episodes
    this.$store.dispatch('updateCheck');
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

.content {
  width: 600px;
}

.icon-search {
  position: absolute;
  right: 0;
  top: -2px;
}

.icon-close {
  @include transition();

  cursor: pointer;
}

.search-container {
  position: relative;
  margin: 2em auto;
  width: 400px;
}

// target above tablet
@media (min-width: 769px) {
  .icon-close:hover {
    color: $primeColor;
  }
}
</style>
