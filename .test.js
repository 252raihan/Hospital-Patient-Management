const fs = require('fs');
const code = fs.readFileSync('f:/CPC contest/medicare/script.js', 'utf8');
global.window = { innerWidth: 1200 };
global.document = {
  addEventListener() { },
  getElementById() { return { addEventListener() { }, classList: { toggle() { }, add() { }, remove() { } }, textContent: '' }; },
  querySelectorAll() { return []; },
};
eval(code);
console.log('state.patients:', state.patients.length);
console.log('sample:', JSON.stringify(state.patients[0]));
console.log('departments:', DEPARTMENTS.join(', '));
console.log('statuses:', STATUSES.join(', '));
console.log('priorities:', PRIORITIES.join(', '));
const valid = state.patients.every(p =>
  DEPARTMENTS.includes(p.department) &&
  PRIORITIES.includes(p.priority) &&
  STATUSES.includes(p.status)
);
console.log('all patients valid:', valid);
