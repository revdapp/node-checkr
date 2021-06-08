/* ============================================================
 * node.checkr
 * https://github.com/revdapp/node-checkr
 *
 * ============================================================
 * Copyright 2014-2017, Francisco Sales
 * Released under the MIT License
 * ============================================================ */

import Joi from 'joi';
import axios from 'axios';
import handleError from './handleError';

const reports = options => {
  return {
    retrieve: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (! alphaRegex.test(id)) {
        throw new Error('Invalid report ID');
        return;
      }
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/reports/${id}`,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        return res.data;
      } catch (error) {
        throw { code: error.response.status, data: error.response.data };
      }
    },
    create: async (pckage, id) => {
      const alphaRegex = /^[a-z0-9]+/i;
      if ( ! alphaRegex.test(id)) {
        throw new Error('Invalid candidate ID');
      }
      if ( ! alphaRegex.test(pckage) ) {
        throw new Error('Invalid package ID');
      }
      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/reports`,
          data: {
            candidate_id: id,
            package: pckage
          },
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        return res.data;
      } catch (error) {
        throw { code: error.response.status, data: error.response.data };
      }
    },
    update: async (id, params) => {
      const schema = Joi.object().keys({
        package: Joi.string(),
        adjudication: Joi.string()
      });
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }
      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/reports/${id}`,
          data: params,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        return res.data;
      } catch (error) {
        throw { code: error.response.status, data: error.response.data };
      }
    },
    eta: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (! alphaRegex.test(id)) {
        throw new Error('Invalid report ID');
        return;
      }
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/reports/${id}/eta`,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        return res.data;
      } catch (error) {
        throw { code: error.response.status, data: error.response.data };
      }
    },
  };
};

export default reports;
