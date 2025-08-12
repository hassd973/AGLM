const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const suggestion = document.getElementById('suggestion');
const combos = document.getElementById('combos');

const palette = ['#2c6fb1','#6fb1ff','#1d3f73','#de9146','#111111','#dbb5c2','#efe5d7','#ebe9d5','#f3f0ec'];
const filters = ['none','grayscale(100%)','sepia(60%)','contrast(160%)','brightness(120%)'];
let filterIndex = 0;

function luminance(hex){
  const r = parseInt(hex.substr(1,2),16)/255;
  const g = parseInt(hex.substr(3,2),16)/255;
  const b = parseInt(hex.substr(5,2),16)/255;
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

function analyze(){
  if(video.readyState >= 2){
    ctx.drawImage(video,0,0,canvas.width,canvas.height);
    const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
    let r=0,g=0,b=0;
    for(let i=0;i<data.length;i+=4){
      r+=data[i]; g+=data[i+1]; b+=data[i+2];
    }
    const count = data.length/4;
    r/=count; g/=count; b/=count;
    const bright = (0.2126*r + 0.7152*g + 0.0722*b)/255;
    let best = palette[0];
    let bestScore = 0;
    palette.forEach(c=>{
      const contrast = Math.abs(luminance(c) - bright);
      if(contrast > bestScore){ bestScore = contrast; best = c; }
    });
    suggestion.textContent = `Best color: ${best}`;
    suggestion.style.color = best;
  }
  requestAnimationFrame(analyze);
}

navigator.mediaDevices.getUserMedia({video:true}).then(stream=>{
  video.srcObject = stream;
  video.play();
  requestAnimationFrame(analyze);
}).catch(err=>{
  suggestion.textContent = 'Camera access is required.';
});

function colorDistance(c,r,g,b){
  const R=parseInt(c.substr(1,2),16);
  const G=parseInt(c.substr(3,2),16);
  const B=parseInt(c.substr(5,2),16);
  return Math.sqrt((R-r)**2 + (G-g)**2 + (B-b)**2);
}

document.getElementById('filterBtn').addEventListener('click',()=>{
  filterIndex = (filterIndex+1)%filters.length;
  video.style.filter = filters[filterIndex];
});

document.getElementById('comboBtn').addEventListener('click',()=>{
  ctx.drawImage(video,0,0,canvas.width,canvas.height);
  const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  let r=0,g=0,b=0;
  for(let i=0;i<data.length;i+=4){ r+=data[i]; g+=data[i+1]; b+=data[i+2]; }
  const count = data.length/4;
  r/=count; g/=count; b/=count;
  const sorted = [...palette].sort((a,b)=> colorDistance(a,r,g,b) - colorDistance(b,r,g,b)).slice(0,3);
  combos.innerHTML='';
  sorted.forEach(c=>{
    const div=document.createElement('div');
    div.className='swatch';
    div.style.background=c;
    combos.appendChild(div);
  });
});
