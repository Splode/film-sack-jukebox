<template>
  <div class="modal bg-dark-transparent">
  
    <div class="container d-flex flex-direction-column justify-content-center modal-container">
  
      <section class="row d-flex flex-direction-column justify-content-center align-items-center p-5 bg-light-transparent info">
  
        <button class="btn-circle btn-close" title="Close" @click="toggleInfo">
          <i class="material-icons">close</i>
        </button>
  
        <h2>Film Sack Jukebox</h2>
        <p>A podcast web app for the Frog Pants podcast, Film Sack.</p>
        <p>Film Sack is a weekly podcast focused on film and television created by Scott Johnson on the FrogPants Studios Network. It is hosted by Scott Johnson, Brian Ibbott, Brian Dunaway, and Randy Jordan.</p>
  
        <p>Made by
          <a href="http://christopherianmurphy.com" target="_blank">Christopher Murphy</a>
        </p>
        <p>
          <a href="http://frogpants.com" target="_blank">frogpants studios</a>
        </p>
        <p>
          <a href="http://filmsack.com" target="_blank">Film Sack</a>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    infoOpen() {
      return this.$store.state.infoOpen;
    },

    modalClasses() {
      return {
        'slide-in': this.infoOpen,
        'slide-out': this.infoOpen === false,
      }
    }
  },

  methods: {
    toggleInfo() {
      this.$store.dispatch('toggleState', 'info');
      this.$store.dispatch('noScroll');
    }
  }
}
</script>

<style lang="scss">
@import "./../assets/helper.scss";
@import "./../assets/main.scss";

$bg-light-alpha: rgba(58, 56, 73, .5);

.bg-dark-transparent {
  background: rgba(23, 21, 35, .85);
}

.bg-light-transparent {
  background: $bg-light-alpha;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
}

.info {
  @include box-shadow($bg-light-alpha);

  position: relative;
}

.modal-container {
  height: 100%;
}

.modal {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

// .slide-enter {
//   animation: slide-in .3s ease forwards;
// }
// .slide-leave {
//   animation: slide-out .3s ease forwards;
// }
// @keyframes slide-in {
//   0% {
//     transform: translateY(-100vh);
//   }
//   100% {
//     transform: translateY(0);
//   }
// }
// @keyframes slide-out {
//   0% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: translateY(-100vh);
//   }
// }
</style>
