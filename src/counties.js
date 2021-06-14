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

// states is arra of states abbreviations (e.g. "CA")

const counties = options => {
  return {
    get: async (states) => {
      try {
        const stateslist = states.join(',');
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/counties?states=${stateslist}`,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        // console.log("counties:",res.data)
        return res.data;
      } catch (error) {
        handleError(error);
      }
    },
  };
};

export default counties;

