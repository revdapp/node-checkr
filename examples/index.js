/* ============================================================
 * node.checkr
 * https://github.com/franciscofsales/node-checkr
 *
 * ============================================================
 * Copyright 2014-2017, Francisco Sales
 * Released under the MIT License
 * ============================================================ */

import Checkr from '../src';

const checkr = new Checkr('test');

checkr.Candidates
  .createCandidate({
    first_name: 'Francisco',
    last_name: 'Sales',
  })
  .then(res => {})
  .catch(err => console.log(err));
