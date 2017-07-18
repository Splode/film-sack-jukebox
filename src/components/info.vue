<template>
  <div class="modal bg-dark">
  
    <div class="container d-flex flex-direction-column justify-content-center modal-container">
  
      <section class="row d-flex flex-direction-column info" v-on-clickaway="toggleInfo">
  
        <button class="btn-circle btn-close" title="Close" @click="toggleInfo">
          <i class="material-icons">close</i>
        </button>
  
        <h2>Film Sack Jukebox</h2>
        <p class="mb-1">A podcast web app for the Frog Pants podcast, Film Sack.</p>
        <p>Film Sack is a weekly podcast focused on film and television created by Scott Johnson on the FrogPants Studios Network. It is hosted by Scott Johnson, Brian Ibbott, Brian Dunaway, and Randy Jordan.</p>
  
        <p class="mt-1">Made by
          <a href="http://christopherianmurphy.com" target="_blank">Christopher Murphy</a>
        </p>
        <p>
          <a href="http://filmsack.com" target="_blank">Film Sack</a> <span class="highlight">&bigstar;</span>
          <a href="http://frogpants.com" target="_blank">frogpants studios</a>
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

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
  },

  mixins: [clickaway]
}
</script>

<style lang="scss">
@import "./../assets/helper.scss";
@import "./../assets/main.scss";

$bg-light-alpha: rgba(58, 56, 73, .8);

// .bg-dark-transparent {
//   background: rgba(23, 21, 35, 1);
// }

.bg-light-transparent {
  background: $bg-light-alpha;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
}

.highlight {
  color: $primeColor;
}

.info {
  // @include box-shadow($bg-light-alpha);
  line-height: 2em;
  padding: 5em 20%;
  position: relative;
}

.info a {
  @include transition();

  color: $secondColor;
  text-decoration: none;
}

.info h2 {
  font-size: 2.5em;
}

.info h2+p {
  color: $primeColor;
  font-family: 'Zilla Slab', serif;
  font-size: 1.5em;
}

.info p {
  font-family: 'Roboto', sans-serif;
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

// target small mobile
@media (max-width: 425px) {
  .info {
    padding: 5em 2%;
  }
}

// target tablet
@media (max-width: 769px) {
  .btn-close {
    margin: 2em !important;
  }

  .info {
    padding: 5em 10%;
    position: static;
  }
}

// target above tablet
@media (min-width: 769px) {
  .info a:hover {
    color: $primeColor;
  }
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
