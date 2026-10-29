export const stages = [
 {title:'Clean foundation',intro:'Before you speed up the work, can you trust the information?'},
 {title:'Automation setup',intro:'Where is time being lost, and what happens when technology gets stuck?'},
 {title:'Owner review',intro:'Does the owner have enough visibility to lead?'},
 {title:'Professional review',intro:'Who catches what needs accounting judgment?'},
 {title:'30-minute routine',intro:'What would make a weekly financial check-in sustainable?'}
];
const q=(id,stage,label,options,multi=false)=>({id,stage,label,options,multi});
export const questions=[
 q('q1',0,'When you open QuickBooks, how confident are you that transactions reflect what actually happened?', ['Very confident; reviewed and reconciled regularly','Somewhat confident; not everything has been verified','Not very confident; there are unresolved questions','I do not know how to tell']),
 q('q2',0,'When QuickBooks suggests a category for a transaction, what usually happens?',['I verify the business purpose before approving','Some suggestions are accepted automatically','I usually accept suggestions to keep moving','I am not sure how suggestions are handled']),
 q('q3',0,'When were all business bank and credit card accounts last reconciled?',['Within the past month','Two to three months ago','More than three months ago','I do not know']),
 q('q4',1,'How much time goes toward repetitive bookkeeping tasks in a typical week?',['Less than 30 minutes','30 to 60 minutes','One to three hours','More than three hours','I do not track it']),
 q('q5',1,'Which repetitive tasks create the most friction? Choose up to two.',['Categorizing transactions','Matching deposits and payments','Collecting receipts','Following up on invoices or bills','Checking errors and duplicates','Figuring out what needs my attention'],true),
 q('q6',1,'What happens when a transaction looks unusual or does not fit the usual pattern?',['It enters a clear review process','I investigate when I notice it','A professional handles it, but I may not track it','It often sits unresolved','I do not know']),
 q('q7',2,'How often do you review financial information beyond your bank balance?',['Weekly','Monthly','Only when something concerns me','Mostly around tax time','Rarely']),
 q('q8',2,'Which question is hardest to answer confidently?',['How much profit am I making?','What cash is already committed?','How much can I safely pay myself?','Why did expenses change?','What needs my attention?']),
 q('q9',2,'If three unusual transactions were flagged today, what would you do?',['Review and resolve what I can','Ask questions and track the follow-up','Leave them with someone else without tracking them','I would not know where to begin']),
 q('q10',3,'Who makes sure accounts are reconciled and monthly bookkeeping is complete?',['A bookkeeping or accounting professional','I do, using a defined process','We share clearly defined responsibilities','It is unclear','Nobody consistently']),
 q('q11',3,'What happens when you face a bookkeeping question you cannot answer?',['I send it to a professional and track resolution','I research it and try to fix it','I set it aside','I make my best guess','I do not know whom to ask']),
 q('q12',3,'How do you know when your financial reports are ready to rely on?',['A professional completes a month-end review','I follow and verify month-end close steps','I assume they are ready when transactions are categorized','I do not really know']),
 q('q13',4,'What most often prevents a focused 30-minute weekly financial check-in?',['I cannot find the time','I do not know what to review','I do not trust the numbers','Too many unresolved items','Nothing; I am ready to start']),
 q('q14',4,'Which part of the routine would benefit most from support?',['Review','Approve','Understand','Act','Getting the underlying workflow working first']),
 q('q15',4,'What one change would make the biggest difference in the next 30 days?',['Trustworthy books','Less manual work','Clearer financial information','An organized review process','Reliable professional support'])
];
const recs={
 foundation:{id:'foundation',area:0,title:'Verify your bookkeeping foundation',why:'Automated summaries can only be as reliable as the records supporting them.',first:'Confirm the last reconciliation date for every business bank and credit card account.',steps:['List accounts and the last reconciled month for each.','Identify unresolved transactions, differences, or missing periods.','Ask a qualified professional for help if the backlog or discrepancies are beyond your skill or time.']},
 approvals:{id:'approvals',area:1,title:'Put an approval safeguard in place',why:'A suggested category is not proof that the business purpose or treatment is correct.',first:'Review how suggestions and rules are approved in QuickBooks.',steps:['Identify any transactions accepted without your review.','Specify which categories and exceptions need confirmation.','Keep an unresolved-items list until issues are answered.']},
 exceptions:{id:'exceptions',area:1,title:'Build an exception follow-up process',why:'A flag that no one follows up on is still an unresolved problem.',first:'Create a short list of unusual or unanswered transactions.',steps:['Record the issue, owner, and next action.','Set a date to check whether it was resolved.','Route complex treatment questions to your accounting professional.']},
 accountability:{id:'accountability',area:2,title:'Name who owns the month-end close',why:'Financial reports are difficult to rely on when no one knows who verifies completeness.',first:'Decide who will confirm accounts have been reconciled and issues addressed each month.',steps:['Document who reconciles and who reviews.','Agree on how questions are escalated.','Confirm when monthly financial reports are ready to use.']},
 review:{id:'review',area:3,title:'Create a weekly owner review habit',why:'A bank balance by itself cannot tell you whether the business has room to make decisions.',first:'Choose one recurring 30-minute appointment for your financial check-in.',steps:['Spend five minutes identifying activity that needs attention.','Review and approve only what you understand.','End by recording one next action.']},
 automation:{id:'automation',area:4,title:'Improve one repetitive workflow',why:'The best next automation is the one that solves a real recurring problem without bypassing safeguards.',first:'Choose the bookkeeping task you repeat most often and document how it works today.',steps:['Check what your QuickBooks plan already supports.','Identify the human approval or exception checkpoint.','Evaluate additional automation only if a meaningful gap remains.']},
 routine:{id:'routine',area:5,title:'Start your 30-minute Financial CEO routine',why:'A reliable system should make it easier to stay informed, not remove you from decisions.',first:'Reserve a weekly time for Review (5), Approve (10), Understand (10), and Act (5).',steps:['Review current activity and exceptions.','Approve or question suggested entries.','Understand one financial pattern and record one action.']}
};
const severity={critical:3,watch:2,opportunity:1,ready:0};
function add(signals,id,level,source){signals.push({id,level,source})}
export function evaluate(answers,fit={}){
 for(const item of questions){const val=answers[item.id];if(item.multi?(!Array.isArray(val)||val.length<1||val.length>2):(val===undefined||val===null||val===''))throw new Error('Please complete all 15 questions.');}
 const v=(id)=>Number(answers[id]);const signals=[];
 if(v('q1')>0)add(signals,'foundation',v('q1')>=2?'critical':'watch','q1');
 if(v('q3')>0)add(signals,'foundation',v('q3')>=2?'critical':'watch','q3');
 if(v('q2')>0)add(signals,'approvals',v('q2')===2?'critical':'watch','q2');
 if(v('q6')>0)add(signals,'exceptions',v('q6')===3?'critical':'watch','q6');
 if(v('q9')>=2)add(signals,'exceptions','watch','q9');
 if(v('q10')>=3)add(signals,'accountability','critical','q10');
 if(v('q11')>=2)add(signals,'accountability',[2,3].includes(v('q11'))?'critical':'watch','q11');
 if(v('q12')>=2)add(signals,'accountability',v('q12')===2?'critical':'watch','q12');
 if(v('q7')>=2)add(signals,'review','watch','q7');
 if(v('q13')!==4)add(signals,v('q13')===2?'foundation':'review',v('q13')===2?'critical':'watch','q13');
 if(v('q4')>=2&&v('q4')<=3)add(signals,'automation','watch','q4');
 add(signals,'automation','opportunity','q5');
 add(signals,'routine','opportunity','q14');
 const grouped=new Map();for(const s of signals){const old=grouped.get(s.id);if(!old||severity[s.level]>severity[old.level])grouped.set(s.id,s)}
 const ranked=[...grouped.values()].sort((a,b)=>severity[b.level]-severity[a.level]||recs[a.id].area-recs[b.id].area);
 const primary=ranked[0]?.id||'routine';const support=ranked.filter(x=>x.id!==primary&&x.id!=='routine').slice(0,2).map(x=>x.id);
 const taskNames=questions.find(x=>x.id==='q5').options;const selected=answers.q5.map(Number).map(n=>taskNames[n]);
 const focusNames=['profit trends (revenue less expenses)','upcoming obligations and usable cash','owner-pay planning after obligations and reserves','changes in expense categories','open exceptions and financial priorities'];
 const barrierNames=['protect 30 minutes on the calendar','use a clear checklist','verify the bookkeeping foundation','separate backlog work from weekly oversight','start the routine this week'];
 const fitIssue=fit.platform!=='qbo'||fit.complexity==='complex';
 const caution=fitIssue?'Your setup may need individual evaluation before using a QuickBooks Online-focused AI implementation pathway. This roadmap is educational, not a determination of service fit.':null;
 const weeks=[recs[primary].steps[0],recs[primary].steps[1],recs[support[0]||'automation'].first,recs.review.first];
 return {version:'1.0',createdAt:new Date().toISOString(),primary:{...recs[primary],level:grouped.get(primary)?.level||'opportunity'},support:support.map(id=>({...recs[id],level:grouped.get(id).level})),automationOpportunity:selected,financialFocus:focusNames[v('q8')],routineBarrier:barrierNames[v('q13')],routineSupport:questions.find(x=>x.id==='q14').options[v('q14')],goal:questions.find(x=>x.id==='q15').options[v('q15')],weeks,caution,fit,signals:ranked,disclaimer:'This educational roadmap is based on self-reported answers; it is not an audit, a guarantee of automation performance, or individualized accounting or tax advice.'};
}
