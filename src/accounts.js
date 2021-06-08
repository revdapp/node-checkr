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

/*
account schema = {
    // Client credentials provided as part of your Partner Application.
    client_id : string, // required
    // Allows skipping of the /oauth/authorize call.
    oauth_authorize : boolean, // default(false)
    // Name of Account displayed in the Dashboard.
    name : string, // required
    // Fallback compliance city if candidate location is not provided.
    default_compliance_city : string | null, // default(''), not required
    // Fallback compliance state if candidate location is not provided. Format: ISO 3166-2:US.
    default_compliance_state : string | null, // default(''), not required
    // Permissible purpose to run background checks.
    // Determines which background checks the Account is credentialed for.
    // allowed values = [ "employment", "business", "insurance", "tenant" ]
    purpose : string, // required
    adverse_action_email : string, // default('')
    support_email : string, // default('')
    support_phone : string, // default('')
    technical_contact_email : string(), // default('')
    user : {
      // Full name of the initial Admin user for the Account.
      full_name : string, // required
      // Email of the initial Admin user for the Account.
      email : string, // required
    }, // required
    company : {
      // Name of Company displayed in Checkr emails and branded web pages.
      dba_name : string | null, // not required
      // Industry that company operates in. Format: NAICS 2017 Code.
      industry : string | null, // not required
      // City where company is headquartered.
      city : string, // required
      // State where company is headquartered. Format: ISO 3166-2:US.
      state : string, // required
      // Street address where company is headquartered.
      street : string, // required
      // Company Tax ID number.
      tax_id : string, // required
      // Zipcode where company is headquartered.
      zipcode : string, // required
      // State where company is incorporated. Format: ISO 3166-2:US.
      incorporation_state : string | null, // not required
      // Type of incorporation. (incorporation_type : string)
      // incorporation_values = [
      //   "association",
      //   "co-ownership",
      //   "corporation",
      //   "joint-venture",
      //   "limited-partnership",
      //   "llc",
      //   "llp",
      //   "non-profit",
      //   "partnership",
      //   "s-corporation",
      //   "sp",
      //   "trusteeship" ]
      incorporation_type : string, // required().allow(incorporation_values),
      // Company phone number.
      phone : string | null, // not required
      // Company website.
      website : string | null, // not required
    }, // required
  };
*/

