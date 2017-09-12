import chai, { expect } from 'chai';
import Dotenv from 'dotenv';
import Checkr from '../src';

const dotenv = Dotenv.config();
const key = process.env.API_KEY;

const checkr = new Checkr(key);

chai.config.includeStack = true;
process.env.SILENT_ERRORS = true; //comment this to view errors

describe('## Screenings', () => {});
