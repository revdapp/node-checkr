import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Webhooks', () => {
  let webhookId = null;
  let webhookUrl = webhookUrlDefault;
  const webhookUrlDefault = 'https://company.com/v1/webhook';
  let webhookData = {
    webhook_url: 'https://example.com/v1/webhook'
  };

  describe('# CREATE', () => {
    it('should create a webhooks', done => {
      checkr.Webhooks
        .create(webhookData)
        .then(res => {
          expect(res).to.have.property('id');
          expect(res).to.have.property('webhook_url');
          webhookUrl = res.webhook_url;
          webhookId = res.id;
          done();
        })
        .catch(err => {
          // console.log("error:",err);
          return new Promise((resolve, reject) => {
            if( err && err.code === 400 ) {
              console.log("error:",err);
              // console.log("error.code:",err.code);
              expect(err.code).to.equal(400);
              if( err.data.error === 'Url has already been taken' ) {
                expect(err.data.error).to.equal('Url has already been taken');
              } else if( err.data.error === 'Allowed webhook API limit exceeded' ) {
                expect(err.data.error).to.equal('Allowed webhook API limit exceeded');
              } else {
                expect(err.data.error).to.equal('Url has already been taken');
              }
            } else {
              console.log("error.code:",err.code);
              if (err) {
                console.log(err);
              }
              expect(err).to.be.null;
              assert.isNotOk(error,'Promise error');
            }
            // done();
          });
        });
    });
  });
  describe('# LIST', () => {
    it('should list all webhooks', done => {
      checkr.Webhooks
        .list()
        .then(res => {
          expect(res).to.have.property('data');
          expect(res.data).to.be.an('array')
          let webhooks = res.data;
          webhooks.forEach(function(hook) {
            expect(hook).to.have.property('webhook_url');
            // console.log(hook);
            console.log("id:",hook.id,",url:",hook.webhook_url);
          });
          if ( !webhookId ) {
            webhookId = webhooks[0].id.trim();
            webhookUrl = webhooks[0].webhook_url.trim();
          }
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          // done();
          });
        });
    });
  });
  describe('# GET', (id) => {
    it('should get a webhook', done => {
      if ( ! id ) {
        id = webhookId.trim();
      }
      id = id.trim();
      webhookId = id;
      // console.log("webhookId:",webhookId);
      checkr.Webhooks
        .get(webhookId)
        .then(res => {
          expect(res).to.have.property('id');
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          // done();
          });
        });
    });
  });
});