const accounts = options => {
  return {
    create: async params => {
      const purpose_values = [ "employment", "business", "insurance", "tenant" ];
      const incorporation_values = [
        "association",
        "co-ownership",
        "corporation",
        "joint-venture",
        "limited-partnership",
        "llc",
        "llp",
        "non-profit",
        "partnership",
        "s-corporation",
        "sp",
        "trusteeship"];
      const schema_user = Joi.object().keys({
        full_name : Joi.string().min(8).default(''),
        email : Joi.string().min(6).default(''),
      });
      const schema_company = Joi.object().keys({
        // Name of Company displayed in Checkr emails and branded web pages.
        dba_name : Joi.string().default(''), // not required
        // Industry that company operates in. Format: NAICS 2017 Code.
        industry : Joi.string().default(''), // not required
        // City where company is headquartered.
        city : Joi.string().min(4).required(),
        // State where company is headquartered. Format: ISO 3166-2:US.
        state : Joi.string().min(2).required(),
        // Street address where company is headquartered.
        street : Joi.string().required(),
        // Company Tax ID number.
        tax_id : Joi.string().min(8).required(),
        // Zipcode where company is headquartered.
        zipcode : Joi.string(), // required(),
        // State where company is incorporated. Format: ISO 3166-2:US.
        incorporation_state : Joi.string().min(2).default(''), // not required
        // Type of incorporation. (incorporation_type : string)
        // incorporation values = [
        //   "association",
        //   "co-ownership",
        //   "corporation",
        //   "joint-venture",
        //   "limited-partnership",
        //   "llc",
        //   "llp",
        //   "non-profit",
        //   "partnership",
        //   "s-corporation",
        //   "sp",
        //   "trusteeship" ]
        incorporation_type : Joi.string().required().allow(incorporation_values),
        // Company phone number.
        phone : Joi.string(), // not required
        // Company website.
        website : Joi.string(), // not required
      });
      const schema = Joi.object().keys({
        // Client credentials provided as part of your Partner Application.
        client_id: Joi.string().min(8).required(),
        // Allows skipping of the /oauth/authorize call.
        oauth_authorize : Joi.boolean().default(false),
        // Name of Account displayed in the Dashboard.
        name : Joi.string().min(8).required(),
        // Fallback compliance city if candidate location is not provided.
        default_compliance_city : Joi.string().default(''), // optional
        // Fallback compliance state if candidate location is not provided. Format: ISO 3166-2:US.
        default_compliance_state : Joi.string().default(''), // nullable, optional
        adverse_action_email : Joi.string().default(''), // optional
        support_email : Joi.string().default(''), // optional
        support_phone : Joi.string().default(''), // optional
        technical_contact_email : Joi.string().default(''), // optional
        // Permissible purpose to run background checks. // purpose : string // required
        // Determines which background checks the Account is credentialed for.
        // Values = [ "employment", "business", "insurance", "tenant" ]
        purpose : Joi.string().min(8).required(),
        // user : object // required
        user : Joi.object().keys({
          full_name : Joi.string().min(8).required(),
          email : Joi.string().min(6).required(),
        }).required(),
        // company : object // required
        company : Joi.object().keys({
          // Name of Company displayed in Checkr emails and branded web pages.
          dba_name : Joi.string().default(''), // not required
          // Industry that company operates in. Format: NAICS 2017 Code.
          industry : Joi.string().default(''), // not required
          // City where company is headquartered.
          city : Joi.string().min(4).required(),
          // State where company is headquartered. Format: ISO 3166-2:US.
          state : Joi.string().min(2).required(),
          // Street address where company is headquartered.
          street : Joi.string(), // required(),
          // Company Tax ID number.
          tax_id : Joi.string().min(8).required(),
          // Zipcode where company is headquartered.
          zipcode : Joi.string().required(),
          // State where company is incorporated. Format: ISO 3166-2:US.
          incorporation_state : Joi.string().min(2).default(''), // not required
          // Type of incorporation. (incorporation_type : string)
          // incorporation values = [
          //   "association",
          //   "co-ownership",
          //   "corporation",
          //   "joint-venture",
          //   "limited-partnership",
          //   "llc",
          //   "llp",
          //   "non-profit",
          //   "partnership",
          //   "s-corporation",
          //   "sp",
          //   "trusteeship" ]
          incorporation_type : Joi.string().required().allow(incorporation_values),
          // Company phone number.
          phone : Joi.string(), // not required
          // Company website.
          website : Joi.string(), // not required
        }).required(),
      });
      // params.include_object = true;
      const validation = Joi.validate(params, schema);
      if (validation.error !== null) {
        throw new Error(validation.error);
      }
      const validation_user = Joi.validate(params.user, schema_user);
      if (validation_user.error !== null) {
        throw new Error(validation_user.error);
      }
      const validation_company = Joi.validate(params.company, schema_company);
      if (validation_company.error !== null) {
        throw new Error(validation_company.error);
      }
      // console.log("incorporation_type:",params.company.incorporation_type);
      // if ( !( [
      //         "association",
      //         "co-ownership",
      //         "corporation",
      //         "joint-venture",
      //         "limited-partnership",
      //         "llc",
      //         "llp",
      //         "non-profit",
      //         "partnership",
      //         "s-corporation",
      //         "sp",
      //         "trusteeship"]
      //     .includes(params.company.incorporation_type) ) ) { ... }
      if ( !( incorporation_values.includes(params.company.incorporation_type) ) ) {
        // console.log("incorporation_type:",params.company.incorporation_type);
        throw new Error(`Invalid parameters, company incorporation type`);
      }
      try {
        const res = await axios({
          method: 'post',
          url: `${options.baseUrl}/${options.apiVersion}/accounts`,
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
    get: async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `${options.baseUrl}/${options.apiVersion}/account`,
          auth: {
            username: options.apiKey,
            password: ''
          }
        });
        // console.log("account:",res.data)
        return res.data;
      } catch (error) {
        handleError(error);
      }
    },
  };
};

export default accounts;

