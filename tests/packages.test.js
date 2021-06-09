import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

const pckg = {
  name: 'Motor Vehicle Report',
  slug: 'mvr_only_1',
  screenings: [{ type: 'motor_vehicle_report', subtype: null }]
};

let pckgId = null;

describe('## Packages', () => {
  let packageData = {
    name: 'Newhire base',
    slug: 'newhire_base',
    screenings: [{ type: 'motor_vehicle_report', subtype: null }]
  };
  describe('# LIST', () => {
    it('should list all the packages', done => {
      checkr.Packages
        .list()
        .then(res => {
          expect(res).to.have.property('data');
          expect(res.data[0]).to.have.property('id');
          // console.log(res);
          if ( pckgId === null && res.data[0] ) {
            pckgId = res.data[0].id;
            console.log("packageId:",pckgId);
          }
          res.data.forEach(function(item) {
            console.log(item.id,",slug:",item.slug);
            // console.log(item);
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
  describe('# CREATE', (pckg) => {
    it('should create a packages', done => {
      checkr.Packages
        .create(pckg)
        // .retrieve(pckgId) // for testing
        .then(res => {
          expect(res).to.have.property('id');
          pckgId = res.id;
          console.log('packageId:',pckgId);
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
            if( err.code === 400 ) {
              console.log(err);
              expect(err.code).to.equal(400);
              if( err.error === 'Slug has already been taken' ) {
                expect(err.error).to.equal('Slug has already been taken');
              } else if( err.error === 'slug is missing, name is missing, screenings is missing' ) {
                expect(err.error).to.equal('slug is missing, name is missing, screenings is missing');
              }
            } else {
              if (err) {
                console.log(err);
              }
              expect(err).to.be.null;
              assert.isNotOk(error,'Promise error');
            }
          });
        });
    });
  });
  describe('# RETRIEVE', () => {
    it('should retrieve a package', done => {
      checkr.Packages
        .retrieve(pckgId)
        .then(res => {
          expect(res).to.have.property('id');
          expect(res).to.have.property('name');
          expect(res).to.have.property('slug');
          console.log("id:",res.id,",slug:",res.slug);
          // console.log(res);
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
