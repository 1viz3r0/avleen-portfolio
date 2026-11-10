// @ts-nocheck
/**
 * Ink Ridges — ORIGINAL component by Ryan Tseng (@ryanonline1234), MIT.
 * https://21st.dev/@ryanonline1234/components/ink-ridges
 *
 * Provenance (2026-11-10): the 21st.dev registry requires an API key for
 * `npx @21st-dev/cli add` / shadcn install / REST install (verified: the CLI
 * defers to the registry URL and every endpoint returns 401/403 without a
 * key; no key was available and none was requested). The component's
 * compiled module was instead taken verbatim from 21st.dev's own public
 * preview bundle for this component:
 *   https://cdn.21st.dev/ryanonline1234/ink-ridges/default/bundle.*.html
 * i.e. the exact build 21st.dev serves for the official live demo (MIT).
 *
 * Integrity guarantees:
 *  - Everything between the BEGIN/END markers is byte-identical to that
 *    published build: GLSL shaders, WebGL2 engine (RidgesGL), paint/scroll/
 *    mist/clouds/birds animation logic — unchanged.
 *  - Only additions, all outside the original code: this header, the two
 *    imports, the four esbuild module-runtime helpers (copied verbatim from
 *    the same bundle prologue), and the export statement.
 *  - Free-variable audit (oxlint no-undef over the extracted region): only
 *    `Xl` (react), `gl` (react/jsx-runtime), `i`/`Gt` (esbuild name helpers)
 *    plus browser globals. No other module was inlined or rewritten.
 *
 * Public API (from the source, no invented props):
 *   layers, seed, horizon, mist, drift, parallax, paintIn, sun,
 *   sunPosition=[.78,.74], sunSize=.07, sunColor="#b5402a", moon="auto",
 *   scrollDepth, inkColor, grain, clouds, glow, birds, birdsEvery, dprCap,
 *   label, className, children.
 * Theming: paper/ink colours are resolved from computed styles of DOM
 *   ancestors; `moon:"auto"` shows the moon when the resolved background is
 *   dark (luminance < 0.35), the sun otherwise. A MutationObserver on
 *   <html> (class/data-theme/style) plus a prefers-color-scheme listener
 *   repaints instantly on theme change — no reload needed.
 * Efficiency: the RAF loop stops when idle; IntersectionObserver pauses
 *   offscreen; visibilitychange pauses hidden tabs; prefers-reduced-motion
 *   paints one static frame. No WebGL2 → gradient fallback div.
 */

import * as Xl from 'react'
import * as gl from 'react/jsx-runtime'

/* esbuild module-runtime helpers — verbatim from the same bundle prologue. */
var g0=Object.defineProperty;var Jh=(g,h,m)=>h in g?g0(g,h,{enumerable:!0,configurable:!0,writable:!0,value:m}):g[h]=m;var i=(g,h)=>g0(g,"name",{value:h,configurable:!0});var Gt=(g,h,m)=>Jh(g,typeof h!="symbol"?h+"":h,m);

/* ===== BEGIN original Ink Ridges module (byte-identical) ===== */

