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

const schema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).required(),
  middle_name: Joi.string().alphanum(),
  last_name: Joi.string().alphanum().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().alphanum().min(3).max(12),
  zipcode: Joi.string().alphanum().min(3).max(10),
  dob: Joi.string().min(6).max(10),
  ssn: Joi.string().alphanum().min(3).max(14),
  driver_license_number: Joi.string().min(3).max(14),
  driver_license_state: Joi.string().min(1).max(6)
});

const candidates = options => {
  return {
    retrieve: async id => {
      if (!id || id === undefined || id === null) {
        throw new Error('List Candidates - Missing or invalid ID');
      }
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/candidates/${id}`,
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

    list: async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/candidates`,
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

    create: async params => {

      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }

      // if (
      //   !params.middle_name ||
      //   params.middle_name === null ||
      //   params.middle_name === undefined
      // ) {
      //   params.no_middle_name = true;
      // }
      // else {
      //   params.no_middle_name = false;
      // }


      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/candidates`,
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

    update: async (id, params) => {
      if (!id || id === undefined || id === null) {
        throw new Error('Update Candidate - Missing or invalid ID');
      }
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }

      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/candidates/${id}`,
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
  };
};

export default candidates;
