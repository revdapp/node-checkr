import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;
let candidateId = process.env.CHECKR_CANDIDATE_ID;
let reportId = process.env.CHECKR_REPORT_ID;
const packageName = 'Driver Pro';
const packageId = "driver_pro";
// const packageName = 'Tasker Pro';
// const packageId = 'tasker_pro';
// see ssn provided on CHECKR website
// https://docs.checkr.com/#section/Reference/SSN-validation
let ssnTest = process.env.CHECKR_SSN;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Reports', () => {
  let packageSlug = packageId;

  describe('# CREATE', () => {
    let candidateData = {
      first_name: 'Charles',
      no_middle_name: true,
      last_name: 'Babbage',
      dob: '1970-01-22',
      ssn: ssnTest,
      email: 'charles.babbage@gmail.com',
      zipcode: '94107',
      driver_license_number: 'F2111659',
      driver_license_state: 'CA'
    };
    // need a valid candidate to create report
    it.skip('should create a new candidate', done => {
      if( ! candidateId ) {
        console.log("candidateId:",candidateId);
        try {
          // list to use existing candidate for testing...
          // checkr.Candidates
          //   .list()
          checkr.Candidates
            .create(candidateData)
            .then(res => {
              // 'should list candidates'
              // expect(res).to.have.property('data');
              // expect(res.data).to.be.an('array')
              // let candidate = res.data.slice(-1)[0];
              let candidate = res;
              expect(candidate).to.have.property('id');
              candidateId = candidate.id;
              console.log("id:",candidate.id,",email:",candidate.email);
              // console.log(candidate);
            })
        } catch (err) {
            console.log("candidate invalid, create failed");
            // throw err;
            // throw new Error("candidate invalid, create failed");
        }
      }
    });
    it('should create a new report', done => {
      checkr.Reports
        .create(packageSlug, candidateId)
        .then(res => {
          expect(res).to.have.property('id');
          reportId = res.id;
          console.log("reportId:",res.id);
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
          console.log("candidateId:",candidateId);
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
