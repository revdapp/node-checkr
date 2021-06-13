import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;
// export CHECKR_CANDIDATE_ID=<valid candidateId>
const candidateId = process.env.CHECKR_CANDIDATE_ID;
const packageId = "driver_pro";

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Invitations', () => {
  let invitationId = null;
  let invitationIdCreated = null;
  let invitationData = {
    package: packageId,
    candidate_id: candidateId
    // tags: [],
    // communication_types: [],
  };

  describe('# CREATE', () => {
    it('should create an invitation', done => {
      checkr.Invitations
        .create(invitationData)
        .then(res => {
          expect(res).to.have.property('id');
          expect(res).to.have.property('package');
          expect(res).to.have.property('candidate_id');
          expect(res).to.have.property('invitation_url');
          // expect(res).to.have.property('status');
          // expect(res).to.have.property('created_at');
          // expect(res).to.have.property('report_id');
          invitationId = res.id;
          invitationIdCreated = res.id;
          done();
        })
        .catch(err => {
          // console.log("error:",err);
          return new Promise((resolve, reject) => {
            if( err && err.code === 400 ) {
              console.log(err);
              expect(err.code).to.equal(400);
              // if( err.data.error === 'Url has already been taken' ) {
              //   expect(err.data.error).to.equal('Url has already been taken');
              // }
            } else {
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
    it('should list all invitations', done => {
      checkr.Invitations
        .list()
        .then(res => {
          expect(res).to.have.property('data');
          expect(res.data).to.be.an('array')
          let invitations = res.data;
          invitations.forEach(function(item) {
            expect(item).to.have.property('id');
            expect(item).to.have.property('package');
            expect(item).to.have.property('candidate_id');
            expect(item).to.have.property('invitation_url');
            // expect(item).to.have.property('status');
            // expect(item).to.have.property('report_id');
            // expect(item).to.have.property('created_at');
            // expect(item).to.have.property('completed_at');
            console.log("id:",item.id,",url:",item.invitation_url);
            // console.log(item);
          });
          if ( ! invitationId ) {
            // most recent (last)
            let item = invitations.slice(-1)[0];
            invitationId = item.id.trim();
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
    it('should get a invitation', done => {
      if ( ! id && invitationId ) {
        id = invitationId;
      }
      // console.log("invitationId:",invitationId);
      checkr.Invitations
        .get(id)
        .then(res => {
          let item = res;
          expect(item).to.have.property('id');
          expect(item).to.have.property('package');
          expect(item).to.have.property('candidate_id');
          expect(item).to.have.property('invitation_url');
          // expect(item).to.have.property('status');
          // expect(item).to.have.property('report_id');
          // expect(item).to.have.property('created_at');
          // expect(item).to.have.property('completed_at');
          console.log("id:",item.id,",url:",item.invitation_url);
          // console.log(item);
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
  describe('# CANCEL', (id) => {
    it('should cancel an invitation', done => {
      if ( ! id && invitationIdCreated ) {
        id = invitationIdCreated;
      }
      // console.log("invitationId:",invitationId);
      if( ! id ) {
        console.log("invitation id empty!");
      }
      checkr.Invitations
        .cancel(id)
        .then(res => {
          expect(res).to.have.property('id');
          expect(res).to.have.property('package');
          expect(res).to.have.property('candidate_id');
          // expect(res).to.have.property('invitation_url');
          // expect(res).to.have.property('object');
          // expect(res).to.have.property('status');
          // expect(res).to.have.property('created_at');
          // expect(res).to.have.property('completed_at');
          // expect(res).to.have.property('deleted_at');
          // expect(res).to.have.property('report_id');
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


