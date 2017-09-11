/* ============================================================
 * node.checkr
 * https://github.com/franciscofsales/node-checkr
 *
 * ============================================================
 * Copyright 2014-2017, Francisco Sales
 * Released under the MIT License
 * ============================================================ */
import Dotenv from 'dotenv';
const dotenv = Dotenv.config();
import Checkr from '../src';

const key = process.env.API_KEY;
const checkr = new Checkr(key);

checkr.Candidates
  .createCandidate({
    first_name: 'Francisco',
    last_name: 'Sales',
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
