/* ============================================================
 * node.checkr
 * https://github.com/franciscofsales/node-checkr
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
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/reports`,
            auth: {
              username: options.apiKey,
              password: ''
            }
          });
          return res.data;
        } catch (error) {
          handleError(error);
        }
      } else {
        throw new Error('Invalid ID');
        return;
      }
    },
    create: async (pckage, id) => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(pckage) && alphaRegex.test(id)) {
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
          handleError(error);
        }
      } else {
        throw new Error('Invalid ID or package');
        return;
      }
    },
    update: async (id, params) => {
      const schema = Joi.object().keys({
        package: Joi.string().alphanum(),
        adjudication: Joi.string().alphanum()
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
        handleError(error);
      }
    }
  };
};

export default reports;
