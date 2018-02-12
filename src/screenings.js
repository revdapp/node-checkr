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

const screenings = options => {
  return {
    ssn_trace: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/ssn_traces/${id}`,
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
    },
    sex_offender: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/sex_offender_searches/${id}`,
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
    },
    global_watchlist: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/global_watchlist_searches/${id}`,
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
    },
    national_criminal: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/national_criminal_searches/${id}`,
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
    },
    county_criminal: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/county_criminal_searches/${id}`,
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
    },
    state_criminal: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/state_criminal_searches/${id}`,
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
    },
    motor_vehicle: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/motor_vehicle_reports/${id}`,
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
    },
    education_verifications: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/education_verifications/${id}`,
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
    },
    employment_verifications: async id => {
      const alphaRegex = /^[a-z0-9]+/i;
      if (alphaRegex.test(id)) {
        try {
          const res = await axios({
            method: 'get',
            url: `${options.baseUrl}/${options.apiVersion}/employment_verifications/${id}`,
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
    }
  };
};

export default screenings;
