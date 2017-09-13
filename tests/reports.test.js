import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Reports', () => {
  let reportId = null;
  let packageSlug = 'mvr_only_1';

  describe('# CREATE', () => {
    let candidateData = {
      first_name: 'John',
      middle_name: 'Smith',
      email: 'j.doe@gmail.com',
      last_name: 'Doe',
      dob: '1970-01-22',
      driver_license_number: 'F211165',
      driver_license_state: 'CA'
    };
    it('should create a new report', done => {
      checkr.Candidates
        .create(candidateData)
        .then(candidate => {
          expect(candidate).to.have.property('id');
          checkr.Reports
            .create(packageSlug, candidate.id)
            .then(res => {
              reportId = res.id;
              expect(res).to.have.property('id');
              done();
            })
            .catch(err => {
              if (err) {
                console.log(err);
              }
              expect(err).to.be.null;
              done();
            });
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          done();
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
          if (err) {
            console.log(err);
          }
          expect(err).to.be.null;
          done();
        });
    });
  });
});