const pc=5,Ct=i(g=>Math.min(1,Math.max(0,g)),"clamp01");function ti(g,h,m){const o=h<=1?1:g/(h-1),O=Math.min(.82,Math.max(.3,m));return{base:h<=1?O:O-(O-.2)*o,amp:.07+.06*o,freq:1.3+1.9*o,ink:.22+.5*o,depth:o}}i(ti,"layerAt");function Sv(g,h,m){if(m<=1)return Ct(g);const o=Math.min(.18,.6/(m-1)),O=1-o*(m-1);return Ct((g-h*o)/O)}i(Sv,"paintAt");function bv(g){const h=.2126*g[0]+.7152*g[1]+.0722*g[2];return h<.35?.62+h/.35*.38:1}i(bv,"inkScaleFor");function Ev(g){return 1-(1-Ct((g-.55)/.4))**3}i(Ev,"sunBloom");function Tv(g,h){return g!=="auto"?g:.2126*h[0]+.7152*h[1]+.0722*h[2]<.35}i(Tv,"moonFor");function Av(g,h,m){return Ct(g/Math.max(1,h))*Math.max(0,m)}i(Av,"scrollDrop");function pv(g,h){let m=(Math.imul(g,1664525)^Math.imul(h,22695477)+12345)>>>0;return m=(m^m>>>15)>>>0,m=Math.imul(m,2246822519)>>>0,m=(m^m>>>13)>>>0,m=Math.imul(m,3266489917)>>>0,m=(m^m>>>16)>>>0,m}i(pv,"hashU");function Ga(g,h){return pv(Math.floor(g)+32768,Math.floor(h)+32768)/4294967295}i(Ga,"hash2");const Tc=i((g,h,m)=>g+(h-g)*m,"mix");function q0(g,h){const m=Math.floor(g),o=Math.floor(h),O=g-m,D=h-o,x=O*O*(3-2*O),Z=D*D*(3-2*D);return Tc(Tc(Ga(m,o),Ga(m+1,o),x),Tc(Ga(m,o+1),Ga(m+1,o+1),x),Z)}i(q0,"vnoise");function Mv(g,h){let m=0,o=.5;for(let O=0;O<5;O++){m+=o*q0(g,h);const D=(.8*g-.6*h)*2.03+11.7,x=(.6*g+.8*h)*2.03+11.7;g=D,h=x,o*=.5}return m}i(Mv,"fbm");function zv(g,h,m){const o=ti(g,m.n,m.horizon),O=.25+o.depth,D=(h+m.shift[0]*O)*m.aspect,x=Mv(D*o.freq+m.seed*1.37+g*7.31,g*3.7+m.seed*.71),Z=1-Math.abs(2*q0(D*o.freq*2.3+g*5.1+m.seed,g+m.seed*.3)-1);return o.base+o.amp*((x-.5)*2+(Z-.5)*.35)-m.shift[1]*O-(m.drop??0)*(1-o.depth)}i(zv,"ridgeLineAt");function _v(g,h,m){const o=Ct(h/g.duration),O=g.dir>0?-.12+1.3*o:1.12-1.3*o,D=Ct(Math.min(o/.08,(1-o)/.08,1)),x=ti(g.layer,m.n,m.horizon),Z=x.base+x.amp,H=[];for(let T=0;T<g.count;T++){const q=Math.ceil(T/2),tl=T===0?0:T%2?1:-1,F=Ga(T*3.1+g.seed*7.7,g.seed*1.3+T),Sl=O-g.dir*q*(.028+.008*F),bl=zv(g.layer,Sl,m),jl=.005*Math.sin(h*1.6+T*1.9),_l=Math.max(bl+.07,.5*(Z+bl)+.08)+tl*q*.018+jl,Il=(.15+.4*(.5+.5*Math.sin(h*.8+T*2.3)))*Math.sin(h*(8+2*F)+T*1.3);H.push({x:Sl,y:_l,size:.011+.004*F,flap:Il})}return{alpha:D,birds:H}}i(_v,"birdsAt");function R0(g,h,m,o){return h+(g-h)*Math.exp(-6*o)}i(R0,"damp");function Dv(g,h,m,o){const O=i(x=>3*(1-x)*(1-x)*x*g+3*(1-x)*x*x*m+x*x*x,"bx"),D=i(x=>3*(1-x)*(1-x)*x*h+3*(1-x)*x*x*o+x*x*x,"by");return x=>{if(x<=0)return 0;if(x>=1)return 1;let Z=0,H=1,T=x;for(let q=0;q<40;q++)T=(Z+H)/2,O(T)<x?Z=T:H=T;return D(T)}}i(Dv,"cubicBezier");const Ov=Dv(.7,0,.2,1);function Rv(g){const h=g.trim();let m=h.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);if(m){const o=m[1].length===3?m[1].split("").map(O=>O+O).join(""):m[1];return[0,2,4].map(O=>parseInt(o.slice(O,O+2),16)/255)}return/^transparent$/i.test(h)?null:(m=h.match(/^rgba?\(\s*([\d.]+)\s*,?\s*([\d.]+)\s*,?\s*([\d.]+)\s*(?:[,/]\s*([\d.]+)(%?))?\s*\)/i),m?m[4]!==void 0&&Number(m[4])===0?null:[+m[1]/255,+m[2]/255,+m[3]/255]:null)}i(Rv,"colorToRgb");function Mc(g){const h=Rv(g);if(h)return h;if(/^transparent$/i.test(g.trim())||/^rgba?\([^)]*[,/]\s*0\s*\)$/i.test(g.trim()))return null;try{const m=document.createElement("canvas");m.width=m.height=1;const o=m.getContext("2d");if(!o)return null;o.fillStyle="#000",o.fillStyle=g,o.fillRect(0,0,1,1);const O=o.getImageData(0,0,1,1).data;return O[3]===0?null:[O[0]/255,O[1]/255,O[2]/255]}catch{return null}}i(Mc,"resolveCssColor");function U0(g,h){for(let m=g;m;m=m.parentElement){const o=Mc(getComputedStyle(m)[h]);if(o)return o;if(h==="color")break}return h==="color"?[.1,.1,.1]:[1,1,1]}i(U0,"resolveColor");const Uv=`#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`,xv=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSeed;
uniform float uMist;
uniform float uDrift;
uniform float uGrain;
uniform int uLayers;
uniform vec4 uLayer[5];
uniform float uPaint[5];
uniform float uPaintAll;
uniform vec2 uShift;
uniform vec3 uPaper;
uniform vec3 uInk;
uniform vec3 uSunColor;
uniform vec4 uSun;
uniform float uInkScale;
uniform float uClouds;
uniform float uGlow;
uniform float uHorizonY;
uniform int uBirdCount;
uniform vec4 uBird[8];
uniform float uBirdAlpha;
uniform float uBirdDir;
uniform int uBirdLayer;
uniform float uMoon;
uniform float uSunGrow;
uniform float uDrop;

