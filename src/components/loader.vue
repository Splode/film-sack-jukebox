<template>
  <div class='loader loader4'>
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
$c1: #2196F3;
$c2: whitesmoke;

@mixin lm {
  position: relative;
  margin: 75px auto;
  width: 150px;
  height: 150px;
  display: block;
  overflow: hidden;
}

@mixin lmd {
  border-radius: 50%;
  padding: 8px;
  border: 2px solid transparent;
  animation: rotate linear 3.5s infinite;
}

@mixin ld {
  height: 100%;
}

* {
  box-sizing: border-box;
}

.loader4 {
  @include lm;
}

.loader4 div {
  @include ld;
}

.loader4,
.loader4 div {
  @include lmd;
  border-radius: 50%;
  padding: 4px;
  animation: rotate2 4s infinite linear;
}

div:hover {
  animation-play-state: paused;
}

.loader,
.loader * {
  will-change: transform;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: rotate(0deg);
    border-top-color: $c1;
  }
  50% {
    transform: rotate(180deg);
    border-top-color: $c2;
  }
  100% {
    transform: rotate(360deg);
    border-top-color: $c1;
  }
}
</style>
