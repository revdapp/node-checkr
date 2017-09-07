import Checkr from '../src';

const checkr = new Checkr('test');

checkr.Candidates
  .createCandidate({
    first_name: 'Francisco',
    last_name: 'Sales',
  })
  .then(res => {})
  .catch(err => console.log(err));
