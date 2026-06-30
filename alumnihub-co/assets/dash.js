/* AlumniHub giving dashboard (demo) — interactive logic. Sample data only. */
(function(){
/* nav */
var mt=document.getElementById('mob-toggle'),md=document.getElementById('mob-drawer');
if(mt){mt.addEventListener('click',function(){var o=md.classList.toggle('open');mt.classList.toggle('open',o);document.body.classList.toggle('nav-open',o);});
md.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){md.classList.remove('open');mt.classList.remove('open');document.body.classList.remove('nav-open');});});}

/* US hex tile layout (NPR-style, pointy-top, offset rows). [col,row]; odd rows shift +0.5 col */
var GEO={
 AK:[0,0], ME:[10,0],
 VT:[8,1], NH:[9,1],
 WA:[0,2],MT:[1,2],ND:[2,2],MN:[3,2],WI:[4,2],MI:[6,2],NY:[8,2],MA:[9,2],RI:[10,2],
 ID:[1,3],WY:[2,3],SD:[3,3],IA:[4,3],IL:[5,3],IN:[6,3],OH:[7,3],PA:[8,3],NJ:[9,3],CT:[10,3],
 OR:[0,4],NV:[1,4],CO:[2,4],NE:[3,4],MO:[4,4],KY:[5,4],WV:[6,4],VA:[7,4],MD:[8,4],DE:[9,4],
 CA:[1,5],UT:[2,5],NM:[3,5],KS:[4,5],AR:[5,5],TN:[6,5],NC:[7,5],SC:[8,5],
 AZ:[2,6],OK:[3,6],LA:[4,6],MS:[5,6],AL:[6,6],GA:[7,6],
 HI:[0,7],TX:[3,7],FL:[7,7]
};
var FILL=['rgba(255,255,255,.06)','rgba(201,154,46,.25)','rgba(201,154,46,.45)','rgba(201,154,46,.68)','#C99A2E'];
var ST_DOLLARS={NY:4,CA:4,MA:4,IL:3,TX:3,FL:3,PA:3,NJ:3,VA:3,CT:3,WA:2,MI:2,OH:2,CO:2,MN:2,NC:2,GA:2,MD:2,OR:1,NV:1,UT:1,AZ:1,WI:1,IA:1,IN:1,MO:1,KY:1,TN:1,SC:1,AL:1,LA:1,RI:1,DE:1,NH:1,ME:1,HI:1,MT:-1,ND:-1,SD:-1,WY:-1,ID:-1,NE:-1,KS:-1,NM:-1,OK:-1,AR:-1,MS:-1,WV:-1,VT:-1,AK:-1};
var ST_PART={VT:4,ME:4,NH:4,RI:3,MA:3,CT:3,IA:3,MN:3,WI:3,VA:2,NC:2,OR:2,CO:2,KY:2,SC:2,PA:2,OH:2,NY:2,WA:2,IL:1,MI:1,MD:1,DE:1,IN:1,MO:1,TN:1,AL:1,GA:1,HI:1,UT:1,NV:1,AZ:1,CA:1,TX:1,FL:1,MT:-1,ND:-1,SD:-1,WY:-1,ID:-1,NE:-1,KS:-1,NM:-1,OK:-1,AR:-1,MS:-1,WV:-1,LA:-1,AK:-1};

