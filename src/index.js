/* ============================================================
 * node.checkr
 * https://github.com/revdapp/node-checkr
 *
 * ============================================================
 * Copyright 2014-2017, Francisco Sales
 * Released under the MIT License
 * ============================================================ */

import accounts from './accounts';
import candidates from './candidates';
import reports from './reports';
import packages from './packages';
import screenings from './screenings';
import webhooks from './webhooks';
import counties from './counties';
import invitations from './invitations';

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
    this.Accounts = accounts(this.options);
    this.Candidates = candidates(this.options);
    this.Invitations = invitations(this.options);
    this.Reports  = reports(this.options);
    this.Packages = packages(this.options);
    this.Screenings = screenings(this.options);
    this.Webhooks = webhooks(this.options);
    this.Counties = counties(this.options);
  }

}

module.exports = NodeCheckr;
