import {evaluate,questions} from './engine.js';
const baseline=Object.fromEntries(questions.map(q=>[q.id,q.multi?[0]:0]));
baseline.q13=4;
const cases=[
 ['ready',{},'automation'],
 ['unreconciled',{q3:2},'foundation'],
 ['unapproved',{q2:2},'approvals'],
 ['unresolved',{q6:3},'exceptions'],
 ['unknown monthend',{q10:4},'accountability'],
 ['foundation beats automation',{q3:2,q4:3},'foundation'],
 ['duplicate safeguards',{q2:2,q6:3},'approvals'],
];
for(const [name,changes,expected] of cases){const result=evaluate({...baseline,...changes});if(result.primary.id!==expected)throw Error(`${name}: expected ${expected}, got ${result.primary.id}`);console.log('PASS',name,result.primary.id)}
