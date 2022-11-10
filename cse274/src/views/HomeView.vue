<template>
  <div class="home">
    <div id="mySlider"></div>
    <div id="whatever">hello</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import SliderBar from 'before-after-slider'; // import

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  mounted() {
    // new SliderBar({options});
    /* eslint-disable no-new */
    new SliderBar({
      el: '#mySlider',
      beforeImg: 'https://github.com/SuikaSibyl/MyFigures/blob/main/ImageHost/274denoiser-filtered-gi-cornellbox.png',
      afterImg: 'https://github.com/SuikaSibyl/MyFigures/blob/main/ImageHost/274denoiser-benchmark-gi-cornellbox.png',
      width: '90%', // slide-wrap width, default 100%
      height: '400px', // slide-wrap height, default image-height
      line: false, // Dividing line, default true
      lineColor: 'rgba(0,0,0,0.5)', // Dividing line color, default rgba(0,0,0,0.5)
    });
  },
};
</script>
