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

const candidates = options => {
  return {
    create: async params => {
      const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).required(),
        middle_name: Joi.string().alphanum(),
        last_name: Joi.string().alphanum().min(3).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().alphanum().min(3).max(12),
        zipcode: Joi.string().alphanum().min(3).max(10),
        dob: Joi.string().alphanum().min(8).max(10),
        ssn: Joi.string().alphanum().min(3).max(14),
        driver_license_number: Joi.string().alphanum().min(3).max(14),
        driver_license_state: Joi.string().alphanum().min(1).max(6)
      });
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }

      if (
        !params.middle_name ||
        params.middle_name === null ||
        params.middle_name === undefined
      ) {
        params.no_middle_name = true;
      }
      else {
        params.no_middle_name = false;
      }


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
      const schema = Joi.object().keys({
        first_name: Joi.string().alphanum().min(3).required(),
        middle_name: Joi.string().alphanum(),
        last_name: Joi.string().alphanum().min(3).required(),
        email: Joi.string().email(),
        phone: Joi.string().alphanum().min(3).max(12),
        zipcode: Joi.string().alphanum().min(3).max(10),
        dob: Joi.string().alphanum().min(8).max(10),
        ssn: Joi.string().alphanum().min(3).max(14),
        driver_license_number: Joi.string().alphanum().min(3).max(14),
        driver_license_state: Joi.string().alphanum().min(1).max(6)
      });
      if (!id || id === undefined || id === null) {
        throw new Error('Update Candidate - Missing or invalid ID');
      }
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }

      if (
        !params.middle_name ||
        params.middle_name === null ||
        params.middle_name === undefined
      ) {
        params.no_middle_name = true;
      }
      else {
        params.no_middle_name = false;
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
    }
  };
};

export default candidates;
