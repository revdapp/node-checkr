import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;
let accountId = process.env.CHECKR_ACCOUNT_ID;
const clientId = process.env.CHECKR_CLIENT_ID;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

/*
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
*/

describe('## Accounts', () => {
  // let accountId = null;
  let accountData = {
    "client_id": clientId,
    "name": "Acme Corporation",
    "default_compliance_state": "CA",
    "adverse_action_email" : "charles.babbage@gmail.com",
    "purpose": "employment",
    "support_email": "charles.babbage@gmail.com",
    "support_phone": "206-555-0188",
    "technical_contact_email": "charles.babbage@gmail.com",
    "user": {
      "full_name": "Johnathan Doe",
      "email": "charles.babbage.doe@gmail.com"
    },
    company: {
      "dba_name": "Acme",
      "street": "123 Main St",
      "city": "San Diego",
      "state": "CA",
      "zipcode": "94107",
      "tax_id": "123456789",
      "phone": "206-555-0100",
      "website": "https://www.example.com",
      "industry": "52-59",
      "incorporation_state": "CA",
      "incorporation_type": "corporation"
    }
  };
  describe('# CREATE', () => {
    it.skip('should create an account', done => {
      // console.log("accountId:",accountId);
      checkr.Accounts
        .create(accountData)
        .then(res => {
          expect(res).to.have.property('id');
          accountId = res.id;
          // console.log("accountId:",accountId);
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
          if (err) {
            console.log(err);
          }
          // expect(err).to.be.null;
          // assert.isNotOk(error,'Promise error');
          });
        });
    });
  });
  describe('# GET', () => {
    it('should get an account', done => {
      checkr.Accounts
        .get() // (accountId)
        .then(res => {
          expect(res).to.have.property('id');
          // expect(res.id).to.equal(accountId);
          expect(res).to.have.property('available_screenings');
          console.log("accountId:",res.id);
          accountId = res.id;
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
            if (err) {
              console.log(err);
            }
            expect(err).to.be.null;
            if( err.code === 400 && err.error === 'Invalid account ID' ) {
              expect(err.code).to.equal(400);
              expect(err.error).to.equal('Invalid account ID');
            } else {
              expect(err).to.be.null;
              assert.isNotOk(error,'Promise error');
            }
            // done();
          });
        });
    });
  });
});


