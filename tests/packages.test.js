import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
process.env.SILENT_ERRORS = true; //comment this to view errors

const pckg = {
  name: 'Motor Vehicle Report',
  slug: 'mvr_only_1',
  screenings: [{ type: 'motor_vehicle_report', subtype: null }]
};

let pckg_id = null;

describe('## Packages', () => {
  describe('# CREATE', () => {
    it('should create a packages', done => {
      checkr.Packages
        .create(pckg)
        .then(res => {
          expect(res).to.have.property('id');
          pckg_id = res.id;
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
  describe('# RETRIEVE', () => {
    it('should retrieve a package', done => {
      checkr.Packages
        .retrieve(pckg_id)
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
  describe('# LIST', () => {
    it('should list all the packages', done => {
      checkr.Packages
        .list()
        .then(res => {
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
