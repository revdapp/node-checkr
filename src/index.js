/* ============================================================
 * node.checkr
 * https://github.com/franciscofsales/node-checkr
 *
 * ============================================================
 * Copyright 2014-2017, Francisco Sales
 * Released under the MIT License
 * ============================================================ */

import candidates from './candidates';
import reports from './reports';
import packages from './packages';

class NodeCheckr {
  constructor(API_KEY) {
    if (API_KEY === null || API_KEY === undefined) {
      console.error('Invalid or missing API_KEY');
      return false;
    }
    this.options = {
      baseUrl: 'https://api.checkr.com',
      apiVersion: 'v1',
      apiKey: API_KEY,
      verbose: false
    };
    this.Candidates = candidates(this.options);
    this.Reports = reports(this.options);
    this.Packages = packages(this.options);
  }


}

module.exports = NodeCheckr;
