import {onRequest} from 'firebase-functions/v2/https';
import {initializeApp} from 'firebase-admin/app';
import {getFirestore, FieldValue} from 'firebase-admin/firestore';
import {defineSecret} from 'firebase-functions/params';
import {evaluate,questions} from './engine.js';
initializeApp();
const turnstileSecret=defineSecret('TURNSTILE_SECRET');
const allowedHosts=new Set([
  'aiqbomap.profitablepenny.com',
  'be2fe016-ai-quickbooks-readiness-map.profitablepenny.workers.dev',
  'firebase-migration-2026-11-17-ai-quickbooks-readiness-map.profitablepenny.workers.dev'
]);
const origins=new Set([...allowedHosts].map(host=>'https://'+host));
export const readinessRoadmap=onRequest({region:'us-east1',secrets:[turnstileSecret],maxInstances:10,timeoutSeconds:30},async(req,res)=>{
 const origin=req.get('origin');
 if(origin&&origins.has(origin))res.set('Access-Control-Allow-Origin',origin);
 res.set('Vary','Origin');res.set('Access-Control-Allow-Methods','POST, OPTIONS');res.set('Access-Control-Allow-Headers','Content-Type');res.set('Cache-Control','no-store');
 if(req.method==='OPTIONS')return res.status(204).send('');
 const fail=(code,error)=>res.status(code).json({success:false,error});
 if(req.method!=='POST')return fail(405,'Method not allowed');
 if(!origin||!origins.has(origin))return fail(403,'Origin not allowed');
 const {answers,fit,turnstileToken}=req.body||{};
 if(typeof turnstileToken!=='string'||turnstileToken.length<10||turnstileToken.length>2048)return fail(400,'Verification required');
 if(!answers||typeof answers!=='object'||Array.isArray(answers)||!fit||typeof fit!=='object')return fail(400,'Invalid answers');
 for(const q of questions){const v=answers[q.id];if(q.multi){if(!Array.isArray(v)||v.length<1||v.length>2||new Set(v).size!==v.length||v.some(x=>!Number.isInteger(x)||x<0||x>=q.options.length))return fail(400,'Invalid answers');}else if(!Number.isInteger(v)||v<0||v>=q.options.length)return fail(400,'Invalid answers');}
 if(Object.keys(answers).length!==questions.length)return fail(400,'Invalid answers');
 if(!['qbo','desktop','other','none'].includes(fit.platform)||!['simple','complex','unsure'].includes(fit.complexity))return fail(400,'Invalid business fit');
 try{
 const body=new URLSearchParams({secret:turnstileSecret.value(),response:turnstileToken,remoteip:req.ip||''});
 const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body,signal:AbortSignal.timeout(8000)});
 if(!check.ok)throw Error('Turnstile unavailable');
 const verified=await check.json();
 if(!verified.success||!allowedHosts.has(verified.hostname))return fail(403,'Verification failed; please try again');
 const roadmap=evaluate(answers,fit);
 await getFirestore().collection('readiness_submissions').add({createdAt:FieldValue.serverTimestamp(),ruleVersion:roadmap.version,answers,fit,roadmap,source:'creator-pivot-summit'});
 return res.status(200).json({success:true,roadmap});
} catch(e){
  console.error('Roadmap backend failure', {
    message: e?.message,
    cause: e?.cause?.message,
    code: e?.cause?.code
  });
  return fail(503,'The roadmap service is temporarily unavailable');
}
});
