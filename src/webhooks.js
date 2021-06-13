/* ============================================================
 * node.checkr
 * https://github.com/revdapp/node-checkr
 *
 * ============================================================
 * Copyright 2021, Drata, Inc
 * Released under the MIT License
 * ============================================================ */

import Joi from 'joi';
import axios from 'axios';
import handleError from './handleError';

const webhooks = options => {
  return {
    create: async params => {
      const schema = Joi.object().keys({
        webhook_url: Joi.string().min(8).required(),
        include_object: true
      });
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }
      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/webhooks`,
          data: params,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        // console.log(res.data);
        return res.data;
      } catch (error) {
        throw { code: error.response.status, data: error.response.data };
      }
    },
    get: async id => {
      id = id.trim();
      const alphaRegex = /^[a-z0-9]+/i;
      if (! alphaRegex.test(id)) {
        // console.log("invalid webhook.id:",id);
        throw new Error(`Invalid webhook ID`);
        return;
      }
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/webhooks/${id}`,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        // console.log(res.data);
        return res.data;
      } catch (error) {
        handleError(error);
      }
    },
    list: async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/webhooks`,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        // console.log(res.data);
        return res.data;
      } catch (error) {
        throw { code: error.response.status, data: error.response.data };
      }
    },
    delete: async id => {
      id = id.trim();
      const alphaRegex = /^[a-z0-9]+/i;
      if (! alphaRegex.test(id)) {
        // console.log("invalid webhook.id:",id);
        throw new Error(`Invalid webhook ID`);
        return;
      }
      try {
          const res = await axios({
            method: 'delete',
            url: `${options.baseUrl}/${options.apiVersion}/webhooks/${id}`,
            auth: {
              username: options.apiKey,
              password: ''
            }
          });
          // console.log(res.data);
          return res.data;
      } catch (error) {
          handleError(error);
      }
    },
  };
};

export default webhooks;

