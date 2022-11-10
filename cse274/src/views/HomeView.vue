<template>
  <div class="home">
    <div class="common-layout">
      <el-container>
        <el-header>
          <h1 id="Milestone 2 For CSE 274">Milestone 2 For CSE 274</h1>
        </el-header>
        <el-container>
          <el-container>
            <el-main>
              <el-row class="row-bg">
                <h2 id="1. Introduction">1. Introduction</h2>
                <p style="text-align:left">
                  In this project, I implemented a realtime ray tracing denoiser,
                  including techniques like AAF  (axis aligned filter) and MAAF
                  (multiple axis aligned filter). The implementation is based on
                  Vulkan ray tracing extension, integrated into my personal toy
                  engine project <a href="https://github.com/SuikaSibyl/SIByLEngine2022">
                  SIByL Engine</a>.
                </p>
                <p style="text-align:left">
                  Essentially, in this project I re-implement some papers:
                </p>
              </el-row>
              <el-row class="row-bg" justify="left">
                <li><a href="http://graphics.berkeley.edu/papers/UdayMehta-AAF-2012-12/">
                    Axis-Aligned Filtering for Interactive Sampled Soft Shadows
                  </a></li>
                  <li><a href="https://cseweb.ucsd.edu/~ravir/filtering_GI_final.pdf">
                    Axis-Aligned Filtering for Interactive Physically-Based
                    Diffuse Indirect Lighting
                  </a></li>
                  <li><a href="https://cseweb.ucsd.edu/~ravir/paper_maaf.pdf">
                    Multiple Axis-Aligned Filters for Rendering of Combined
                    Distribution Effects
                  </a></li>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">
                <br>
                  And some closely related papers are:
                </p>
              </el-row>
              <el-row class="row-bg" justify="left">
                <li><a href="https://cseweb.ucsd.edu//~ravir/aaf.pdf">
                  Factored Axis-Aligned Filtering for Rendering Multiple
                  Distribution Effects
                </a></li>
                <li><a href="https://dl.acm.org/doi/pdf/10.1145/2816814">
                  Fast 4D Sheared Filtering for Interactive Rendering
                  of Distribution Effects
                </a></li>
              </el-row>
              <el-row class="row-bg" justify="left">
                <br>
                <p style="text-align:left">
                  Implementation is only compatible with Windows OS and Nvidia RTX GPU.
                  All the results are run and measuredon my personal RTX 3070 laptop.
                </p>
              </el-row>
              <!-- Chapter 2: Implementation -->
              <el-row class="row-bg" justify="left">
                <h2 id="2. Implementation">2. Implementation</h2>
                <p style="text-align:left">
                  I implemented MAAF (not yet actually) and some of its previous works,
                  doing local frequency analysis and adaptive sampling & reconstruction to
                  achieve realtime denoise for ray tracing.
                </p>
                <h2 id="3. Results">3. Results</h2>
                <p style="text-align:left">
                  Here are some of our results. Notice that all the results are run and
                  measured on my personal RTX 3070 Laptop device. Framebuffer sizes are
                  fixed to 800 X 600 pixels.
                </p>
              </el-row>
              <!-- soft shadow -->
              <el-row class="row-bg" justify="left">
                <h3 id="3.1. aafss">3.1 AAF Soft Shadow</h3><br/>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">I implemented AAF based soft sahdow
                  accroding to the paper:
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                  <p style="text-align:center">
                    <a href="http://graphics.berkeley.edu/papers/UdayMehta-AAF-2012-12/">
                      Axis-Aligned Filtering for Interactive Sampled Soft Shadows
                    </a>
                  </p>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">In our implementation, we use
                  one bounce indirect lighting, 16 stratified initial samples
                  and up to 84 adaptive continue samples for global illumination.
                  No slope blur, and only do adaptive filtering on indirect light,
                  which is later combined with direct light (use next event estimation).
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                  <el-col :span=auto>
                    <div id="ssUnfiltFilt"></div>
                    <p><code>left: initial sample results | right: filtered result</code></p>
                    <div id="ssFiltGT"></div>
                    <p><code>left: filtered result | right: ground truth</code></p>
                  </el-col>
                  <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
                  <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">We can run AAF Soft Shadow in realtime with 300fps in
                  800X600. We use different random seed per frame and still get robust
                  result without significant temporal anliasing. Here is a demo with animation:
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/jfqbPddvzgI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </el-row>
              <!-- global illumination -->
              <el-row class="row-bg" justify="left">
                <h3 id="3.2. aafgi">3.2 AAF Global Illumination</h3><br/>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">I implemented AAF based diffuse
                  global illumination accroding to the paper:
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                  <p style="text-align:center">
                    <a href="https://cseweb.ucsd.edu/~ravir/filtering_GI_final.pdf">
                      Axis-Aligned Filtering for Interactive Physically-Based
                      Diffuse Indirect Lighting
                    </a>
                  </p>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">In our implementation, we use
                  one bounce indirect lighting, 16 stratified initial samples
                  and up to 84 adaptive continue samples for global illumination.
                  No slope blur, and only do adaptive filtering on indirect light,
                  which is later combined with direct light (use next event estimation).
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                  <el-col :span=auto>
                    <div id="giUnfiltFilt"></div>
                    <p><code>left: initial sample results | right: filtered result</code></p>
                    <div id="giFiltGT"></div>
                    <p><code>left: filtered result | right: ground truth</code></p>
                  </el-col>
                  <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
                  <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">We can run AAF GI in realtime with 60fps in
                  800X600. Again, we use different random seed per frame and get robust
                  result without significant temporal anliasing. Here is a demo with animation:
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/U79zRqgjwy8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </el-row>
              <!-- MAAF -->
              <el-row class="row-bg" justify="left">
                <h3 id="3.3. MAAF">3.3 MAAF</h3><br/>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">// TODO
                </p>
              </el-row>
              <!-- Chapter 4: Future Plane -->
              <el-row class="row-bg" justify="left">
                <h2 id="4. Future Plans">4. Future Plans</h2>
                <p style="text-align:left">There are about 2 more weeks to go, so generally,
                  I am going to try to implement MAAF, especially with multiple effects combination
                  of soft shadow, global illumination and defocs blur. Although I have implemented
                  AAF already, MAAF seems to be somewhat challenging as no realted code is provided
                  and some details are not mentioned in the paper. But anyway I will try to do it.
                </p>
              </el-row>
            </el-main>
            <el-divider />
            <el-footer>
              <el-link href="https://suikasibyl.github.io/" target="_blank" type="primary">My Homepage</el-link>
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.el-link {
  margin-right: 8px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>

<script>
// @ is an alias to /src
import '../assets/githubmd.css';
import SliderBar from 'before-after-slider'; // import

export default {
  name: 'HomeView',
  mounted() {
    // new SliderBar({options});
    /* eslint-disable no-new */
    new SliderBar({
      el: '#ssUnfiltFilt',
      beforeImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-noisy-softshadow-grids.png',
      afterImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-filtered-softshadow-grids.png',
      width: '90%', // slide-wrap width, default 100%
      height: '400px', // slide-wrap height, default image-height
      line: true, // Dividing line, default true
      lineColor: 'rgba(0,0,0,0.1)', // Dividing line color, default rgba(0,0,0,0.5)
    });
    new SliderBar({
      el: '#ssFiltGT',
      beforeImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-filtered-softshadow-grids.png',
      afterImg: 'https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/274denoiser-benchmark-softshadow-grids.png',
      width: '90%', // slide-wrap width, default 100%
      height: '400px', // slide-wrap height, default image-height
      line: true, // Dividing line, default true
      lineColor: 'rgba(0,0,0,0.1)', // Dividing line color, default rgba(0,0,0,0.5)
    });
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
