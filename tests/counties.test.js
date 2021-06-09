import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Counties', () => {
  let states = ["CA"]; // ["CA","GA","FL","TX"];
  describe('# GET', () => {
    it('should get counties in states', done => {
      checkr.Counties
        .get(states) // array of states
        .then(res => {
          expect(res).to.have.property(states[0]);
          expect(res[states[0]]).to.have.property("counties");
          states.forEach(function(state) {
            expect(res).to.have.property(state);
            expect(res[state]).to.have.property("counties");
            // console.log(state,res[state]);
          });
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
            if (err) {
              console.log(err);
            }
            expect(err).to.be.null;
            assert.isNotOk(error,'Promise error');
            // done();
          });
        });
    });
  });
});

