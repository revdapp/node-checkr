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
      if(alphaRegex.test(id)){
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
      } else{
        throw new Error('Invalid ID');
        return;
      }


    },



  };
};

export default reports;
