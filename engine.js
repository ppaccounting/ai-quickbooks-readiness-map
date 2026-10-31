export const stages = [
 {title:'Can You Trust Your Numbers?',intro:'Before you make things faster, let’s make sure the numbers are right.'},
 {title:'Where Is Your Time Going?',intro:'Which parts of keeping up with your books are taking too much time?'},
 {title:'Are You Staying in the Know?',intro:'Do you know what your numbers are telling you?'},
 {title:'Who\'s Making Sure It\'s Right?',intro:'Who checks your books and helps when something is confusing?'},
 {title:'Let\'s Make This Manageable',intro:'What would help you spend 30 useful minutes with your numbers each week?'}
];
const q=(id,stage,label,options,multi=false)=>({id,stage,label,options,multi});
export const questions=[
 q('q1',0,'When you open QuickBooks, how sure are you that the information is correct and nothing important is missing?', ['Very sure; my records get checked regularly','Somewhat sure; I haven’t checked everything','Not very sure; there are things I still need to figure out','I’m not sure how to tell']),
 q('q2',0,'When QuickBooks suggests where to put an expense, what do you usually do?',['I check what the purchase was for before I accept it','Some get accepted automatically without me checking each one','I usually accept the suggestion to get it done','I’m not sure what happens to those suggestions']),
 q('q3',0,'When was the last time someone checked your bank and credit card statements against what QuickBooks recorded, to make sure they match?',['Within the last month','About two or three months ago','More than three months ago','I don’t know']),
 q('q4',1,'Think about a typical week. How much time do you spend entering, checking, sorting, or fixing things in QuickBooks?',['Less than 30 minutes','About 30 minutes to an hour','About 1–3 hours','More than 3 hours','I’m not doing this regularly, so I really don’t know']),
 q('q5',1,'Which of these bookkeeping activities takes up the most time or causes the most headaches? Choose up to two.',['Going through expenses and deciding where they belong','Making sure customer payments are recorded correctly','Finding and organizing receipts','Keeping up with unpaid invoices or bills','Finding and correcting mistakes','Figuring out what needs my attention'],true),
 q('q6',1,'When you see something in QuickBooks that doesn’t look right, what usually happens?',['I have a regular way of checking it and getting it corrected','I look into it whenever I happen to notice it','My bookkeeper or accountant handles it, but I don’t always know the outcome','I usually leave it alone because I’m not sure what to do','I don’t know']),
 q('q7',2,'How often do you sit down and look at how your business is doing financially, beyond just checking your bank balance?',['Weekly','Monthly','Only when something worries me','Mostly when it’s time for taxes','Rarely']),
 q('q8',2,'Which of these questions about your business finances is hardest for you to answer?',['How much profit am I making?','How much of the money in my account is already spoken for?','How much can I safely pay myself?','Why did expenses change?','What needs my attention?']),
 q('q9',2,'If you noticed three things in QuickBooks that didn’t look right, what would you do?',['Check them and fix what I understand','Ask for help and follow up until they’re answered','Leave them for someone else without checking back','I wouldn’t know where to start']),
 q('q10',3,'Who makes sure your QuickBooks records are checked, corrected when needed, and up to date each month?',['My bookkeeper or accountant','I do, using steps I follow each month','We share the work, and we each know our part','I’m not sure who is responsible','No one does this consistently']),
 q('q11',3,'When you’re unsure how to record something in QuickBooks, what do you usually do?',['I ask my bookkeeper or accountant and make sure it gets answered','I look it up and try to figure it out myself','I put it aside and come back to it later','I make my best guess','I don’t know whom to ask']),
 q('q12',3,'How do you know the financial information in QuickBooks is accurate enough to make business decisions?',['My bookkeeper or accountant checks everything and lets me know it’s ready','I follow a set of steps to check that everything is correct','If all the transactions are entered, I assume the information is correct','I’m not really sure how to tell']),
 q('q13',4,'What’s the biggest thing stopping you from spending 30 minutes each week checking on your business finances?',['I have trouble finding the time','I don’t know what to review','I’m not sure I can trust my numbers','There are too many things I haven’t sorted out','Nothing; I’m ready to start']),
 q('q14',4,'Imagine spending 30 minutes each week staying on top of your business finances. Which of these would you want the most help with?',['Knowing what to look at when I open QuickBooks','Knowing whether QuickBooks has recorded things correctly','Understanding what my numbers are telling me','Figuring out what to do next','Getting everything organized so a weekly check-in is possible']),
 q('q15',4,'If you could make one thing about managing your business finances easier in the next 30 days, what would it be?',['Knowing my numbers are right','Spending less time on bookkeeping','Understanding my numbers better','Knowing what to check each week','Having someone I can ask for help'])
];
const recs={
 foundation:{id:'foundation',area:0,title:'Make sure your numbers are right before you automate more',why:'Making the work faster won’t help if the information in QuickBooks isn’t right to begin with.',first:'Find out when someone last checked each bank and credit card statement against QuickBooks.',steps:['Write down each business bank and credit card account, and when it was last checked against QuickBooks.','Make a list of any missing months, unfamiliar charges, or numbers that don’t match.','If you’re behind or the numbers don’t match, ask a bookkeeper or accountant for help sorting them out.']},
 approvals:{id:'approvals',area:1,title:'Make sure someone checks what QuickBooks suggests',why:'QuickBooks may suggest where an expense belongs, but you still need to know whether the suggestion makes sense.',first:'Find out which QuickBooks suggestions are being accepted without someone checking them.',steps:['Look for expenses that were recorded automatically without being checked.','Decide which expenses you can easily confirm and which ones need a closer look.','Keep one simple list of questions until each one gets an answer.']},
 exceptions:{id:'exceptions',area:1,title:'Give unanswered bookkeeping questions a place to go',why:'If something looks wrong and nobody follows up, the problem doesn’t go away.',first:'Write down any charge, payment, or QuickBooks entry that doesn’t make sense.',steps:['For each question, write down who will look into it and what happens next.','Choose a day to check back and make sure the question was answered.','If you’re unsure how something should be recorded, ask a bookkeeper or accountant.']},
 accountability:{id:'accountability',area:2,title:'Decide who checks your books each month',why:'It’s hard to trust your numbers when nobody is responsible for checking them.',first:'Decide who will check that your records match your accounts and that questions are answered each month.',steps:['Write down who does the checking and who gives the final review.','Agree on who to contact when something doesn’t look right.','Make sure someone tells you when the monthly numbers have been checked and are ready to use.']},
 review:{id:'review',area:3,title:'Make time to check on your business each week',why:'Money in the bank doesn’t tell you how much is already needed for bills, taxes, or other commitments.',first:'Choose a day and time each week to spend 30 minutes with your numbers.',steps:['Spend five minutes looking for anything surprising or unfinished.','Only accept QuickBooks suggestions you understand; make a note of anything you don’t.','Finish by writing down one thing you need to do next.']},
 automation:{id:'automation',area:4,title:'Make one bookkeeping task easier',why:'Start with the task that eats up your time, but keep someone checking the results.',first:'Pick one bookkeeping task that takes too much time and write down how you do it now.',steps:['See if QuickBooks already has a feature that can make that task easier.','Decide what a person still needs to check before anything is accepted.','Only consider another tool if QuickBooks doesn’t already solve the problem.']},
 routine:{id:'routine',area:5,title:'Start your 30-minute weekly money check-in',why:'Your tools should help you keep up with your business, not leave you guessing.',first:'Pick a weekly time: look at what happened (5 minutes), check what was recorded (10), understand your numbers (10), and choose one action (5).',steps:['Look at recent money coming in and going out, and any questions that need answers.','Check QuickBooks suggestions and ask about anything you don’t understand.','Notice one change in your numbers and write down one next step.']}
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
 if(v('q4')===4)add(signals,'review','watch','q4');
 add(signals,'automation','opportunity','q5');
 add(signals,'routine','opportunity','q14');
 const grouped=new Map();for(const s of signals){const old=grouped.get(s.id);if(!old||severity[s.level]>severity[old.level])grouped.set(s.id,s)}
 const ranked=[...grouped.values()].sort((a,b)=>severity[b.level]-severity[a.level]||recs[a.id].area-recs[b.id].area);
 const primary=ranked[0]?.id||'routine';const support=ranked.filter(x=>x.id!==primary&&x.id!=='routine').slice(0,2).map(x=>x.id);
 const taskNames=questions.find(x=>x.id==='q5').options;const selected=answers.q5.map(Number).map(n=>taskNames[n]);
 const focusNames=['how much your business brought in, spent, and kept','what you need to pay soon and how much money is truly available','how much you can pay yourself after bills, taxes, and savings','which expenses went up or down and why','unanswered questions and what needs your attention'];
 const barrierNames=['set aside 30 minutes on your calendar','follow a simple list of things to check','check that your bookkeeping information is correct','keep catch-up work separate from your weekly check-in','try your first weekly check-in'];
 const fitIssue=fit.platform!=='qbo'||fit.complexity==='complex';
 const caution=fitIssue?'Your business may need a more tailored setup than this QuickBooks Online guide covers. A conversation with a professional can help you decide what fits.':null;
 const weeks=[recs[primary].steps[0],recs[primary].steps[1],recs[support[0]||'automation'].first,recs.review.first];
 return {version:'1.1',createdAt:new Date().toISOString(),primary:{...recs[primary],level:grouped.get(primary)?.level||'opportunity'},support:support.map(id=>({...recs[id],level:grouped.get(id).level})),automationOpportunity:selected,financialFocus:focusNames[v('q8')],routineBarrier:barrierNames[v('q13')],routineSupport:questions.find(x=>x.id==='q14').options[v('q14')],goal:questions.find(x=>x.id==='q15').options[v('q15')],weeks,caution,fit,signals:ranked,disclaimer:'This plan is based on the answers you provided. It helps you plan your next steps, but it does not check your actual books or replace professional accounting or tax advice.'};
}
