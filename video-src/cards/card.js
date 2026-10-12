// shared: logo mark defs + top bar for feed cards
document.querySelector('.stage').insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute"><defs>
 <g id="mark"><g transform="translate(50 50)">
  <path id="sep" d="M0 -6 C 7 -16, 7 -34, 0 -46 C -7 -34, -7 -16, 0 -6 Z" fill="#6EC38C"/>
  <use href="#sep" transform="rotate(72)"/><use href="#sep" transform="rotate(144)"/>
  <path d="M0 -6 C 7 -16, 7 -34, 0 -46 C -7 -34, -7 -16, 0 -6 Z" fill="#2E6A48" transform="rotate(216)"/>
  <use href="#sep" transform="rotate(288)"/><circle r="7" fill="#E9B949"/>
 </g></g></defs></svg>
 <div class="bar"><svg width="60" height="60" viewBox="0 0 100 100"><use href="#mark"/></svg><div class="wm">NightShade <b>Health</b></div></div>`);
