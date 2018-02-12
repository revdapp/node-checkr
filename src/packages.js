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

const packages = options => {
  return {
    list: async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/packages`,
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
    retrieve: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/packages/${id}`,
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
    create: async params => {
      const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        slug: Joi.string().min(3).required(),
        screenings: Joi.array().required()
      });
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }
      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/packages`,
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
    }
  };
};

export default packages;
