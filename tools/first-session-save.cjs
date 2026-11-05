// Run against a locally served checkout: node tools/first-session-save.cjs
// Uses the development environment's existing Playwright and system Chromium.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.READING_ROOM_URL||'http://127.0.0.1:8000';
const out=process.env.READING_ROOM_TEST_OUTPUT;
const expectBug=process.argv.includes('--expect-bug');
(async()=>{
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const results=[];
 try{
  for(const width of [390,1280])for(const scenario of ['first-to-read','queued-to-read','new-search-book','existing-reading']){
   const ctx=await browser.newContext({viewport:{width,height:1100}});
   const page=await ctx.newPage();page.setDefaultTimeout(6000);
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.route('https://**/*',r=>r.request().url().includes('openlibrary.org/search.json')?r.fulfill({contentType:'application/json',body:JSON.stringify({docs:[{key:'/works/EXAMPLEFIRST',title:'Example Book',author_name:['Example Author'],number_of_pages_median:200}]})}):r.abort());
   await ctx.addInitScript(()=>{const original=setTimeout;window.setTimeout=(fn,delay,...args)=>typeof fn==='function'&&['coverFill','descAll','maybeOfferTour'].includes(fn.name)?0:original(fn,delay,...args)});
   await page.goto(base);
   await page.evaluate(scenario=>{
    hideTourOffer();S.me.name='Demo Reader';S.members={};S.group={name:'Demo Group'};
    for(const k of ['books','titles','copies','sessions','challenges','battles','trophies','activity','recs','recsSent','notifs','upNext','journal','loanReqs'])S[k]=[];
    S.notes={};S.timer=null;
    Object.assign(S.settings,{solo:true,share:false,theme:'light',palette:'sage',hfont:'dmsans',bfont:'dmsans',copyDefault:'private',gsHidden:true,tour:{seen:true,visits:9,askAt:99,groupSeen:true}});
    if(scenario!=='new-search-book'){
     S.titles=[{id:'t-test',title:'Example Book',author:'Example Author',pages:200,c:1}];
     S.books=[{id:'r-test',titleId:'t-test',title:'Example Book',author:'Example Author',format:'print',total:200,pos:0,status:scenario==='existing-reading'?'reading':'want',c:1}];
     if(scenario==='queued-to-read')S.upNext=['r-test'];
    }
    save();render();
    if(scenario==='existing-reading')openLog('r-test');else{drawNew();logDlg.showModal()}
   },scenario);
   if(scenario==='new-search-book'){
    await page.locator('#newQ').fill('Example Book');
    await page.locator('[data-act=pickOL][data-i="0"]').click();
   }else if(scenario!=='existing-reading'){
    await page.locator('[data-act=pickNew][data-id=r-test]').click();
   }
   if(await page.locator('[data-act=startFormatGo]').count())await page.locator('[data-act=startFormatGo]').click();
   await page.locator('#logForm [name=start]').fill('0');
   await page.locator('#logForm [name=end]').fill('10');
   await page.locator('#logForm [name=minutes]').fill('15');
   await page.locator('#logForm [name=note]').fill('An example private note.');
   if(out){fs.mkdirSync(out,{recursive:true});await page.locator('#logDlg').screenshot({path:`${out}/${scenario}-${width}-before-save.png`})}
   await page.locator('#logForm button[type=submit]').click();
   await page.waitForTimeout(100);
   // Read persistent storage, not S: the bug mutates memory before throwing.
   const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem(KEY)));
   const reading=stored.books.find(b=>b.title==='Example Book');
   const sessions=reading?stored.sessions.filter(s=>s.bookId===reading.id):[];
   const shouldFail=expectBug&&scenario!=='existing-reading';
   if(shouldFail){
    assert(errors.some(e=>e.includes('wasQueued')),JSON.stringify(errors));
    assert.equal(sessions.length,0);
    assert.equal(await page.locator('#logDlg').evaluate(d=>d.open),true);
   }else{
    assert.deepEqual(errors,[]);
    assert.equal(reading.status,'reading');assert.equal(reading.pos,10);
    assert.equal(sessions.length,1);assert.equal(sessions[0].pages,10);assert.equal(sessions[0].minutes,15);
    assert.equal(sessions[0].note,'An example private note.');
    assert.equal(!!reading.fromQueue,scenario==='queued-to-read');
    assert.equal(await page.locator('#logDlg').evaluate(d=>d.open),false);
   }
   await page.reload();
   const reloaded=await page.evaluate(()=>({books:S.books,sessions:S.sessions}));
   const bookAfterReload=reloaded.books.find(b=>b.title==='Example Book');
   if(shouldFail){
    assert.equal(reloaded.sessions.length,0);
    if(bookAfterReload)assert.equal(bookAfterReload.status,'want');
   }else{
    assert.equal(bookAfterReload.status,'reading');assert.equal(bookAfterReload.pos,10);
    assert.equal(reloaded.sessions.filter(s=>s.bookId===bookAfterReload.id).length,1);
    if(out)await page.screenshot({path:`${out}/${scenario}-${width}-after-reload.png`});
   }
   results.push({scenario,width,result:shouldFail?'reproduced original persistence failure':'passed persistent save and reload',errors});
   await ctx.close();
  }
  if(out)fs.writeFileSync(`${out}/results.json`,JSON.stringify(results,null,2)+'\n');
  console.log(JSON.stringify(results,null,2));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
