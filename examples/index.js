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

let candidate_id = null;

checkr.Candidates
  .create({
    first_name: 'Francisco',
    email: 'fsalesdev@gmail.com',
    last_name: 'Sales'
  })
  .then(res => {
    candidate_id = res.id;
    checkr.Candidates
      .update(candidate_id, {
        first_name: 'Francisco',
        email: 'fsales@gmail.com',
        last_name: 'Sales'
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
