<template>
  <div>
    <audio id="player" src="http://feeds.soundcloud.com/stream/322664743-scott-johnson-27-filmsack-mka.mp3"></audio>

    <button class="btn-circle" @click="play">
      <i class="material-icons">play_arrow</i>
    </button>
    <button class="btn-circle" @click="pause">
      <i class="material-icons">pause</i>
    </button>
  
    <button class="btn-circle">
      <i class="material-icons">file_download</i>
    </button>
  
    <input type="range" min="0" :max="slider.max" v-model.number="slider.current">
  
  </div>
</template>

<script>
export default {
  data() {
    return {
      slider: {
        current: 0,
        max: 300,
        range: 0,
      }
    }
  },

  methods: {
    pause() {
      document.querySelector('#player').pause();
    },
    play() {
      document.querySelector('#player').play();
      // track current position in player
      this.trackTime();
    },
    trackTime() {
      const vm = this;
      setInterval(() => {
        vm.slider.current = document.querySelector('#player').currentTime;
      }, 500)
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/main.scss";

input[type=range] {
  margin: 18px 0;
  position: relative;
  width: 100%;
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::after {
  background-color: purple;
  content: '';
  position: absolute;
  width: 23%;
  height: 3px;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  animate: 0.2s;
  background: lightgray;
  border-radius: 1.3px;
}

input[type=range]::-webkit-slider-thumb {
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background: gray;
  cursor: pointer;
  transition: all .3s $timingCurve;
  -webkit-appearance: none;
  margin-top: -9px;
}

input[type=range]:hover::-webkit-slider-thumb {
  background: sandybrown;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: lightgray;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
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
  height: 8.4px;
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
