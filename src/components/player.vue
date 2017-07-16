<template>
  <div>
  
    <!--audio controls-->
    <section class="row d-flex justify-content-around">
  
      <button @click="seek(10)" class="btn-circle" title="Rewind 10 seconds">
        <i class="material-icons">replay_10</i>
      </button>
  
      <!--play / pause-->
      <transition-group name="fade" mode="out-in">
        <button class="btn-circle" @click="play" v-if="player.paused || player.paused === null" :key="play">
          <i class="material-icons">play_arrow</i>
        </button>
        <button class="btn-circle" @click="pause" v-else :key="pause">
          <i class="material-icons">pause</i>
        </button>
      </transition-group>
  
      <button @click="seek(30)" class="btn-circle" title="Advance 30 seconds">
        <i class="material-icons">forward_30</i>
      </button>
  
      <button @click="randomEpisode" class="btn-circle" title="Random episode">
        <i class="material-icons">shuffle</i>
      </button>
  
      <!--<button class="btn-circle">
                          <i class="material-icons">file_download</i>
                        </button>-->
    </section>
  
    <audio id="player" :src="currentEpisode.link" preload="auto"></audio>
  
    <div class="slider-container">
      <input type="range" min="0" :max="player.duration" v-model.number="slider.current" @mousedown="pause" @mouseup="handler(scrub, play)" @touchstart="pause" @touchend="handler(scrub, play)">
      <!--<input type="range" min="0" :max="player.duration" v-model.number="slider.current" v-on:change="scrub" @mousedown="pause" @mouseup="play">-->
      <div class="slider-bar" :style="{ width: slider.barWidth + '%' }"></div>
    </div>
  
    <section class="row my-1">
      <transition name="fade" mode="out-in">
        <div v-if="player.readyState < 2">
          <p :class="{ hidden: player.readyState === null }">Loading...</p>
        </div>
        <div v-else-if="player.readyState >= 2 || !player.paused" class="d-flex justify-content-around">
          <p>{{ prettyCurrent }}</p>
          <p>{{ player.prettyDuration }}</p>
        </div>
      </transition>
    </section>
  
    <!--debugging audio on iOS-->
    <!--<section class="row">
              <p v-cloak>{{ prettyCurrent }} / {{ player.prettyDuration }}</p>
              <p>player: {{ player }}</p>
              <p>autoplay: {{ player.autoplay }}</p>
              <p>currentTime: {{ player.currentTime }}</p>
              <p>duration: {{ player.duration }}</p>
              <p>paused: {{ player.paused }}</p>
              <p>readyState: {{ player.readyState }}</p>
            </section>-->
  
  </div>
</template>

<script>
const moment = require('moment')

export default {
  data() {
    return {
      player: {
        autoplay: null,
        currentTime: null,
        duration: null,
        paused: null,
        readyState: null,
        volume: null
      },
      slider: {
        current: 0,
        barWidth: 0,
      },
    }
  },

  computed: {

    currentEpisode() {
      return this.$store.getters.currentEpisode;
    },

    episodes() {
      return this.$store.getters.filteredEpisodes;
    },

    prettyCurrent() {
      return this.prettyTime(this.slider.current);
    },

  },

  methods: {

    createPlayerObj() {
      const audio = document.querySelector('#player');

      audio.addEventListener('loadeddata', () => {
        this.player = {
          autoplay: audio.autoplay,
          currentTime: audio.currentTime,
          duration: audio.duration,
          paused: audio.paused,
          prettyDuration: this.prettyTime(audio.duration),
          readyState: audio.readyState,
          volume: audio.volume,
        }

      });

      // reset audio readyState on episode change
      audio.addEventListener('abort', () => {
        this.player.readyState = audio.readyState;
      });
    },

    // executes multiple functions on DOM events
    handler(func1, func2) {
      func1();
      func2();
    },

    pause() {
      document.querySelector('#player').pause();
      this.player.paused = true;
    },

    play() {
      document.querySelector('#player').play();
      this.player.paused = false;
    },

    // use moment to convert audio time to a nicer format
    prettyTime(time) {
      const duration = moment.duration(time, 'seconds');

      const hour = duration.get('hours');
      const minutes = duration.get('minutes');
      const seconds = duration.get('seconds');

      return `${hour}:${minutes}:${seconds}`;
    },

    // select a random episode
    randomEpisode() {
      // find a random episode from unfiltered episodes list
      const length = this.$store.state.episodes.length;
      const rand = Math.floor(Math.random() * (length - 0 + 1)) + 0;
      const episode = this.$store.state.episodes[rand];

      this.$store.dispatch('select', episode);
      // clear search
      this.searchClose('');
    },

    // update audio position based on slider
    scrub() {
      document.querySelector('#player').currentTime = this.slider.current;
      // console.log(document.querySelector('#player').currentTime)
    },

    // set search field
    searchClose(val) {
      this.$store.dispatch('search', val);
    },

    // fast-forward or rewind
    seek(dir) {
      let time = document.querySelector('#player');
      let slider = this.slider.current;

      if (dir === 30) {
        slider += dir;
        time.currentTime += dir;
      } else {
        slider -= dir;
        time.currentTime -= dir;
      }
    },

    // update slider position based on audio playback
    updateSlider() {
      let audio = document.querySelector('#player');

      audio.addEventListener('timeupdate', () => {
        this.slider.current = audio.currentTime;

        this.slider.barWidth = (audio.currentTime) / (this.player.duration) * 100;

        this.player.paused = audio.paused;

      })
    },
  },

  mounted() {
    // call slider update
    this.updateSlider();

    // load audio player attributes on change
    this.createPlayerObj();
  },
}
</script>

<style lang="scss">
@import "./../assets/helper.scss";
@import "./../assets/main.scss";

.slider-bar {
  background: $primeColor;
  position: absolute;
  top: calc(50% + 4px);
  height: 2px;
}

.slider-container {
  margin: 0 auto;
  position: relative;
  width: 96%;
}

input[type=range] {
  position: relative;
  width: 100%;
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer; // animate: 0.2s;
  background: $lightColor;
  border-radius: 1.3px;
}

input[type=range]::-webkit-slider-thumb {
  @include box-shadow($lightColorDark);
  @include transition();

  height: 20px;
  width: 20px;
  border-radius: 100%;
  background: $primeColor;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9px;
  z-index: 999;
}

input[type=range]:hover::-webkit-slider-thumb {
  @include box-shadow($primeColor);
  transform: scale3d(1.25, 1.25, 1);
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: $lightColor;
}

// Mozilla style rules
_:-moz-tree-row(hover),
input[type=range] {
  position: absolute;
  left: 0;
  top: -4.5px;
  width: 100%;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer; // animate: 0.2s;
  background: $lightColor;
  border-radius: 1.3px;
}

input[type=range]::-moz-range-thumb {
  @include box-shadow($lightColorDark);
  @include transition();

  height: 20px;
  width: 20px;
  border-radius: 100%;
  background: $primeColor;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -9px;
  z-index: 999;
}

input[type=range]:hover::-moz-range-thumb {
  @include box-shadow($primeColor);
  transform: scale3d(1.25, 1.25, 1);
}

input[type=range]::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}

input[type=range]::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type=range]::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}

input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]:focus::-ms-fill-lower {
  background: #3071a9;
}

input[type=range]:focus::-ms-fill-upper {
  background: #367ebd;
}
</style>