var DATA={
 national:{title:'National Alumni Association',sub:'Powering scholarships, chapters & the next generation',eyebrow:'2026 Annual Fund',days:62,
   goal:2000000,raised:1480000,donors:3124,participation:28,avg:474,matched:220000,matchGoal:300000,
   classes:[['Class of 2005',148200,34,312],['Class of 2000',96400,29,241],['Class of 1995',74800,31,188],['Class of 2010',71850,22,388],['Class of 2015',54200,18,401]],
   chapters:[['Chicago',58900,31,212],['Houston',47300,27,176],['Atlanta',41200,33,168],['New Jersey',33400,24,141],['Charlotte',29750,22,109]],
   gifts:[['Jordan M.','Class of 2005 · Chicago',250,''],['Dr. Priya R.','Class of 2010 · Houston',5000,'Patron'],['','Class of 1998',1000,'Advocate'],['The Bell Family','Class of 1988 · Atlanta',25000,'Leadership Circle'],['Marcus T.','Class of 2000 · New Jersey',100,'']],
   societies:[['Advocate','$1,000+',412],['Patron','$5,000+',98],['Benefactor','$10,000+',41],['Leadership Circle','$25,000+',13],['Legacy Society','$100,000+',4]],
   ledger:[['Gifts received',1480000,'pos'],['Processing fees',-32100,''],['Employer matching',220000,'pos'],['Disbursed to date',900000,''],['Available to transfer',767900,'pos']],
   health:[['412','LYBUNT'],['338','SYBUNT'],['$118k','Pledged out'],['9.4%','Recurring']],
   donorList:[['Margaret Bell','1988','Atlanta',125000,'Legacy Society',25000,'cur'],['Dr. Priya Raman','2010','Houston',18500,'Benefactor',5000,'cur'],['James Okafor','2000','Chicago',7200,'Patron',1500,'cur'],['Sofia Marin','2015','New Jersey',2400,'Advocate',250,'cur'],['Daniel Wu','1995','Boston',9100,'Patron',0,'lap'],['Aisha Bello','2005','Charlotte',1500,'Advocate',0,'lap']],
   spark:[2,5,9,14,22,30,38,45,55,63,69,74]},
 region:{title:'Northeast Region',sub:'NY · MA · CT · NJ · PA · New England chapters',eyebrow:'2026 Annual Fund · Regional',days:62,
   goal:600000,raised:486000,donors:1042,participation:34,avg:466,matched:80000,matchGoal:100000,
   classes:[['Class of 2005',58200,38,121],['Class of 2000',41400,33,98],['Class of 1995',31800,35,74],['Class of 2010',26850,25,142],['Class of 2015',19200,21,150]],
   chapters:[['New York',96400,36,288],['Boston',71200,39,221],['New Jersey',33400,24,141],['Philadelphia',28900,28,118],['Hartford',16800,26,71]],
   gifts:[['Dr. Priya R.','Class of 2010 · Boston',5000,'Patron'],['','Class of 1998 · New York',1000,'Advocate'],['The Bell Family','Class of 1988 · Boston',25000,'Leadership Circle'],['Liam O.','Class of 2012 · New York',150,''],['Grace H.','Class of 2003 · Philadelphia',500,'']],
   societies:[['Advocate','$1,000+',164],['Patron','$5,000+',39],['Benefactor','$10,000+',17],['Leadership Circle','$25,000+',6],['Legacy Society','$100,000+',1]],
   ledger:[['Gifts received',486000,'pos'],['Processing fees',-10600,''],['Employer matching',80000,'pos'],['Disbursed to date',300000,''],['Available to transfer',255400,'pos']],
   health:[['148','LYBUNT'],['121','SYBUNT'],['$41k','Pledged out'],['11.2%','Recurring']],
   donorList:[['Margaret Bell','1988','Boston',125000,'Legacy Society',25000,'cur'],['Dr. Priya Raman','2010','Boston',18500,'Benefactor',5000,'cur'],['Grace Han','2003','Philadelphia',3100,'Advocate',500,'cur'],['Liam O Neal','2012','New York',900,'—',150,'cur'],['Daniel Wu','1995','Boston',9100,'Patron',0,'lap'],['Nina Petrova','2008','Hartford',1200,'Advocate',0,'lap']],
   spark:[3,7,12,18,26,34,43,52,61,68,73,81]},
 chapter:{title:'Boston Chapter',sub:'Northeast Region · Greater Boston alumni',eyebrow:'2026 Annual Fund · Chapter',days:62,
   goal:150000,raised:71200,donors:221,participation:39,avg:322,matched:20000,matchGoal:25000,
   classes:[['Class of 2010',14800,41,58],['Class of 2005',12200,44,41],['Class of 2015',8600,28,52],['Class of 2000',7400,33,29],['Class of 1995',6100,37,21]],
   chapters:[['Downtown',24800,42,96],['Cambridge',18600,40,71],['Suburbs North',14200,35,33],['Suburbs South',9300,31,21]],
   gifts:[['Dr. Priya R.','Class of 2010 · Cambridge',5000,'Patron'],['The Bell Family','Class of 1988 · Downtown',25000,'Leadership Circle'],['','Class of 2001',1000,'Advocate'],['Tomas V.','Class of 2014 · Downtown',75,''],['Renee D.','Class of 1999 · Cambridge',300,'']],
   societies:[['Advocate','$1,000+',38],['Patron','$5,000+',9],['Benefactor','$10,000+',4],['Leadership Circle','$25,000+',2],['Legacy Society','$100,000+',0]],
   ledger:[['Gifts received',71200,'pos'],['Processing fees',-1560,''],['Employer matching',20000,'pos'],['Disbursed to date',40000,''],['Available to transfer',49640,'pos']],
   health:[['41','LYBUNT'],['33','SYBUNT'],['$9k','Pledged out'],['13.6%','Recurring']],
   donorList:[['Margaret Bell','1988','Downtown',125000,'Legacy Society',25000,'cur'],['Dr. Priya Raman','2010','Cambridge',18500,'Benefactor',5000,'cur'],['Renee Dufort','1999','Cambridge',2100,'Advocate',300,'cur'],['Tomas Vega','2014','Downtown',450,'—',75,'cur'],['Daniel Wu','1995','Suburbs North',9100,'Patron',0,'lap'],['Karen Liu','2006','Suburbs South',1100,'Advocate',0,'lap']],
   spark:[4,9,15,22,30,39,48,57,64,69,72,47]}
};

