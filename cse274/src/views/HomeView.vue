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
                <h2 id="2. Implementation">2. Implementation Theory</h2>
                <p style="text-align:left">
                  Here is a summary of commons and differences of all these related works,
                  using different filters and handling different distribution effects:
                </p>
                <el-row class="row-bg" justify="left">
                  <h3 id="2.1. inisamp">2.1 Initial Sampling & Frequency Domain Slope</h3><br/>
                </el-row>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">
                  The 2D f(x,y) term we are interested in, is turned out to be a shear shape
                  in primal domain and a line in Fourier domain. If there
                  are more than one (or not parallel) frequency resource, there would be multiple
                  lines and form a double wedge shape.
                </p>
                <el-row class="row-bg" justify="left">
                  <li style="text-align:left">
                    <strong>Soft Shadow:</strong> For each primary ray shading point,
                    find the distance to light (center) <code>d1</code>.
                    Then emit 9 shadow ray from the shading point, who are
                    stratified distributed on the light surface, collecting the minimum
                    and maximum distance from light to any occluder along the ray,
                    <code>d2_min</code> and <code>d2_max</code>. The Fourier space slope is:
                    <vue-latex :expression="'s=d_1/d_2-1'" display-mode/>
                  </li>
                  <li style="text-align:left">
                    <strong>Global Illumination:</strong> For each primary ray, emit 16 secondary
                    rays from the shading point stratified distributed on the hemisphere,
                    collecting the minimum and maximum distance <code>z</code> from shading point
                    to any reflector. The Fourier space slope is:
                    <vue-latex :expression="'s=z'" display-mode/>
                  </li>
                  <li style="text-align:left">
                    <strong>Defocus Blur:</strong> Trace multiple primary rays on the lens,
                    collecting the minimum and maximum depth <code>z</code> of any hit objects.
                    Also given the half-width of the image in pixels <code>v</code>, the focal
                    distance <code>F</code>, the size of the focal plane <code>S</code>.
                    The Fourier space slope is:
                    <vue-latex :expression="'s=\\frac{V}{S}(\\frac{F}{z}-1)'" display-mode/>
                  </li>
                  <li style="text-align:left">
                    <strong>Motion Blur:</strong> May be included later.
                  </li>
                </el-row>
              </el-row>
              <el-row class="row-bg" justify="left">
                <h3 id="2.2. bound">2.2 Bandlimiters</h3><br/>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">
                  The 2D f(x,y) term we are interested in are double-wedge in Fourier space, but
                  they are not bandlimited. But no worries because they are all found to be
                  filtered by some hero bandlimiter h(y) terms along the y axis, introducing
                  low-pass bandlimiting.
                </p>
                <el-row class="row-bg" justify="left">
                  <li style="text-align:left">
                    <strong>Soft Shadow:</strong> In y axis, the <code>visibility</code> term is
                    convoluted and bandlimited by <code>light intensity</code>, which is assumed to
                    be a Guassian function.
                  </li>
                  <li style="text-align:left">
                    <strong>Global Illumination:</strong> In y axis, the <code>Li</code> term is
                    convoluted and bandlimited by <code>transfer</code> function, which is not a
                    Gaussian function but could also bring low-pass effects (consider how
                    high-frequency lights are blurred in diffuse surface, like we can present them
                    just using order 3 SH).
                  </li>
                  <li style="text-align:left">
                    <strong>Defocus Blur:</strong> In y axis, the <code>Le</code> term is convoluted
                    and bandlimited by <code>aperture function</code>, which is also assumed to be a
                    Gaussian function. (Although I think noramlly it should be a const, but normally
                    we also use uniform area light, so just tolerant these assumptions anyway...)
                  </li>
                  <li style="text-align:left">
                    <strong>Motion Blur:</strong> In y axis, the <code>Le</code> term is convoluted
                    and bandlimited by <code>shutter response</code> function, which is also again
                    assumed to be a Gaussian function.
                  </li>
                </el-row>
                <el-row class="row-bg" justify="left">
                  <br>
                  <p style="text-align:left">
                    And actually we could notice the truth that, we need not bother to compute the
                    bandlimiting in y, because it is just given. It is about area light size, brdf
                    of surface, lens, shutter. And in AAF, it does not even use an extra gaussian
                    in y axis when do Monte Carlo integral, as the h term iteself is the one who
                    introduce the bandlimiting in axis-aligned filter.
                  </p>
                  <p style="text-align:left">
                    The interesting thing is that, when we do MAAF, we no longer include the h term.
                    I think it is an essential insight that, MAAF actually somewhat decompose the h
                    term into several parts with different frequency, and reconstruct them
                    individually and finally modulate them back agian.
                  </p>
                  <p style="text-align:left">
                    For example in GI case, we are decomposing diffuse transfer function. First
                    imitate some kind of super-diffuse surface, where we get a larger image space
                    filter to better remove the noise. And then imitate some kind of detail
                    filter to extract all details and use small image space filter to preserve
                    necessary details.
                  </p>
                  <p style="text-align:left">
                    The <code>decomposing brdf/transfer function</code> part is where I think
                    is really cool. Maybe we could do more things about it? I don't now.
                  </p>
                </el-row>
              </el-row>
              <el-row class="row-bg" justify="left">
                <h3 id="2.3. advantages">2.3 Taking Advantages of Bandlimits</h3><br/>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">
                  In AAF, we do not explicitly do y axis filtering as the h term itself is
                  already the filter we want. But it does screen-space filtering (in x dim).
                  Therefore, it is necessary to know x bandlimiting. It actually comes from
                  two parts: 1. pixel limits the useful freqeuncy, higher frequency would
                  do no good and even introduce aliasing. 2. as given the double-wedge shape,
                  bandlimits in y actually also bring bandlimits in x.
                </p>
                <p style="text-align:left">
                  Given that, we can compute the screen space filter size beta. The GI case
                  with Cornell Box scene is shown below. We can see that in corners, we do
                  less filtering, and in flat and wide positions we do more blur. It is
                  consistent with our intuition, because in corners there are very near
                  reflectors who introduce high frequency details.
                </p>
              </el-row>
              <br>
              <el-row class="row-bg" justify="center">
                <el-image style="width: 400px; height: 300px" src='https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/gi-betta-cornellbox.png' fit="fill" />
                <p><code>beta (Gaussian standard deviation) for indirect illumination</code></p>
              </el-row>
              <el-row class="row-bg" justify="left">
                <p style="text-align:left">
                  Also, given bandlimits of x and y, we can compute the required sampling rate of a
                  certain packing strategy, and derive the adaptive SPP. Therefore areas with loose
                  bandlimiting are going to have higher SPP, which is of course correct in frequency
                  analysis. So the logic is, we sample more samples in places with more details,
                  and actually places with more details are likely to have higher variance, so we
                  are placing more samples to reduce variance.
                </p>
              </el-row>
              <el-row class="row-bg" justify="center">
                <el-image style="width: 400px; height: 300px" src='https://imagehost-suikasibyl-us.oss-us-west-1.aliyuncs.com/spp-gi-cornellbox.png' fit="fill" />
                <p><code>adaptive ssp computed in cornell box for indirect illumination</code></p>
              </el-row>
              <!-- Chapter 3. Results -->
              <el-row class="row-bg" justify="left">
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
                <p style="text-align:left">In our implementation, we estimate direct
                  illumination as point light (as the original work and related works do,
                  to ensure direct light part is not noisy). And we trace one primary ray
                  with 9 shadow rays stratified on light source. Later, we also do up to
                  84 adaptive continue samples. Especially, we adopt a slope blur pass,
                  before adaptive sampling, to remove some outliner points who failed to
                  find any unoccluded path. We actually use max operator instead average
                  which is mentioned in the paper.
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
