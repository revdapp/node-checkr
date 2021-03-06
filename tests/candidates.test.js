import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.CHECKR_API_KEY;
let candidateId = process.env.CHECKR_CANDIDATE_ID;

const checkr = new Checkr(key);

chai.config.includeStack = true;
// process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Candidates', () => {
  // let candidateId = null;
  let candidateData = {
    first_name: 'Charles',
    last_name: 'Babbage',
    email: 'charles.babbage@gmail.com'
  };

  describe('# CREATE', () => {
    it('should create a new candidate', done => {
      // return new Promise((resolve, reject) => {
      checkr.Candidates
        .create(candidateData)
        // .retrieve(candidateId) // for testing
        .then(res => {
          // 'should create new candidate'
          expect(res).to.have.property('id');
          candidateId = res.id;
          console.log('candidateId:',candidateId);
          done();
        })
        .catch(err => {
          return new Promise((resolve, reject) => {
            if( err.code === 400 && err.error === 'Slug has already been taken' ) {
              expect(err.code).to.equal(400);
              expect(err.error).to.equal('Slug has already been taken');
// done();
            } else {
              if (err) {
                console.log(err);
              }
              expect(err).to.be.null;
              assert.isNotOk(error,'Promise error');
            }
          });
        });
      // });
    });
  });
  describe('# UPDATE', () => {
    it('should update a candidate', done => {
      candidateData.first_name = 'Chuck';
      checkr.Candidates
        .update(candidateId, candidateData)
        .then(candidate => {
          // 'should change candidate name'
          expect(candidate).to.have.property('id');
          expect(candidate.first_name).to.equal('Chuck');
          expect(candidate.id).to.equal(candidateId);
          console.log('candidateId:',candidate.id);
          // console.log('candidate:',candidate);
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
  describe('# LIST', () => {
    it('should list all candidates', done => {
      checkr.Candidates
        .list()
        .then(res => {
          // 'should list candidates'
          expect(res).to.have.property('data');
          expect(res.data).to.be.an('array')
          res.data.forEach(function(item) {
            expect(item).to.have.property('id');
            expect(item).to.have.property('email');
            console.log("id:",item.id,",email:",item.email);
            // console.log(item);
          });
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
  describe('# RETRIEVE', () => {
    it('should retrieve an existing candidate', done => {
      checkr.Candidates
        .retrieve( candidateId )
        .then(res => {
          // 'should get specified candidate'
          expect(res).to.have.property('id');
          console.log('candidateId:',candidateId);
          // console.log('res:',res);
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
