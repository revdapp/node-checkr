import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
// const key = process.env.API_KEY;
const key = process.env.CHECKR_API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Reports', () => {
  let reportId = null;
  let candidateId = null;
  let packageSlug = 'mvr_only_1';

  describe('# CREATE', () => {
    let candidateData = {
      first_name: 'Charles',
      last_name: 'Babbage',
      email: 'charles.babbage@drata.com',
      dob: '1970-01-02',
      driver_license_number: 'F211165',
      driver_license_state: 'CA'
    };
    it('should create a new report', done => {
      /* use list rather than create for testing...
      // checkr.Candidates
      //   .create(candidateData)
      //   .then(candidate => { ... } )
      */
      // list to use existing candidate for testing...
      checkr.Candidates
        .list()
        .then(res => {
          // 'should list candidates'
          expect(res).to.have.property('data');
          expect(res.data).to.be.an('array')
          let candidate = res.data[0];
          expect(candidate).to.have.property('id');
          candidateId = candidate.id;
          // console.log(candidate);
          console.log("candidateId:",candidate.id);
          console.log("id:",candidate.id,",email:",candidate.email);
          checkr.Reports
            .create(packageSlug, candidate.id)
            .then(res => {
              expect(res).to.have.property('id');
              reportId = res.id;
              console.log("reportId:",res.id);
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
  describe('# UPDATE', () => {
    it('should update a report', done => {
      checkr.Reports
        .update(reportId, {
          package: packageSlug
        })
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
  describe('# ETA', () => {
    it('should provide report eta', done => {
      checkr.Reports
        .eta(reportId)
        .then(res => {
          expect(res).to.have.property('estimated_completion_time');
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
