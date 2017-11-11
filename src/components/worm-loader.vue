<template>
  <div class="wrapper">
    <div class="droplet-container">
      <i class="droplet" v-for="i in 10" :key="i"></i>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
// @import "./../assets/main.scss";
@import './../assets/_variables.scss';

$droplet-size: 20px;

@mixin drop($delay) {
  animation: drop-in 1s ease infinite;
  animation-delay: $delay;
}

.droplet-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 6em;
}

.droplet {
  @include box-shadow($primeColor);

  background-color: $primeColor;
  border-radius: 100%;
  margin: 0 auto;
  width: $droplet-size;
  height: $droplet-size;

  &:nth-child(1) {
    @include drop(.1s);
  }
  &:nth-child(2) {
    @include drop(.2s);
  }
  &:nth-child(3) {
    @include drop(.3s);
  }
  &:nth-child(4) {
    @include drop(.4s);
  }
  &:nth-child(5) {
    @include drop(.5s);
  }
  &:nth-child(6) {
    @include drop(.6s);
  }
  &:nth-child(7) {
    @include drop(.7s);
  }
  &:nth-child(8) {
    @include drop(.8s);
  }
  &:nth-child(9) {
    @include drop(.9s);
  }
  &:nth-child(10) {
    @include drop(1s);
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; // NOTE: iOS browsers require explicit height
}

@keyframes drop-in {
  0% {
    transform: translatey(0);
  }
  33% {
    transform: translatey($droplet-size * 2);
  }
  66% {
    opacity: 1;
    transform: translatey($droplet-size * 2);
  }
  100% {
    transform: translatey(0);
  }
}
</style>
