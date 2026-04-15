  // BURGER MENU
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function closeMenu(){
    menuToggle.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('show');
  }

  menuToggle.addEventListener('click', ()=>{
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('show');
  });

  navOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('#navLinks a').forEach(link=>{
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 900){ closeMenu(); }
  });

  // LIGHTBOX
  const lb=document.getElementById('lightbox');
  const lbImg=document.getElementById('lbImg');
  const lbCounter=document.getElementById('lbCounter');
  const lbTitle=document.getElementById('lbTitle');
  const lbStrip=document.getElementById('lbStrip');
  let lbSrcs=[],lbIdx=0;

  function buildStrip(){
    lbStrip.innerHTML='';
    lbSrcs.forEach((src,i)=>{
      const t=document.createElement('img');
      t.src=src; t.className='lightbox-thumb'+(i===lbIdx?' active':'');
      t.addEventListener('click',()=>lbGo(i));
      lbStrip.appendChild(t);
    });
  }
  function syncStrip(){
    lbStrip.querySelectorAll('.lightbox-thumb').forEach((t,i)=>t.classList.toggle('active',i===lbIdx));
    const a=lbStrip.querySelectorAll('.lightbox-thumb')[lbIdx];
    if(a) a.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'});
  }
  function lbGo(idx){
    lbIdx=(idx+lbSrcs.length)%lbSrcs.length;
    lbImg.style.opacity='0'; lbImg.style.transform='scale(.96)';
    setTimeout(()=>{ lbImg.src=lbSrcs[lbIdx]; lbImg.onload=()=>{ lbImg.style.opacity='1'; lbImg.style.transform='scale(1)'; }; },140);
    lbCounter.textContent=(lbIdx+1)+' / '+lbSrcs.length;
    syncStrip();
  }
  function openLB(srcs,idx,title){
    lbSrcs=srcs; lbIdx=idx;
    lbTitle.textContent=title;
    lbImg.style.transition='opacity .4s,transform .4s';
    lbImg.style.opacity='1'; lbImg.style.transform='scale(1)';
    lbImg.src=lbSrcs[lbIdx];
    lbCounter.textContent=(lbIdx+1)+' / '+lbSrcs.length;
    lb.classList.add('open');
    document.body.style.overflow='hidden';
    buildStrip(); syncStrip();
  }
  function closeLB(){
    lb.classList.remove('open');
    document.body.style.overflow='';
  }

  document.getElementById('lbClose').addEventListener('click', function(e){
    e.preventDefault(); e.stopPropagation();
    closeLB();
  });
  document.getElementById('lbPrev').addEventListener('click',e=>{ e.stopPropagation(); lbGo(lbIdx-1); });
  document.getElementById('lbNext').addEventListener('click',e=>{ e.stopPropagation(); lbGo(lbIdx+1); });
  lb.addEventListener('click',e=>{ if(e.target===lb) closeLB(); });
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open')) return;
    if(e.key==='Escape') closeLB();
    if(e.key==='ArrowLeft') lbGo(lbIdx-1);
    if(e.key==='ArrowRight') lbGo(lbIdx+1);
  });

  // GALLERY
  const galItems=[...document.querySelectorAll('#galleryGrid .uniform-item')];
  const galSrcs=galItems.map(i=>i.querySelector('img').src);
  galItems.forEach((item,i)=>item.addEventListener('click',()=>openLB(galSrcs,i,'Visual Gallery')));

  // FOLDER TOGGLE
  function setupFolder(cardId,panelId){
    const card=document.getElementById(cardId), panel=document.getElementById(panelId);
    if(!card||!panel) return;
    card.addEventListener('click',()=>{
      const wasOpen=card.classList.contains('open');
      document.querySelectorAll('.folder-card').forEach(c=>c.classList.remove('open'));
      document.querySelectorAll('.files-panel').forEach(p=>p.classList.remove('open'));
      if(!wasOpen){ card.classList.add('open'); panel.classList.add('open'); setTimeout(()=>panel.scrollIntoView({behavior:'smooth',block:'nearest'}),100); }
    });
  }
  setupFolder('portfolioFolderCard','portfolioPanel');
  setupFolder('quizFolderCard','quizPanel');
  setupFolder('storyFolderCard','storyPanel');
  setupFolder('authFolderCard','authPanel');
  setupFolder('personaFolderCard','personaPanel');
  setupFolder('aboutFolderCard','aboutPanel');

  // PORTFOLIO LIGHTBOX
  const pfFiles=[...document.querySelectorAll('#portfolioGrid .story-file')];
  const pfSrcs=pfFiles.map(f=>f.querySelector('img').src);
  pfFiles.forEach((f,i)=>f.addEventListener('click',e=>{ e.stopPropagation(); openLB(pfSrcs,i,'Portfolio'); }));

  // QUIZ LIGHTBOX
  const qFiles=[...document.querySelectorAll('#quizGrid .quiz-file')];
  const qSrcs=qFiles.map(f=>f.querySelector('img').src);
  qFiles.forEach((f,i)=>f.addEventListener('click',e=>{ e.stopPropagation(); openLB(qSrcs,i,'Quiz Tool'); }));

  // STORY LIGHTBOX
  const sFiles=[...document.querySelectorAll('#storyGrid .story-file')];
  const sSrcs=sFiles.map(f=>f.querySelector('img').src);
  sFiles.forEach((f,i)=>f.addEventListener('click',e=>{ e.stopPropagation(); openLB(sSrcs,i,'Story'); }));

  // AUTH LIGHTBOX
  const aFiles=[...document.querySelectorAll('#authGrid .story-file')];
  const aSrcs=aFiles.map(f=>f.querySelector('img').src);
  aFiles.forEach((f,i)=>f.addEventListener('click',e=>{ e.stopPropagation(); openLB(aSrcs,i,'Auth System'); }));

  // PERSONA LIGHTBOX
  const pFiles=[...document.querySelectorAll('#personaGrid .story-file')];
  const pSrcs=pFiles.map(f=>f.querySelector('img').src);
  pFiles.forEach((f,i)=>f.addEventListener('click',e=>{ e.stopPropagation(); openLB(pSrcs,i,'User Persona'); }));

  // ABOUT LIGHTBOX
  const abFiles=[...document.querySelectorAll('#aboutGrid .story-file')];
  const abSrcs=abFiles.map(f=>f.querySelector('img').src);
  abFiles.forEach((f,i)=>f.addEventListener('click',e=>{ e.stopPropagation(); openLB(abSrcs,i,'ABOUT'); }));

  // AUDIO PLAYERS
  const pauseSVG=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor"/></svg>`;
  const playSVG=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5l9 5.5-9 5.5V2.5z" fill="currentColor"/></svg>`;
  function fmt(s){ return Math.floor(s/60)+':'+(Math.floor(s%60)+'').padStart(2,'0'); }

  function setupAudio(n){
    const au=document.getElementById('audioPlayer'+n);
    const btn=document.getElementById('playBtn'+n);
    const ico=document.getElementById('playIcon'+n);
    const vin=document.getElementById('vinyl'+n);
    const bars=document.getElementById('soundBars'+n);
    const fill=document.getElementById('progressFill'+n);
    const bar=document.getElementById('progressBar'+n);
    const cur=document.getElementById('currentTime'+n);
    const dur=document.getElementById('duration'+n);

    btn.addEventListener('click',()=>{
      [1,2].filter(x=>x!==n).forEach(x=>{
        const a=document.getElementById('audioPlayer'+x);
        if(a&&!a.paused){ a.pause(); document.getElementById('playIcon'+x).innerHTML=playSVG; document.getElementById('vinyl'+x).classList.remove('playing'); document.getElementById('soundBars'+x).classList.remove('playing'); }
      });
      if(au.paused){ au.play(); ico.innerHTML=pauseSVG; vin.classList.add('playing'); bars.classList.add('playing'); }
      else { au.pause(); ico.innerHTML=playSVG; vin.classList.remove('playing'); bars.classList.remove('playing'); }
    });
    au.addEventListener('timeupdate',()=>{ if(!au.duration) return; fill.style.width=(au.currentTime/au.duration*100)+'%'; cur.textContent=fmt(au.currentTime); });
    au.addEventListener('loadedmetadata',()=>{ dur.textContent=fmt(au.duration); });
    au.addEventListener('ended',()=>{ ico.innerHTML=playSVG; vin.classList.remove('playing'); bars.classList.remove('playing'); fill.style.width='0%'; cur.textContent='0:00'; });
    bar.addEventListener('click',e=>{ const r=bar.getBoundingClientRect(); au.currentTime=((e.clientX-r.left)/r.width)*au.duration; });
  }
  setupAudio(1); setupAudio(2);

  // LOGOUT
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("currentUser");
      window.location.href = "login.html";
    });
  }
