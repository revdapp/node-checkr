import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
// const key = process.env.API_KEY;
const key = process.env.CHECKR_API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

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
          console.log("packageId:",pckg_id);
          // done();
        })
        .catch(err => {
          if (err) {
            console.log(err);
          }
          if( err.code === 400 && err.error === 'Slug has already been taken' ) {
              expect(err.code).to.equal(400);
              expect(err.error).to.equal('Slug has already been taken');
          } else {
              expect(err).to.be.null;
          }
          // done();
        });
    });
  });
  describe('# LIST', () => {
    it('should list all the packages', done => {
      checkr.Packages
        .list()
        .then(res => {
          expect(res).to.have.property('data');
          expect(res.data[0]).to.have.property('id');
          // console.log(res);
          if ( pckg_id === null && res.data[0] ) {
            pckg_id = res.data[0].id;
            console.log("packageId:",pckg_id);
          }
          res.data.forEach(function(item) {
            // console.log(item);
            console.log(item.id,",slug:",item.slug);
            // console.log("id:",item.id,",name:",item.name,",slug:",item.slug);
          });
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
          expect(res).to.have.property('name');
          expect(res).to.have.property('slug');
          // console.log(res);
          console.log(res.id,",slug:",res.slug);
          // console.log("id:",res.id,",name:",res.name,",slug:",res.slug);
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
