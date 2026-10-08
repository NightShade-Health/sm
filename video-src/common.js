// shared: logo mark defs, top bar, end card, helpers
const MARK = `<svg width="0" height="0" style="position:absolute"><defs>
 <g id="mark"><g transform="translate(50 50)">
  <path id="sep" d="M0 -6 C 7 -16, 7 -34, 0 -46 C -7 -34, -7 -16, 0 -6 Z" fill="#6EC38C"/>
  <use href="#sep" transform="rotate(72)"/><use href="#sep" transform="rotate(144)"/>
  <path d="M0 -6 C 7 -16, 7 -34, 0 -46 C -7 -34, -7 -16, 0 -6 Z" fill="#2E6A48" transform="rotate(216)"/>
  <use href="#sep" transform="rotate(288)"/><circle r="7" fill="#E9B949"/>
 </g></g></defs></svg>`;
document.querySelector('.stage').insertAdjacentHTML('afterbegin', MARK +
 `<div id="top" class="abs"><svg width="60" height="60" viewBox="0 0 100 100"><use href="#mark"/></svg><div class="wm">NightShade <b>Health</b></div></div>`);
document.querySelector('.stage').insertAdjacentHTML('beforeend',
 `<div id="end" class="scene"><svg id="bigmark" width="250" height="250" viewBox="0 0 100 100"><use href="#mark"/></svg>
  <div class="wm">NightShade<small>HEALTH</small></div><div class="line">Know what's in your food.</div>
  <div class="cta mono">Coming soon</div><div class="handle">@nightshade.health</div></div>`);
const E = [.2,.8,.2,1];
// scene in/out helpers
const inS = (s, at) => [[s,{opacity:[0,1]},{duration:.35,ease:E,at}]];
const outS = (s, at) => [[s,{opacity:[1,0],y:[0,-50]},{duration:.45,ease:E,at}]];
const rise = (s, at, stagger=0, d=.7, dist=60) => [[s,{opacity:[0,1],y:[dist,0]},{duration:d,ease:E,at,delay:stagger?Motion.stagger(stagger):0}]];
const endCard = at => [
 ...outS('#top', at-.4),
 ['#end',{opacity:[0,1]},{duration:.4,ease:E,at}],
 ['#bigmark',{rotate:[-72,0],scale:[.5,1]},{duration:1.2,ease:E,at}],
 ...rise('#end .wm', at+.5, 0, .7, 30),
 ...rise('#end .line', at+.8, 0, .7, 30),
 ['#end .cta',{opacity:[0,1],scale:[.85,1]},{duration:.6,ease:E,at:at+1.1}],
 ['#end .handle',{opacity:[0,1]},{duration:.6,ease:E,at:at+1.3}],
];
function run(seq, duration){
 document.querySelectorAll('.scene > *:not(#bigmark), #end > *').forEach(el=>{});
 window.ctl = Motion.animate([['#top',{opacity:[0,1],y:[-20,0]},{duration:.6,ease:E,at:0}], ...seq,
   ['#end',{opacity:[1,1]},{duration:.01,at:duration-.05}]]);
 window.ctl.pause(); window.ctl.time = 0; window.DURATION = duration;
}
