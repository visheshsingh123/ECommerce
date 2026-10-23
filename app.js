const products = [
  {name:'The Everyday Linen Shirt',category:'women',colour:'Oat / 3 colours',price:1899,image:'photo-1598554747436-c9293d6a588f',badge:'BESTSELLER',swatches:['#d9ceba','#f4f0e8','#69735d']},
  {name:'Relaxed Cotton Tee',category:'men',colour:'Forest / 4 colours',price:899,image:'photo-1521572163474-6864f9cf17ab',badge:'NEW IN',swatches:['#64705a','#e4dfd5','#333936']},
  {name:'The Weekend Trousers',category:'women',colour:'Sand / 2 colours',price:2299,image:'photo-1473966968600-fa801b869a1a',badge:'',swatches:['#cabda4','#484a40']},
  {name:'Soft Knit Cardigan',category:'women',colour:'Warm cream / 3 colours',price:2499,image:'photo-1434389677669-e08b4cac3105',badge:'NEW IN',swatches:['#e8dfca','#9c8b77','#484b42']},
  {name:'Essential Oversized Shirt',category:'men',colour:'Chalk / 3 colours',price:1699,image:'photo-1596755094514-f87e34085b2c',badge:'',swatches:['#ece8dd','#a3a99c','#32332e']},
  {name:'The Slow Sunday Dress',category:'women',colour:'Natural / 2 colours',price:2899,image:'photo-1595777457583-95e059d581b8',badge:'THE EVERYDAY EDIT',swatches:['#c6bca5','#4e5a44']},
  {name:'Everyday Straight Denim',category:'men',colour:'Washed blue / 2 colours',price:2199,image:'photo-1542272604-787c3835535d',badge:'BESTSELLER',swatches:['#778996','#3d4d5c']},
  {name:'The Layering Essential',category:'women',colour:'Cocoa / 3 colours',price:1499,image:'photo-1576566588028-4147f3842f27',badge:'',swatches:['#83715f','#ded8cc','#343b33']}
];
const grid = document.querySelector('#product-grid');
let filter = 'all', query = '';
const favourites = new Set();
const money = value => '₹' + value.toLocaleString('en-IN');
function renderProducts(){
  const visible = products.filter(p => (filter === 'all' || p.category === filter) && (p.name+' '+p.colour).toLowerCase().includes(query));
  grid.innerHTML = visible.map(p => {
    const index = products.indexOf(p);
    return `<article class="product-card"><div class="product-photo"><a class="product-image-link" href="product.html?item=${index}" aria-label="View ${p.name}"><img loading="lazy" src="https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=650&q=85" alt="${p.name}"></a>${p.badge ? `<span class="product-badge ${p.badge==='NEW IN'?'olive':''}">${p.badge}</span>`:''}<button class="wishlist" data-favourite="${index}" aria-label="Save ${p.name}" aria-pressed="${favourites.has(index)}"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button><button class="quick-view" data-preview="${index}">Take a closer look ↗</button></div><div class="product-meta"><h3><a href="product.html?item=${index}">${p.name}</a></h3><span>${money(p.price)}</span></div><p class="product-colour">${p.colour}</p><div class="swatches" aria-label="Available colours">${p.swatches.map(c=>`<span class="swatch" style="background:${c}"></span>`).join('')}</div></article>`;
  }).join('');
  document.querySelector('#product-count').textContent = `${visible.length} thoughtfully chosen ${visible.length === 1 ? 'piece':'pieces'}`;
  document.querySelector('#empty-state').hidden = visible.length > 0;
}
renderProducts();
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',b===button);});
  renderProducts();
}));
let toastTimer;
function toast(message){const element=document.querySelector('#toast');element.textContent=message;element.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>element.classList.remove('visible'),2600);}
const dialog=document.querySelector('#page-dialog');
function openDialog(title,message){document.querySelector('#dialog-title').textContent=title;dialog.querySelector('p:not(.eyebrow)').textContent=message;dialog.showModal();}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('#dialog-continue').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
document.addEventListener('click',event=>{
  const favourite=event.target.closest('[data-favourite]');
  if(favourite){const index=Number(favourite.dataset.favourite);if(favourites.has(index)){favourites.delete(index);toast('Removed from your favourites');}else{favourites.add(index);toast('Saved to your favourites for this visit');}favourite.setAttribute('aria-pressed',favourites.has(index));return;}
  const preview=event.target.closest('[data-preview]');
  if(preview){const p=products[Number(preview.dataset.preview)];openDialog(p.name,`${money(p.price)} · ${p.colour}. This is a demo piece. Product details and shopping will be added later.`);return;}
  const link=event.target.closest('a');
  if(link && /^(?!index\.html)[\w-]+\.html/.test(link.getAttribute('href')||'')){
    event.preventDefault();
    const href=link.getAttribute('href');
    const titles={'shop.html':'The full collection','women.html':"The women’s edit",'men.html':"The men’s edit",'essentials.html':'The essentials','cart.html':'Your shopping bag','account.html':'Your WovenHours account','about.html':'The WovenHours story'};
    openDialog(titles[href] || (href.startsWith('product.html')?'A closer look':link.textContent.trim()||'Coming soon'),'This page is coming next. You’re exploring a visual demo, so accounts, checkout, and orders aren’t connected yet.');
  }
});
const slides=[
 {kicker:'THE EVERYDAY COLLECTION · VOL. 01',title:'Less rush.<br>More you.',description:'Easy layers. Natural textures. Pieces that feel like you,<br class="desktop-break"> wherever the day takes you.',image:'photo-1445205170230-053b83016050',link:'Discover the collection',caption:'MADE FOR SLOW MORNINGS & EVERYTHING AFTER.'},
 {kicker:'THE ART OF KEEPING IT SIMPLE',title:'Your day.<br>Your rhythm.',description:'A fresh perspective on getting dressed.<br class="desktop-break"> Meet the essentials you’ll reach for again and again.',image:'photo-1441986300917-64674bd600d8',link:'Find your everyday',caption:'GOOD CLOTHES. EVEN BETTER DAYS.'},
 {kicker:'SOFT TEXTURES · EASY LAYERS',title:'Comfort,<br>considered.',description:'A little warmth. A lot of possibility.<br class="desktop-break"> Discover soft layers for wherever you’re headed.',image:'photo-1434389677669-e08b4cac3105',link:'Explore the essentials',caption:'A LITTLE ROOM TO BE YOURSELF.'}
];
let currentSlide=0, paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function showSlide(index){currentSlide=(index+slides.length)%slides.length;const s=slides[currentSlide];document.querySelector('#hero-kicker').textContent=s.kicker;document.querySelector('#hero-title').innerHTML=s.title;document.querySelector('#hero-description').innerHTML=s.description;document.querySelector('#hero-photo').style.backgroundImage=`url('https://images.unsplash.com/${s.image}?auto=format&fit=crop&w=2400&q=90')`;document.querySelector('#hero-link').innerHTML=`${s.link} <span>↗</span>`;document.querySelector('#hero-caption').textContent=s.caption;document.querySelector('#slide-number').innerHTML=`0${currentSlide+1} <i>/ 03</i>`;document.querySelectorAll('.slide-progress span').forEach((dot,i)=>dot.classList.toggle('active',i===currentSlide));}
let timer;
function resetTimer(){clearInterval(timer);if(!paused)timer=setInterval(()=>{if(!document.hidden&&!document.querySelector('.hero').matches(':hover')&&!document.querySelector('.hero').contains(document.activeElement))showSlide(currentSlide+1);},6500);}
document.querySelector('#previous-slide').addEventListener('click',()=>{showSlide(currentSlide-1);resetTimer();});
document.querySelector('#next-slide').addEventListener('click',()=>{showSlide(currentSlide+1);resetTimer();});
const pauseButton=document.querySelector('#pause-slider');
function updatePause(){pauseButton.textContent=paused?'▷':'Ⅱ';pauseButton.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');resetTimer();}
pauseButton.addEventListener('click',()=>{paused=!paused;updatePause();});updatePause();
const menuToggle=document.querySelector('#menu-toggle');
menuToggle.addEventListener('click',()=>{const menu=document.querySelector('#mobile-nav');menu.hidden=!menu.hidden;menuToggle.setAttribute('aria-expanded',!menu.hidden);});
document.querySelectorAll('#mobile-nav a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#mobile-nav').hidden=true;menuToggle.setAttribute('aria-expanded','false');}));
const searchForm=document.querySelector('#search-form');
document.querySelector('#search-toggle').addEventListener('click',()=>{searchForm.hidden=!searchForm.hidden;if(!searchForm.hidden)document.querySelector('#search').focus();});
searchForm.addEventListener('submit',event=>{event.preventDefault();query=document.querySelector('#search').value.trim().toLowerCase();renderProducts();document.querySelector('#collection').scrollIntoView({behavior:'smooth'});});
document.querySelector('#search').addEventListener('input',event=>{if(!event.target.value){query='';renderProducts();}});
document.querySelector('#newsletter-form').addEventListener('submit',event=>{event.preventDefault();document.querySelector('#newsletter-status').textContent='Thanks for stopping by! This is a demo — your email hasn’t been saved or subscribed.';event.target.reset();});
document.querySelector('#year').textContent=new Date().getFullYear();
