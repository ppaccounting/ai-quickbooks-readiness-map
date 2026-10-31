import {stages,questions} from './engine.js';
const ENDPOINT = 'https://jjbopanghnvdjhkjruhx.supabase.co/functions/v1/swift-api';
const SITE_KEY = '0x4AAAAAAFtZ_2OSB5mxmsWW';
// Legacy anon JWT is a public client credential, not a secret. Paste your project's legacy anon key below.
const LEGACY_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYm9wYW5naG52ZGpoa2pydWh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzMjQ4MTYsImV4cCI6MjEwODkwMDgxNn0.IAc_yaU1L4YB-C6ybLBbz7YXJVC-glbWyLz1RIkSihs';
let turnstileId = null;
let turnstileToken = '';
let sending = false;
const $=id=>document.getElementById(id);const state={step:-1,answers:{},fit:{platform:'qbo',complexity:'simple'}};const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
function draw(){let step=state.step;const answered=questions.filter(q=>q.multi?state.answers[q.id]?.length:state.answers[q.id]!==undefined).length;$('progressText').textContent=`${answered} of 15 answered`;$('barFill').style.width=`${answered/15*100}%`;$('stageLabel').textContent=step<0?'Before we begin':step===5?'Protecting your results':`Stage ${step+1} of 5`;
 if(step===-1){$('content').innerHTML=`<h2>Let's find your next step.</h2><p class="sub">This is a practical roadmap, not a bookkeeping audit. You won't be asked for bank information or access to QuickBooks.</p><label class="field">Which accounting system do you use?<select id="platform"><option value="qbo">QuickBooks Online</option><option value="desktop">QuickBooks Desktop</option><option value="other">Another platform</option><option value="none">No accounting system yet</option></select></label><label class="field">Does your business require complex inventory accounting, job costing, or multiple legal entities?<select id="complexity"><option value="simple">No / mostly straightforward service income</option><option value="complex">Yes / I may need specialized accounting workflows</option><option value="unsure">I'm not sure</option></select></label>`; $('platform').value=state.fit.platform;$('complexity').value=state.fit.complexity}
 else if(step===5){$('content').innerHTML=`<h2>One last step</h2><p class="sub">We'll securely verify your request before saving your answers and preparing your personalized roadmap. No bank access or financial statements are needed.</p><div id="turnstile-box"></div><p class="muted">Your results appear here after verification. We do not collect your email address at this step.</p>`; setTimeout(renderTurnstile,0);}
 else{const stage=stages[step];$('content').innerHTML=`<h2>${escape(stage.title)}</h2><p class="sub">${escape(stage.intro)}</p>`+questions.filter(q=>q.stage===step).map((q,idx)=>`<div class="question"><p>${q.id.slice(1)}. ${escape(q.label)}</p>${q.options.map((opt,i)=>`<label class="option"><input type="${q.multi?'checkbox':'radio'}" name="${q.id}" value="${i}" ${q.multi?(state.answers[q.id]||[]).includes(i)?'checked':'':state.answers[q.id]===i?'checked':''}>${escape(opt)}</label>`).join('')}</div>`).join('');}
 $('back').style.visibility=step<0?'hidden':'visible';$('next').textContent=step===5?'Get my personalized roadmap →':step===4?'Continue to secure results →':'Continue →';$('error').textContent='';}
