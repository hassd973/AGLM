export function initKineticTypography({
  logoHolderId = 'logoHolder',
  particlesId = 'particles',
  svgPath = '../assets/logo-alt-kinetic.svg'
} = {}){
  const logoHolder = document.getElementById(logoHolderId);
  const particles = document.getElementById(particlesId);

  fetch(svgPath)
    .then(r=>r.text())
    .then(svgText=>{
      logoHolder.innerHTML = svgText;
      setupInteractions();
    });

  const R = (a,b)=> a + Math.random()*(b-a);

  function spawn(kind, x, y, drift){
    const el = document.createElement('div');
    el.className = 'sprite ' + kind;
    const sv = document.createElementNS('http://www.w3.org/2000/svg','svg');
    sv.setAttribute('viewBox','0 0 100 80');
    const use = document.createElementNS('http://www.w3.org/2000/svg','use');
    use.setAttributeNS('http://www.w3.org/1999/xlink','href', kind==='bird' ? '#BIRD_RIG' : '#BUTTER_RIG');
    sv.appendChild(use); el.appendChild(sv); particles.appendChild(el);
    const host = particles.getBoundingClientRect();
    const px = x - host.left, py = y - host.top;
    el.style.setProperty('--x', px+'px'); el.style.setProperty('--y', py+'px');
    let dx = R(160,240), dy = R(-320,-200);
    if(drift==='left') dx = -dx;
    const mx = dx*0.45, my = dy*0.45;
    el.style.setProperty('--mx', Math.round(mx)+'px');
    el.style.setProperty('--my', Math.round(my)+'px');
    el.style.setProperty('--dx', Math.round(dx)+'px');
    el.style.setProperty('--dy', Math.round(dy)+'px');
    el.style.setProperty('--r0', R(-10,10)+'deg');
    el.style.setProperty('--rm', R(-10,10)+'deg');
    el.style.setProperty('--r1', R(-28,18)+'deg');
    el.style.setProperty('--s', R(.95,1.15));
    el.style.setProperty('--flap', (kind==='bird'? R(380,480):R(320,420))+'ms');
    el.style.setProperty('--dur', Math.round(R(2400,3200))+'ms');
    requestAnimationFrame(()=> el.classList.add('fly'));
    el.addEventListener('animationend', ()=> el.remove(), {once:true});
  }

  function centerOf(el){ const r = el.getBoundingClientRect(); return {x:r.left+r.width*0.5, y:r.top+r.height*0.5}; }

  function setupInteractions(){
    const svgRoot = logoHolder.querySelector('svg');
    const bird = svgRoot ? svgRoot.querySelector('#Bird, #bird') : null;
    const butter = svgRoot ? svgRoot.querySelector('#Butterfly, #butterfly') : null;
    if (bird) {
      bird.style.cursor = 'pointer';
      bird.addEventListener('mouseenter', ()=>{
        const a = centerOf(bird);
        spawn('bird', a.x, a.y, 'right');
      });
    }
    if (butter) {
      butter.style.cursor = 'pointer';
      butter.addEventListener('mouseenter', ()=>{
        const a = centerOf(butter);
        spawn('butter', a.x, a.y, 'left');
      });
    }
    svgRoot.addEventListener('click', (ev)=>{
      const n = Math.round(R(24, 36));
      for(let i=0;i<n;i++) setTimeout(()=> spawn(Math.random()<.55?'bird':'butter', ev.clientX, ev.clientY, Math.random()<.5?'left':'right'), i*32);
    });
  }
}
