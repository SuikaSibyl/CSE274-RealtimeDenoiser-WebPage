<template>
  <div class="home">
    <div id="giUnfiltFilt"></div>
    <div id="giFiltGT"></div>
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
      el: '#giUnfiltFilt',
      beforeImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-noisy-gi-cornellbox.png',
      afterImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-filtered-gi-cornellbox.png',
      width: '90%', // slide-wrap width, default 100%
      height: '400px', // slide-wrap height, default image-height
      line: true, // Dividing line, default true
      lineColor: 'rgba(0,0,0,0.1)', // Dividing line color, default rgba(0,0,0,0.5)
    });
    new SliderBar({
      el: '#giFiltGT',
      beforeImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-filtered-gi-cornellbox.png',
      afterImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-benchmark-gi-cornellbox.png',
      width: '90%', // slide-wrap width, default 100%
      height: '400px', // slide-wrap height, default image-height
      line: true, // Dividing line, default true
      lineColor: 'rgba(0,0,0,0.1)', // Dividing line color, default rgba(0,0,0,0.5)
    });
  },
};
</script>