uint hashU(uvec2 p) {
  uint n = p.x * 1664525u ^ (p.y * 22695477u + 12345u);
  n ^= n >> 15u; n *= 2246822519u;
  n ^= n >> 13u; n *= 3266489917u;
  n ^= n >> 16u;
  return n;
}
float hash2(vec2 p) {
  ivec2 ip = ivec2(floor(p)) + 32768;
  return float(hashU(uvec2(ip))) / 4294967295.0;
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash2(i), hash2(i + vec2(1.0, 0.0)), u.x), mix(hash2(i + vec2(0.0, 1.0)), hash2(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = m * p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v;
}
// three octaves, rescaled to the same range: enough for mist, brush texture and the brush edge
float fbm3(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 3; i++) {
    v += a * vnoise(p);
    p = m * p * 2.03 + 11.7;
    a *= 0.5;
  }
  return v / 0.875 * 0.96875;
}

// A small brush-stroke bird: two wings rising from a dot, tips lifted or dropped by the flap.
float birdInk(vec2 uv, float aspect) {
  float ink = 0.0;
  for (int b = 0; b < 8; b++) {
    if (b >= uBirdCount) break;
    vec4 B = uBird[b];
    vec2 q = (uv - B.xy) * vec2(aspect, 1.0) / B.z;
    if (abs(q.x) > 1.25 || abs(q.y) > 1.25) continue;
    q.x *= uBirdDir;
    float ax = abs(q.x);
    float wingY = B.w * ax - 0.28 * ax * ax + 0.06;
    float thick = 0.11 * (1.0 - ax) + 0.03;
    float wing = (1.0 - smoothstep(thick, thick + 0.05, abs(q.y - wingY))) * (1.0 - smoothstep(0.95, 1.05, ax));
    float body = 1.0 - smoothstep(0.08, 0.13, length(vec2(q.x * 0.8 - 0.05, q.y * 1.4)));
    ink = max(ink, max(wing, body));
  }
  return ink * uBirdAlpha;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec3 col = uPaper;

  // sky: a faint wash deepening toward the top
  col = mix(col, uInk, 0.05 * smoothstep(0.45, 1.0, uv.y) * uInkScale);
  // the sun sits farther away than any ridge: it barely parallaxes, and sinks fastest on scroll
  vec2 sc = uSun.xy + uShift * 0.1 - vec2(0.0, uDrop * 2.2);
  float bloom = smoothstep(0.0, 0.2, uSunGrow);
  // warmth around the sun and a haze along the horizon
  if (uSun.w > 0.5 && uGlow > 0.0) {
    float ds = length((uv - sc) * vec2(aspect, 1.0));
    float halo = exp(-pow(ds / (uSun.z * 3.2), 2.0));
    float haze = exp(-pow((uv.y + uDrop - uHorizonY) / 0.12, 2.0));
    col = mix(col, uSunColor, uGlow * (mix(0.22, 0.12, uMoon) * halo + mix(0.06, 0.02, uMoon) * haze) * bloom);
  }
  // the sun, painted: a loaded brush leaves a wobbling edge, pigment pooled at the rim and
  // granulated inside; the moon is paler and mottled. A wisp of mist crosses its lower half.
  vec3 skyBack = col; // the sky without the sun: the far ridge paints over the sun, never through it
  if (uSun.w > 0.5) {
    vec2 dv = (uv - sc) * vec2(aspect, 1.0);
    float d = length(dv);
    float R = uSun.z * mix(0.15, 1.0, uSunGrow);
    if (d < R * 1.2) {
      vec2 dir = dv / max(d, 1e-5);
      float wob = (fbm3(dir * 1.6 + uSeed * 0.37) - 0.5) * mix(0.07, 0.025, uMoon) + (vnoise(dir * 11.0 + uSeed) - 0.5) * mix(0.03, 0.01, uMoon);
      float r = R * (1.0 + wob);
      float disc = 1.0 - smoothstep(r - R * 0.03, r + R * 0.02, d);
      vec2 lq = dv / R;
      float gran = fbm3(lq * 7.0 + uSeed * 1.3) - 0.5;
      float pool = smoothstep(0.6, 1.0, d / r);
      float wash = clamp(dot(lq, vec2(-0.6, 0.8)) * 0.5 + 0.5, 0.0, 1.0);
      float dens = 0.78 + 0.16 * pool - 0.12 * wash + 0.16 * gran;
      vec3 pig = uSunColor * (1.0 - 0.14 * pool * pool);
      if (uMoon > 0.5) {
        dens = 0.86 - 0.16 * smoothstep(0.45, 0.72, fbm3(lq * 1.9 + 3.0 + uSeed * 0.2)) + 0.06 * gran;
        pig = uSunColor;
      }
      col = mix(col, pig, clamp(disc * dens, 0.0, 1.0) * bloom);
    }
    if (uClouds > 0.0 && d < uSun.z * 3.2) {
      vec2 mq = dv / uSun.z;
      float streak = fbm3(vec2(mq.x * 0.55 + uTime * uDrift * 0.6 + uSeed * 0.7, mq.y * 2.6 + uSeed));
      float strip = exp(-pow((mq.y + 0.42) / 0.32, 2.0));
      float wisp = smoothstep(0.42, 0.72, streak) * strip * smoothstep(3.2, 1.4, length(mq)) * smoothstep(0.0, 0.5, uClouds);
      col = mix(col, uPaper, wisp * 0.8 * bloom);
    }
  }
  // a few long brush-streak clouds, drifting with the mist
  if (uClouds > 0.0) {
    vec2 cq = vec2(uv.x * aspect * 0.8 + uTime * uDrift * 0.15 + uSeed * 0.53, (uv.y + uDrop) * 11.0);
    float streak = smoothstep(0.5, 0.8, fbm3(cq));
    float inSky = smoothstep(uHorizonY - 0.02, uHorizonY + 0.2, uv.y + uDrop) * (1.0 - smoothstep(0.92, 1.0, uv.y));
    col = mix(col, uInk, uClouds * 0.26 * streak * inSky * uInkScale * smoothstep(0.0, 0.4, uPaintAll));
  }

  for (int i = 0; i < 5; i++) {
    if (i >= uLayers) break;
    vec4 L = uLayer[i];
    float fi = float(i);
    float depth = uLayers > 1 ? fi / float(uLayers - 1) : 1.0;
    vec2 p = uv + uShift * (0.25 + depth) + vec2(0.0, uDrop * (1.0 - depth));
    float x = p.x * aspect;
    float n = fbm(vec2(x * L.z + uSeed * 1.37 + fi * 7.31, fi * 3.7 + uSeed * 0.71));
    float ridged = 1.0 - abs(2.0 * vnoise(vec2(x * L.z * 2.3 + fi * 5.1 + uSeed, fi + uSeed * 0.3)) - 1.0);
    float h = L.x + L.y * ((n - 0.5) * 2.0 + (ridged - 0.5) * 0.35);

    float bleed = 0.0025 + 0.004 * vnoise(vec2(x * 40.0, fi * 9.0));
    float below = smoothstep(h + bleed, h - bleed, p.y);
    if (below > 0.0) { // above this ridge line: no ink from it, skip the expensive part
    if (i == 0) col = mix(col, skyBack, below);
    float fall = clamp((h - p.y) / (0.12 + 0.08 * depth), 0.0, 1.0);
    float tex = fbm3(vec2(x * 18.0, p.y * 22.0) + fi * 4.0 + uSeed);
    float dens = L.w * uInkScale * (1.0 - uMist * 0.95 * fall) * (0.82 + 0.36 * tex);
    float fog = smoothstep(0.42, 0.78, fbm3(vec2(x * 1.6 + uTime * uDrift * (0.4 + depth), p.y * 5.0 + fi * 2.0)));
    dens *= 1.0 - uMist * fog * fall * 0.9;

    // the crest: the brush presses hardest along the ridge line and skips where it runs dry
    float under = h - p.y;
    if (under < 0.03) {
      float crest = 1.0 - smoothstep(0.0, 0.004 + 0.01 * depth, under);
      float press = smoothstep(0.25, 0.7, vnoise(vec2(x * 9.0 + fi * 13.0, fi * 2.0 + uSeed)));
      dens += crest * crest * press * 0.45 * L.w * uInkScale;
    }

    float edge = mix(-0.2, 1.2, uPaint[i]) + (fbm3(vec2(p.y * 14.0, fi * 3.0 + uSeed)) - 0.5) * 0.18;
    float painted = 1.0 - smoothstep(edge - 0.035, edge + 0.035, uv.x);
    col = mix(col, uInk, clamp(below * dens * painted, 0.0, 1.0));
    }
    // the flock flies in front of the ridge it follows and behind the nearer ones
    if (i == uBirdLayer && uBirdCount > 0) col = mix(col, uInk, birdInk(uv, aspect) * 0.8 * uInkScale);
  }

  col += (hash2(uv * uResolution * 0.5) - 0.5) * uGrain * 0.1;
  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`,Nv=["uResolution","uTime","uSeed","uMist","uDrift","uGrain","uLayers","uLayer","uPaint","uPaintAll","uShift","uPaper","uInk","uSunColor","uSun","uInkScale","uClouds","uGlow","uHorizonY","uBirdCount","uBird","uBirdAlpha","uBirdDir","uBirdLayer","uMoon","uSunGrow","uDrop"],Dc=class Dc{constructor(h,m){Gt(this,"canvas");Gt(this,"gl",null);Gt(this,"program",null);Gt(this,"loc",new Map);Gt(this,"lost",!1);Gt(this,"onRestore");Gt(this,"ok",!1);Gt(this,"handleLost",i(h=>{h.preventDefault(),this.lost=!0,this.ok=!1},"handleLost"));Gt(this,"handleRestored",i(()=>{this.lost=!1,this.ok=this.init(),this.ok&&this.onRestore()},"handleRestored"));this.canvas=h,this.onRestore=m,h.addEventListener("webglcontextlost",this.handleLost),h.addEventListener("webglcontextrestored",this.handleRestored),this.ok=this.init()}init(){const h=this.canvas.getContext("webgl2",{alpha:!1,antialias:!1,powerPreference:"low-power"});if(!h||h.isContextLost())return!1;const m=i((Z,H)=>{const T=h.createShader(Z);return h.shaderSource(T,H),h.compileShader(T),h.getShaderParameter(T,h.COMPILE_STATUS)?T:(console.error("[ink-ridges] shader error",h.getShaderInfoLog(T)),null)},"compile"),o=m(h.VERTEX_SHADER,Uv),O=m(h.FRAGMENT_SHADER,xv);if(!o||!O)return!1;const D=h.createProgram();if(h.attachShader(D,o),h.attachShader(D,O),h.linkProgram(D),!h.getProgramParameter(D,h.LINK_STATUS))return console.error("[ink-ridges] link error",h.getProgramInfoLog(D)),!1;h.useProgram(D),h.bindVertexArray(h.createVertexArray()),h.bindBuffer(h.ARRAY_BUFFER,h.createBuffer()),h.bufferData(h.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),h.STATIC_DRAW);const x=h.getAttribLocation(D,"aPos");h.enableVertexAttribArray(x),h.vertexAttribPointer(x,2,h.FLOAT,!1,0,0),this.loc.clear();for(const Z of Nv)this.loc.set(Z,h.getUniformLocation(D,Z));return this.gl=h,this.program=D,!0}resize(h,m){(this.canvas.width!==h||this.canvas.height!==m)&&(this.canvas.width=h,this.canvas.height=m)}draw(h){const m=this.gl;if(!m||!this.program||!this.ok||this.lost)return;const o=this.canvas.width,O=this.canvas.height;m.viewport(0,0,o,O);const D=i(T=>this.loc.get(T),"L");m.uniform2f(D("uResolution"),o,O),m.uniform1f(D("uTime"),h.time),m.uniform1f(D("uSeed"),h.seed),m.uniform1f(D("uMist"),h.mist),m.uniform1f(D("uDrift"),h.drift),m.uniform1f(D("uGrain"),h.grain),m.uniform1i(D("uLayers"),h.layers.length);const x=new Float32Array(pc*4),Z=new Float32Array(pc);h.layers.forEach((T,q)=>{x.set([T.base,T.amp,T.freq,T.ink],q*4),Z[q]=h.paint[q]??1}),m.uniform4fv(D("uLayer"),x),m.uniform1fv(D("uPaint"),Z),m.uniform1f(D("uPaintAll"),h.paintAll),m.uniform2f(D("uShift"),h.shift[0],h.shift[1]),m.uniform3f(D("uPaper"),...h.paper),m.uniform3f(D("uInk"),...h.ink),m.uniform3f(D("uSunColor"),...h.sunColor),m.uniform4f(D("uSun"),...h.sun),m.uniform1f(D("uInkScale"),h.inkScale),m.uniform1f(D("uClouds"),h.clouds),m.uniform1f(D("uGlow"),h.glow),m.uniform1f(D("uHorizonY"),h.horizonY);const H=new Float32Array(8*4);h.birds.slice(0,8).forEach((T,q)=>H.set([T.x,T.y,T.size,T.flap],q*4)),m.uniform1i(D("uBirdCount"),Math.min(8,h.birds.length)),m.uniform4fv(D("uBird"),H),m.uniform1f(D("uBirdAlpha"),h.birdAlpha),m.uniform1f(D("uBirdDir"),h.birdDir),m.uniform1i(D("uBirdLayer"),h.birdLayer),m.uniform1f(D("uMoon"),h.moon?1:0),m.uniform1f(D("uSunGrow"),h.sunGrow),m.uniform1f(D("uDrop"),h.drop),m.drawArrays(m.TRIANGLE_STRIP,0,4)}dispose(){this.canvas.removeEventListener("webglcontextlost",this.handleLost),this.canvas.removeEventListener("webglcontextrestored",this.handleRestored),this.gl&&this.program&&!this.lost&&this.gl.deleteProgram(this.program),this.gl=null,this.program=null}};i(Dc,"RidgesGL");let zc=Dc;const x0=i((...g)=>g.filter(Boolean).join(" "),"cn"),Hv="(prefers-reduced-motion: reduce)";function qv({layers:g=4,seed:h=7,horizon:m=.62,mist:o=.6,drift:O=.05,parallax:D=.03,paintIn:x=2400,sun:Z=!0,sunPosition:H=[.78,.74],sunSize:T=.07,sunColor:q="#b5402a",moon:tl="auto",scrollDepth:F=.35,inkColor:Sl,grain:bl=.3,clouds:jl=.35,glow:_l=.45,birds:yt=5,birdsEvery:Il=14,dprCap:xl=1.5,label:Pl,className:I,children:Vl}){const Kl=Xl.useRef(null),wl=Xl.useRef(null),[ft,uu]=Xl.useState(!0),Jl=Xl.useRef({layers:g,horizon:m,mist:o,drift:O,parallax:D,paintIn:x,sun:Z,sunPosition:H,sunSize:T,sunColor:q,moon:tl,scrollDepth:F,inkColor:Sl,grain:bl,seed:h,clouds:jl,glow:_l,birds:yt,birdsEvery:Il});Jl.current={layers:g,horizon:m,mist:o,drift:O,parallax:D,paintIn:x,sun:Z,sunPosition:H,sunSize:T,sunColor:q,moon:tl,scrollDepth:F,inkColor:Sl,grain:bl,seed:h,clouds:jl,glow:_l,birds:yt,birdsEvery:Il};const El=Xl.useRef({kick:i(()=>{},"kick"),repaint:i(()=>{},"repaint"),retheme:i(()=>{},"retheme")});Xl.useEffect(()=>{const ml=Kl.current,pl=wl.current;if(!ml||!pl)return;const A=window.matchMedia(Hv);let N=0,C=0,el=0,r=!0,_=performance.now();const R={x:0,y:0,tx:0,ty:0};let U=null,Y=1/0,W;const Q=i((al,$)=>{const dl=Jl.current;if(dl.birds<=0||A.matches){Y=1/0;return}const Dl=Math.max(1,dl.birdsEvery)*1e3;Y=al+($?Math.min(Dl,Math.max(0,dl.paintIn)+1500):Dl*(.6+.8*Math.random()))},"scheduleFlight");Q(_,!0);let ql=[1,1,1],fl=[.1,.1,.1],_t=[.1,.1,.1],Du=!1;const Ou=i(()=>{const al=Jl.current;ql=U0(ml,"backgroundColor"),fl=al.inkColor&&Mc(al.inkColor)||U0(ml,"color"),Du=Tv(al.moon,ql),_t=!Du&&al.sunColor&&Mc(al.sunColor)||fl},"theme"),kl=i(()=>{N||(N=requestAnimationFrame(Wu))},"kick"),Xt=new zc(pl,kl);if(!Xt.ok)return uu(!1),ml.style.setProperty("--ink-ridges-paint","1"),()=>Xt.dispose();Ou();function Wu(al){N=0;const $=Jl.current,dl=A.matches,Dl=C?Math.min(.05,(al-C)/1e3):0;C=al;const lt=dl||$.paintIn<=0?1:Ct((al-_)/$.paintIn);dl?R.x=R.y=R.tx=R.ty=0:(el+=Dl,R.x=R0(R.x,R.tx,6,Dl),R.y=R0(R.y,R.ty,6,Dl));const Ol=Math.max(1,Math.min(pc,Math.round($.layers))),La=Array.from({length:Ol},(xu,Iu)=>ti(Iu,Ol,$.horizon)),ui=pl.width/Math.max(1,pl.height),Za=dl||$.scrollDepth<=0?0:Av(-ml.getBoundingClientRect().top,ml.clientHeight,$.scrollDepth),$u={n:Ol,horizon:$.horizon,seed:$.seed,aspect:ui,shift:[R.x,R.y],drop:Za};!U&&!dl&&r&&lt>=1&&$.birds>0&&al>=Y&&(U={start:al,duration:9+Math.random()*3,dir:Math.random()<.5?1:-1,count:Math.min(8,Math.round($.birds)),layer:Ol>=3?1:0,seed:Math.floor(Math.random()*1e3)});let eu={alpha:0,birds:[]},xt=0;if(U){const xu=(al-U.start)/1e3;xu>=U.duration||dl||$.birds<=0?(U=null,Q(al,!1)):(eu=_v(U,xu,$u),xt=xu/U.duration)}Xt.draw({time:el,seed:$.seed,mist:Ct($.mist),drift:dl?0:Math.max(0,$.drift),grain:$.grain,layers:La,paint:La.map((xu,Iu)=>Ov(Sv(lt,Iu,Ol))),paintAll:lt,shift:[R.x,R.y],paper:ql,ink:fl,sunColor:_t,sun:[$.sunPosition[0],$.sunPosition[1],$.sunSize,$.sun?1:0],inkScale:bv(ql),clouds:Ct($.clouds),glow:Ct($.glow),horizonY:ti(0,Ol,$.horizon).base,birds:eu.birds,birdAlpha:eu.alpha,birdDir:(U==null?void 0:U.dir)??1,birdLayer:U?U.layer:-1,moon:Du,sunGrow:Ev(lt),drop:Za}),ml.style.setProperty("--ink-ridges-paint",String(lt)),ml.style.setProperty("--ink-ridges-flight",String(xt));const Fu=Math.abs(R.x-R.tx)>1e-4||Math.abs(R.y-R.ty)>1e-4,Uu=lt<1||$.drift>0||Fu||!!U;clearTimeout(W),!dl&&r&&!document.hidden&&Uu?N=requestAnimationFrame(Wu):(C=0,!dl&&r&&!document.hidden&&Number.isFinite(Y)&&(W=setTimeout(kl,Math.max(0,Y-performance.now())+16)))}i(Wu,"frame");const Ca=new ResizeObserver(([al])=>{const $=al==null?void 0:al.contentRect;if(!$)return;const dl=Math.min(window.devicePixelRatio||1,xl);Xt.resize(Math.max(1,Math.round($.width*dl)),Math.max(1,Math.round($.height*dl))),kl()});Ca.observe(ml);const Xa=new IntersectionObserver(([al])=>{r=!!(al!=null&&al.isIntersecting),r&&kl()});Xa.observe(ml);const ct=i(al=>{const $=Jl.current;if(A.matches||$.parallax<=0||al.pointerType==="touch")return;const dl=ml.getBoundingClientRect();R.tx=((al.clientX-dl.left)/dl.width-.5)*$.parallax,R.ty=-((al.clientY-dl.top)/dl.height-.5)*$.parallax,kl()},"onPointer"),ja=i(()=>{R.tx=0,R.ty=0,kl()},"onLeave");ml.addEventListener("pointermove",ct),ml.addEventListener("pointerleave",ja);const Ce=i(()=>{r&&Jl.current.scrollDepth>0&&!A.matches&&kl()},"onScroll");window.addEventListener("scroll",Ce,{passive:!0});const Ru=i(()=>kl(),"onVisibility");document.addEventListener("visibilitychange",Ru),A.addEventListener("change",Ru);const jt=i(()=>{Ou(),kl()},"onTheme"),Qa=new MutationObserver(jt);Qa.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]});const Xe=window.matchMedia("(prefers-color-scheme: dark)");return Xe.addEventListener("change",jt),El.current={kick:kl,repaint:i(()=>{_=performance.now(),U=null,Q(_,!0),kl()},"repaint"),retheme:jt},kl(),()=>{N&&cancelAnimationFrame(N),N=0,clearTimeout(W),El.current={kick:i(()=>{},"kick"),repaint:i(()=>{},"repaint"),retheme:i(()=>{},"retheme")},Ca.disconnect(),Xa.disconnect(),Qa.disconnect(),ml.removeEventListener("pointermove",ct),ml.removeEventListener("pointerleave",ja),window.removeEventListener("scroll",Ce),document.removeEventListener("visibilitychange",Ru),A.removeEventListener("change",Ru),Xe.removeEventListener("change",jt),Xt.dispose()}},[xl]);const Ut=Xl.useRef(!0);return Xl.useEffect(()=>{if(Ut.current){Ut.current=!1;return}El.current.repaint()},[h]),Xl.useEffect(()=>{El.current.kick()},[g,m,o,O,D,Z,H,T,bl,jl,_l,yt,Il,F]),Xl.useEffect(()=>{El.current.retheme()},[Sl,q,tl]),gl.jsxs("div",{ref:Kl,"data-ink-ridges":"",className:x0("relative isolate overflow-hidden",I),children:[gl.jsx("canvas",{ref:wl,role:Pl?"img":void 0,"aria-label":Pl,"aria-hidden":Pl?void 0:!0,className:x0("absolute inset-0 block h-full w-full",!ft&&"hidden")}),ft?null:gl.jsx("div",{"aria-hidden":"true",className:"absolute inset-0",style:{background:"linear-gradient(to bottom, transparent 45%, color-mix(in oklab, currentColor 16%, transparent))"}}),Vl?gl.jsx("div",{className:"relative z-10 h-full",children:Vl}):null]})}i(qv,"InkRidges")

/* ===== END original Ink Ridges module ===== */

/* Integration plumbing (not part of the original module):
 * a source-accurate prop type for consumers (the compiled destructuring
 * wrongly marks no-default props as required). Prop list and defaults are
 * transcribed from qv's signature above; `moon` accepts boolean|"auto". */
type InkRidgesProps = {
  layers?: number
  seed?: number
  horizon?: number
  mist?: number
  drift?: number
  parallax?: number
  paintIn?: number
  sun?: boolean
  sunPosition?: [number, number]
  sunSize?: number
  sunColor?: string
  moon?: 'auto' | boolean
  scrollDepth?: number
  inkColor?: string
  grain?: number
  clouds?: number
  glow?: number
  birds?: number
  birdsEvery?: number
  dprCap?: number
  label?: string
  className?: string
  children?: Xl.ReactNode
}

export default qv as (props: InkRidgesProps) => Xl.ReactNode
export { qv as InkRidges }
