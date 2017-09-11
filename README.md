node-checkr
=========

Node Checkr is an unofficial, promise-based client for interacting with the [Checkr.io](https://checkr.com/) platform.

Documentation for the Checkr API can be found [here](https://docs.checkr.com/).

### Getting started


```bash
yarn add node-checkr
```

Create a new account with Checkr and get you `API_key` from you account's settings.


```javascript
import checkr from 'node-checkr';
const Checkr = new checkr(API_KEY);
```


### Node-Checkr Objects

#### Candidates

##### `createCandidate(params)`


Creates a candidate do run screenings on. Required parameters might change with the screening to be run. Check the official docs for details.

Supported params:

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| first_name            | string        |     x    |               |
| middle_name           | string        |          |               |
| last_name             | string        |     x    |               |
| email                 | string        |          |               |
| phone                 | alpha-numeric |          |               |
| zipcode               | alpha-numeric |          |               |
| dob                   | alpha-numeric |          | date of birth |
| ssn                   | alpha-numeric |          |               |
| driver_license_number | alpha-numeric |          |               |
| driver_license_state  | alpha-numeric |          |               ||

```javascript
  checkr.Candidates
    .createCandidate({
      first_name: 'John',
      last_name: 'Doe',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `updateCandidate(id, params)`

Updates a candidate's information, given the `id`. Same params as [`createCandidate(params)`](#createCandidate).

```javascript
  checkr.Candidates
    .updateCandidate('ABC123', {
      first_name: 'John',
      last_name: 'Doe',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

### License

This Library is licensed under the MIT license.
