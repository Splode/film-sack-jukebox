<template>
  <div>
  
    <section class="row">
      <button class="btn-circle" @click="play">
        <i class="material-icons">play_arrow</i>
      </button>
      <button class="btn-circle" @click="pause">
        <i class="material-icons">pause</i>
      </button>
  
      <button @click="randomEpisode" class="btn-circle">
        <i class="material-icons">shuffle</i>
      </button>
  
      <button class="btn-circle">
        <i class="material-icons">file_download</i>
      </button>
    </section>
  
    <audio id="player" :src="currentEpisode.link"></audio>
  
    <div class="slider-container">
      <input type="range" min="0" :max="player.duration" v-model.number="slider.current" v-on:change="seek" @mousedown="pause" @mouseup="play">
      <div class="slider-bar" :style="{ width: slider.barWidth + '%' }"></div>
    </div>
  
    
    <section class="row">
      <p>{{ prettyCurrent }} / {{ player.prettyDuration }}</p>

      <!--<p>{{ prettyCurrent }}</p>
      <p>{{ player.prettyDuration }}</p>-->
    </section>
  
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
        max: 0,
        range: 0,
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
    },

    pause() {
      document.querySelector('#player').pause();
    },

    play() {
      document.querySelector('#player').play();
      // this.updateSlider();
    },

    prettyTime(time) {
      const duration = moment.duration(time, 'seconds');
      const hour = duration.get('hours');
      const minutes = duration.get('minutes');
      const seconds = duration.get('seconds');

      return `${hour}:${minutes}:${seconds}`;
    },

    randomEpisode() {
      const length = this.episodes.length;
      const rand = Math.floor(Math.random() * (length - 0 + 1)) + 0;
      const episode = this.episodes[rand];

      this.$store.dispatch('select', episode);
    },

    // update audio position based on slider
    seek() {
      document.querySelector('#player').currentTime = this.slider.current;
      console.log(document.querySelector('#player').currentTime)
    },

    // update slider position based on audio playback
    updateSlider() {
      document.querySelector('#player').addEventListener('timeupdate', () => {
        this.slider.current = document.querySelector('#player').currentTime;

        this.slider.barWidth = (document.querySelector('#player').currentTime) / (this.player.duration) * 100;

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
  background: lightgray;
  border-radius: 1.3px;
}

input[type=range]::-webkit-slider-thumb {
  @include box-shadow($lightColorDark);
  @include transition();

  height: 20px;
  width: 20px;
  border-radius: 100%;
  background: $primeColor;
  cursor: pointer; // transition: all .3s cubic-bezier(0.22, 0.61, 0.36, 1);
  -webkit-appearance: none;
  margin-top: -9px;
  z-index: 999;
}

input[type=range]:hover::-webkit-slider-thumb {
  transform: scale3d(1.25, 1.25, 1);
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: lightgray;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
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