var $=function(id){return document.getElementById(id);};
var money=function(n){return '$'+Math.round(n).toLocaleString();};
var moneyK=function(n){return Math.abs(n)>=1000?('$'+Math.round(n/1000)+'k'):('$'+n);};
var scope='national', metric='dollars';

function renderHex(){
  var svg=$('hexmap'), r=23, pad=6, W=Math.sqrt(3)*r, rowY=1.5*r;
  var tiers = metric==='participation'? ST_PART : ST_DOLLARS;
  var maxX=0,maxY=0,cells='';
  for(var ab in GEO){ if(!GEO.hasOwnProperty(ab))continue;
    var c=GEO[ab][0],row=GEO[ab][1];
    var cx=pad + (c + (row%2?0.5:0))*W + W/2;
    var cy=pad + row*rowY + r;
    maxX=Math.max(maxX,cx+W/2); maxY=Math.max(maxY,cy+r);
    var pts=[];
    for(var i=0;i<6;i++){var a=Math.PI/180*(60*i-90);pts.push((cx+r*Math.cos(a)).toFixed(1)+','+(cy+r*Math.sin(a)).toFixed(1));}
    var v=tiers[ab]; if(v===undefined) v=-1;
    var fill=v<0?FILL[0]:FILL[v];
    var tcol=v>=3?'#0E1A30':(v<0?'rgba(246,234,208,.4)':'rgba(246,234,208,.9)');
    cells+='<polygon class="hex" points="'+pts.join(' ')+'" fill="'+fill+'" data-ab="'+ab+'" data-v="'+v+'"></polygon>'+
           '<text class="hex-l" x="'+cx.toFixed(1)+'" y="'+cy.toFixed(1)+'" style="fill:'+tcol+'">'+ab+'</text>';
  }
  svg.setAttribute('viewBox','0 0 '+(maxX+pad).toFixed(0)+' '+(maxY+pad).toFixed(0));
  svg.innerHTML=cells;
  svg.querySelectorAll('.hex').forEach(function(h){
    h.addEventListener('mouseenter',function(){
      var ab=h.dataset.ab,v=+h.dataset.v;
      var word=metric==='participation'?'participation':(metric==='donors'?'donors':'giving');
      var lvl=['no gifts yet','low','moderate','strong','very high'][v<0?0:v];
      $('hexTip').innerHTML = v<0? '<b>'+ab+'</b> — no gifts yet' : '<b>'+ab+'</b> — '+lvl+' '+word;
    });
    h.addEventListener('click',function(){ $('hexTip').innerHTML='<b>'+h.dataset.ab+'</b> focused — in the full product this drills into that state’s chapters & donors.'; });
  });
}

function metricVal(row){ return metric==='dollars'?row[1]:metric==='participation'?row[2]:row[3]; }
function metricFmt(v){ return metric==='dollars'?moneyK(v):metric==='participation'?v+'%':v.toLocaleString(); }