$('content').addEventListener('change',e=>{let t=e.target;if(t.id==='platform'||t.id==='complexity'){state.fit[t.id]=t.value;return;}if(!t.name.startsWith('q'))return;const q=questions.find(x=>x.id===t.name);if(q.multi){const v=new Set(state.answers[q.id]||[]);if(t.checked)v.add(Number(t.value));else v.delete(Number(t.value));if(v.size>2){t.checked=false;v.delete(Number(t.value));$('error').textContent='Please select no more than two.';}else $('error').textContent='';state.answers[q.id]=[...v];}else state.answers[q.id]=Number(t.value);draw();});
$('back').onclick=()=>{state.step=Math.max(-1,state.step-1);draw()};$('next').onclick=()=>{if(state.step>=0){const missing=questions.filter(q=>q.stage===state.step).some(q=>q.multi?!(state.answers[q.id]||[]).length:state.answers[q.id]===undefined);if(missing){$('error').textContent='Please answer all three questions to continue.';return;}}if(state.step===5){submitRoadmap();return;}state.step++;draw();window.scrollTo(0,0)};
function renderTurnstile(){if(state.step!==5)return;if(!window.turnstile){$('error').textContent='Verification is still loading. Refresh the page if it does not appear.';return;}turnstileToken='';turnstileId=window.turnstile.render('#turnstile-box',{sitekey:SITE_KEY,callback:(token)=>{turnstileToken=token;$('error').textContent='';},'expired-callback':()=>{turnstileToken='';},'error-callback':()=>{turnstileToken='';$('error').textContent='Verification could not load. Refresh and try again.';}});}
async function submitRoadmap(){if(sending)return;if(LEGACY_ANON_KEY.startsWith('REPLACE_')){$('error').textContent='Application setup is incomplete. The site administrator must add the public Supabase anon key.';return;}if(!turnstileToken){$('error').textContent='Complete the verification above first.';return;}sending=true;$('next').disabled=true;$('next').textContent='Preparing your roadmap…';$('error').textContent='';try{const response=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','apikey':LEGACY_ANON_KEY,'Authorization':`Bearer ${LEGACY_ANON_KEY}`},body:JSON.stringify({answers:state.answers,fit:state.fit,turnstileToken})});const data=await response.json();if(!response.ok||!data.success||!data.roadmap)throw new Error(data.error||'Unable to prepare your roadmap.');showResult(data.roadmap);}catch(e){$('error').textContent=`${e.message} Please try again.`;turnstileToken='';if(window.turnstile&&turnstileId!==null)window.turnstile.reset(turnstileId);}finally{sending=false;$('next').disabled=false;$('next').textContent='Get my personalized roadmap →';}}
function showResult(r){window.lastRoadmap=r;$('quiz').classList.add('hidden');$('result').classList.remove('hidden');const steps=r.weeks.map((s,i)=>`<li><strong>Week ${i+1}:</strong> ${escape(s)}</li>`).join('');$('result').innerHTML=`<div class="eyebrow">YOUR PERSONALIZED 30-DAY ACTION ROADMAP</div><h2>${escape(r.primary.title)}</h2><p class="lead">${escape(r.primary.why)}</p>${r.caution?`<div class="card"><strong>A note about fit:</strong> ${escape(r.caution)}</div>`:''}<div class="card"><strong>Your first action</strong><p>${escape(r.primary.first)}</p></div><h3>Your next three steps</h3><ol>${r.primary.steps.map(x=>`<li>${escape(x)}</li>`).join('')}</ol><h3>Other priorities worth addressing</h3><ul class="list">${r.support.length?r.support.map(x=>`<li><strong>${escape(x.title)}:</strong> ${escape(x.first)}</li>`).join(''):'<li>Continue maintaining your safeguards while building your weekly habit.</li>'}</ul><h3>Your 30-day roadmap</h3><ol>${steps}</ol><h3>What to automate next</h3><p>You identified: <strong>${escape(r.automationOpportunity.join(' and '))}</strong>. Check your QuickBooks Online features first. Add tools only if they solve a real gap and maintain proper review.</p><h3>Your Financial CEO review focus</h3><p>Pay particular attention to <strong>${escape(r.financialFocus)}</strong>. Your weekly support priority is <strong>${escape(r.routineSupport.toLowerCase())}</strong>.</p><div class="card"><strong>You don't have to figure this out alone.</strong><p>If you read your roadmap and think, “I see what I need to do, but I'm not sure how,” please reach out. I mean that. I want you to feel comfortable asking for help.</p><p><a href="mailto:accounting@profitablepenny.com?subject=Help%20with%20my%20Readiness%20Map">Email Kimberley</a> · <a href="tel:+14049335229">Call 404-933-5229</a> · <a href="https://link.profitablepenny.com/widget/bookings/20-minute-financial-clarity-ch" target="_blank" rel="noopener noreferrer">Book a 20-minute appointment</a></p></div><p class="muted">${escape(r.disclaimer)}</p><div class="result-actions"><button id="pdf">Download My Roadmap (PDF)</button><button id="print" class="outline">Print My Roadmap</button><button id="restart" class="outline">Start again</button></div>`;
 $('print').onclick=()=>window.print();$('pdf').onclick=()=>downloadRoadmapPdf(r);$('restart').onclick=()=>{state.step=-1;state.answers={};$('result').classList.add('hidden');$('quiz').classList.remove('hidden');draw()};window.scrollTo(0,0)}

function downloadRoadmapPdf(r) {
  if (!window.jspdf?.jsPDF) {
    alert('The PDF tool did not load. Please select Print My Roadmap and choose Save as PDF.');
    return;
  }
  const pdf = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter' });
  const left = 48, right = 564, bottom = 737, lineHeight = 15;
  let y = 56, page = 1;
  const green = [35, 82, 66], gray = [70, 74, 76];
  function nextPageIfNeeded(height=18) {
    if (y + height > bottom) { pdf.addPage(); page++; y=56; }
  }
  function paragraph(value, opts={}) {
    const fontSize = opts.size || 10.5;
    pdf.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    pdf.setFontSize(fontSize); pdf.setTextColor(...(opts.color || gray));
    const lines = pdf.splitTextToSize(String(value ?? ''), right-left);
    nextPageIfNeeded(lines.length*lineHeight+8);
    for (const line of lines) { nextPageIfNeeded(); pdf.text(line,left,y); y += lineHeight; }
    y += opts.after === undefined ? 8 : opts.after;
  }
  function heading(s) { nextPageIfNeeded(36); paragraph(s,{bold:true,size:13,color:green,after:5}); }
  function checkbox(s) {
    const lines = pdf.splitTextToSize(String(s),right-left-24);
    nextPageIfNeeded(lines.length*lineHeight+11);
    pdf.setDrawColor(...green); pdf.rect(left,y-8,10,10);
    pdf.setFont('helvetica','normal');pdf.setFontSize(10.5);pdf.setTextColor(...gray);
    for (const line of lines) {pdf.text(line,left+22,y);y+=lineHeight;}
    y+=8;
  }
  paragraph('PROFITABLE PENNY ACCOUNTING', {bold:true,size:11,color:green,after:4});
  paragraph('Your AI + QuickBooks 30-Day Action Roadmap', {bold:true,size:17,color:green,after:15});
  heading(r.primary.title);
  paragraph(r.primary.why);
  if(r.caution)paragraph('A note about fit: '+r.caution);
  heading('Start here');
  checkbox(r.primary.first);
  heading('Your next three steps');
  (r.primary.steps || []).forEach(checkbox);
  heading('Other things to work on');
  if(r.support?.length)r.support.forEach(s=>checkbox(s.title+': '+s.first));
  else paragraph('Keep using your weekly routine to notice what needs attention.');
  heading('Your four-week plan');
  (r.weeks || []).forEach((s,i)=>checkbox('Week '+(i+1)+': '+s));
  heading('What to make easier');
  paragraph('You selected: '+(r.automationOpportunity||[]).join(' and ')+'. Check what QuickBooks can already help with before adding any new technology.');
  heading('What to pay attention to');
  paragraph('Your focus: '+r.financialFocus+'. You would like help with: '+r.routineSupport+'.');
  heading('You can ask for help');
  paragraph('If this feels overwhelming, I really do want you to reach out. You do not have to figure it out alone.');
  paragraph('Email: accounting@profitablepenny.com');
  paragraph('Call: 404-933-5229');
  paragraph('Book: https://link.profitablepenny.com/widget/bookings/20-minute-financial-clarity-ch');
  paragraph(r.disclaimer || 'Educational guidance based on your answers; not an accounting audit.',{size:9,after:4});
  pdf.save('My-30-Day-Financial-Action-Roadmap.pdf');
}

draw();
