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

const invitations = options => {
  return {
    create: async params => {
      const alphaRegex = /^[a-z0-9]+/i;
      const idRegex = /^[a-zA-Z0-9]{3,30}$/i;
      // const idRegex = new RegExp('^[a-zA-Z0-9]{3,30}$');
      const schema = Joi.object().keys({
        // "package": Joi.string().min(4).pattern(alphaRegex).required(),
        // "package": Joi.string().regex(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        "package": Joi.string().regex(alphaRegex).required(),
        // "candidate_id": Joi.string().regex(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        "candidate_id": Joi.string().regex(alphaRegex).required(),
        "tags": Joi.array().items(Joi.string()),
        "communication_types": Joi.array().items(Joi.string())
      });
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }
      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/invitations`,
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
      try {
        const alphaRegex = /^[a-z0-9]+/i;
        if (! alphaRegex.test(id)) {
          // console.log("invalid invitation.id:",id);
          throw new Error(`Invalid invitation ID`);
          return;
        }
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/invitations/${id}`,
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
        const invitation_status = [ "pending", "completed", "expired" ];
        const schema = Joi.object().keys({
          candidate_id: Joi.string().min(8),
          status: Joi.string().allow(invitation_status),
          page: Joi.number(),
          per_page: Joi.number()
        });
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/invitations`,
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
    cancel: async id => {
      try {
        const alphaRegex = /^[a-z0-9]+/i;
        if (! alphaRegex.test(id)) {
          // console.log("invalid invitation.id:",id);
          throw new Error(`Invalid invitation ID`);
          return;
        }
        const res = await axios({
          method: 'delete',
          url: `${options.baseUrl}/${options.apiVersion}/invitations/${id}`,
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

export default invitations;