function render(){
  var d=DATA[scope];
  $('pTitle').textContent=d.title; $('pSub').innerHTML=d.sub; $('pEyebrow').textContent=d.eyebrow; $('pDays').textContent=d.days;
  $('pRaised').textContent=money(d.raised); $('pGoal').textContent=money(d.goal);
  var pct=Math.round(d.raised/d.goal*100);
  $('pPct').textContent=pct+'%'; $('pToGo').textContent=money(d.goal-d.raised);
  setTimeout(function(){$('pThermo').style.width=pct+'%';},60);

  var kp=[['donors',d.donors.toLocaleString(),'Donors'],['participation',d.participation+'%','Participation'],['dollars',money(d.avg),'Avg gift'],['',moneyK(d.matched),'Matched']];
  $('kpis').innerHTML=kp.map(function(k){return '<div class="kpi'+(k[0]&&k[0]===metric?' hot':'')+'"><div class="n">'+k[1]+'</div><div class="l">'+k[2]+'</div></div>';}).join('');

  $('hexMetricTag').textContent = metric==='participation'?'Participation':metric==='donors'?'Donors':'Dollars';
  renderHex();

  var maxS=Math.max.apply(null,d.societies.map(function(s){return s[2];}))||1;
  $('ladder').innerHTML=d.societies.map(function(s){return '<div class="lad"><div class="lad-name"><b>'+s[0]+'</b><span>'+s[1]+'</span></div><div class="lad-bar"><i style="width:'+Math.max(3,s[2]/maxS*100)+'%"></i></div><div class="lad-n">'+s[2]+'</div></div>';}).join('');

  function board(elId,rows){
    var max=Math.max.apply(null,rows.map(metricVal))||1;
    $(elId).innerHTML=rows.map(function(r){return '<div class="brow"><div class="brow-k">'+r[0]+'</div><div class="brow-bar"><i style="width:'+Math.max(4,metricVal(r)/max*100)+'%"></i></div><div class="brow-v">'+metricFmt(metricVal(r))+'</div></div>';}).join('');
  }
  board('boardClasses',d.classes); board('boardChapters',d.chapters);

  $('gifts').innerHTML=d.gifts.map(function(g){
    var nm=g[0]||'Anonymous';
    var init=g[0]? g[0].replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).map(function(x){return x[0];}).slice(0,2).join(''):'A';
    return '<div class="gift"><div class="gift-av">'+init+'</div><div class="gift-who">'+nm+'<span>'+g[1]+'</span></div><div><div class="gift-amt">'+money(g[2])+'</div>'+(g[3]?'<span class="gift-band">'+g[3]+'</span>':'')+'</div></div>';
  }).join('');

  $('matchTitle').textContent=money(d.matchGoal)+' match unlocked';
  $('matchDone').textContent=money(d.matched); $('matchLeft').textContent=money(d.matchGoal-d.matched)+' left';
  setTimeout(function(){$('matchBar').style.width=Math.min(100,Math.round(d.matched/d.matchGoal*100))+'%';},60);

  drawSpark(d.spark);

  $('ledger').innerHTML=d.ledger.map(function(l){return '<div class="lr"><span class="lr-k">'+l[0]+'</span><span class="lr-v '+l[2]+'">'+(l[1]<0?'−'+money(-l[1]):money(l[1]))+'</span></div>';}).join('');
  $('healthStats').innerHTML=d.health.map(function(h){return '<div class="statcard"><div class="n">'+h[0]+'</div><div class="l">'+h[1]+'</div></div>';}).join('');
  $('donorRows').innerHTML=d.donorList.map(function(x){return '<tr><td>'+x[0]+'</td><td>'+x[1]+'</td><td>'+x[2]+'</td><td class="r">'+money(x[3])+'</td><td class="soc">'+x[4]+'</td><td class="r">'+(x[5]?money(x[5]):'—')+'</td><td><span class="badge '+x[6]+'">'+(x[6]==='cur'?'Current':'Lapsed')+'</span></td></tr>';}).join('');
}

function drawSpark(pts){
  var w=700,h=120,n=pts.length, x=function(i){return i*(w/(n-1));}, y=function(p){return h-8-(p/90)*(h-22);};
  var d='M'+x(0)+','+y(pts[0]); pts.forEach(function(p,i){if(i)d+=' L'+x(i).toFixed(1)+','+y(p).toFixed(1);});
  $('sparkLine').setAttribute('d',d); $('sparkArea').setAttribute('d',d+' L'+w+','+h+' L0,'+h+' Z');
}

$('fScope').addEventListener('change',function(e){scope=e.target.value;render();});
$('fPeriod').addEventListener('change',render);
document.querySelectorAll('#metricSeg button').forEach(function(b){b.addEventListener('click',function(){
  document.querySelectorAll('#metricSeg button').forEach(function(x){x.classList.remove('on');});
  b.classList.add('on'); metric=b.dataset.m; render();
});});
function setMode(admin){
  document.body.classList.toggle('admin',admin);
  $('vAdmin').classList.toggle('on',admin); $('vPublic').classList.toggle('on',!admin);
  $('fExport').style.display=admin?'inline-block':'none';
  $('modeNote').innerHTML=admin?'Admin view — full detail: ledger, donor records (PII), lapsed/LYBUNT, and export.':'Public view — the shareable infographic a chapter posts to rally alumni.';
  render();
}
$('vAdmin').addEventListener('click',function(){setMode(true);});
$('vPublic').addEventListener('click',function(){setMode(false);});
$('fExport').addEventListener('click',function(){alert('Demo: in the product this exports the filtered donor & gift data to CSV.');});

render();
})();
