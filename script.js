const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
document.getElementById('year').textContent=new Date().getFullYear();

const filterButtons=[...document.querySelectorAll('.filter-btn')];
const projects=[...document.querySelectorAll('.project-card')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const filter=button.dataset.filter;
  projects.forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;});
}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll('.section-kicker,.about-grid,.principles article,.service-card,.project-card,.stack-item,.contact-panel').forEach(el=>{el.classList.add('reveal');observer.observe(el);});

const topButton=document.querySelector('.back-top');
window.addEventListener('scroll',()=>topButton.classList.toggle('visible',window.scrollY>500),{passive:true});
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const copyButton=document.querySelector('.copy-email');
const toast=document.querySelector('.toast');
copyButton.addEventListener('click',async()=>{
  const email=copyButton.dataset.email;
  if(!email||email.includes('YOUR_EMAIL')){toast.textContent='Add your email in index.html first';}
  else{
    try{await navigator.clipboard.writeText(email);toast.textContent='Email copied to clipboard';}
    catch{toast.textContent='Copy unavailable — use the email link';}
  }
  toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2400);
});

const glow=document.querySelector('.cursor-glow');
if(window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';},{passive:true});
}
