node-checkr
=========

**Note: This client is in alpha stage**

Node Checkr is an unofficial, promise-based client for interacting with the [Checkr.io](https://checkr.com/) platform.

Documentation for the Checkr API can be found [here](https://docs.checkr.com/).

### Getting started


```bash
yarn add node-checkr
```

Create a new account with Checkr and get your `CHECKR_API_KEY` from you account's settings.


```javascript
import checkr from 'node-checkr';
const Checkr = new checkr(API_KEY);
```

### Objects
- [Accounts](#reports)
- [Candidates](#candidates)
- [Packages](#packages)
- [Reports](#reports)
- [Screenings](#screenings)
- [Webhooks](#reports)


Candidates
-----------

##### `list()`

Returns the list of all existing candidates.

```javascript
  checkr.Candidates
    .list()
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `retrieve(id)`

Retrieves a particular candidate, given the `id`.

```javascript
  checkr.Candidates
    .retrieve(id)
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `create(params)`

Creates a candidate do run screenings on. Required parameters might change depending
upon the screening to be run. Check the official docs for details.

Supported params:

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| first_name            | string        |     x    |               |
| middle_name           | string        |          |               |
| last_name             | string        |     x    |               |
| email                 | string        |     x    |               |
| phone                 | alpha-numeric |          |               |
| zipcode               | alpha-numeric |          |               |
| dob                   | string        |          | date of birth |
| ssn                   | alpha-numeric |          |               |
| driver_license_number | string        |          |               |
| driver_license_state  | string        |          |               ||

```javascript
  checkr.Candidates
    .create({
      first_name: 'John',
      middle_name: 'Smith',
      email: 'j.doe@gmail.com',
      last_name: 'Doe',
      dob: '1970-01-22',
      driver_license_number: 'F211165',
      driver_license_state: 'CA'
    })
    .then(candidate => console.log(candidate))
    .catch(err => console.log(err));
```

##### `update(id, params)`

Update the candidate's information, given the `id`. Same params as `createCandidate`.

```javascript
  checkr.Candidates
    .update('ABC123', {
      first_name: 'John',
      last_name: 'Doe',
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

Screenings
-----------

##### `ssn_trace(id)`

Retrieves an existing SSN trace.

```javascript
  checkr.Screenings
    .ssn_trace('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `sex_offender(id)`

Retrieves an existing Sex Offender search.

```javascript
  checkr.Screenings
    .sex_offender('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `global_watchlist(id)`

Retrieves an existing global watchlist search.

```javascript
  checkr.Screenings
    .global_watchlist('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `national_criminal(id)`

Retrieves an existing national criminal search.

```javascript
  checkr.Screenings
    .national_criminal('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `county_criminal(id)`

Retrieves an existing county criminal search.

```javascript
  checkr.Screenings
    .county_criminal('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `state_criminal(id)`

Retrieves an existing state criminal search.

```javascript
  checkr.Screenings
    .state_criminal('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `motor_vehicle(id)`

Retrieves an existing Motor Vehicle Report.

```javascript
  checkr.Screenings
    .motor_vehicle('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `education_verifications(id)`

Retrieves an existing education verification.

```javascript
  checkr.Screenings
    .education_verifications('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `employment_verifications(id)`

Retrieves an existing employment verification.

```javascript
  checkr.Screenings
    .employment_verifications('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

Packages
-----------

##### `list()`

Returns the list of packages available to your account.

```javascript
  checkr.Packages
    .list()
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `retrieve(id)`

Retrieves specific information for a particular package, given the `id`.

```javascript
  checkr.Packages
    .retrieve('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `create(params)`

Creates a package. Required parameters might change, check the official docs for details.

Supported params:

|         Param         |      Type     | Required |               |
|:---------------------:|:-------------:|:--------:|:-------------:|
| dob                   | string        |          | date of birth |
| email                 | string        |     x    |               |
| name                  | string        |     x    |               |
| slug                  | string        |     x    |               |
| screenings            | Array(screenings) |     x    |               |

```javascript
  checkr.Packages
    .create({
      name: 'Motor Vehicle Report',
      slug: 'mvr_only',
      screenings: [{ type: 'motor_vehicle_report', subtype: null }]
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

Reports
-----------

##### `retrieve(id)`

Retrieves a particular report, given the `id`.
```javascript
  checkr.Reports
    .retrieve('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `create(package_slug, candidate_id)`

Creates a report for the candidate specified, using the package.

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| candidate_id          | string        |     x    |               |
| package               | string        |     x    | ex: driver_pro |
| node                  | string        |    (a)   | ex: driver_pro |
| self_disclosure       | Array(object) |          | Candidate-provided criminal history. |
| .description          | string        |     x    |               |
| .offense_level        | string        |          | The level of the offense. |
| .offense_category     | string        |          | The criminal charge. |
| .sentence             | string        |          | The sentence imposed. |
| .time_served          | string        |          | The time served. |
| .date                 | string <date> |     x    | Date of the conviction. |
| .location             | object        | required | The location of the incident. |
| .location.county      | string        | required | County where conviction occurred. |
| .location.state       | string        | required | State where the county is located. Format: ISO 3166-2:US. |
| .location.country     | string(2)     | | 2 letter country code. Format: ISO 3166-1 alpha-2 (US by default.) |
| work_locations        | Array(object) |    (a)   | WorkLocationObject   |
| work_location.country | string(2)     |          | The country in ISO-3166 alpha-2 format. |
| work_location.state   | string        | required | The two letter state code. |
| work_location.city    | string(255)   |          | Name of the city (len <= 255) |
| tags                  | Array(string) |          | Array of tags for the Report. |

- (a) Required for hierarchy-enabled accounts.
- (b) Use the /counties resource to obtain a list of counties in each state.
Array of locations described using country, state, and city. When country is not specified defaults to US. State is required for US candidates. Country is required for international candidates.

```javascript
  checkr.Reports
    .create('mvr_only', 'ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `update(id, params)`

Updates a report.

Supported params:

|         Param         |      Type     |
|:---------------------:|:-------------:|
| package               | string        |
| adjudication          | string        |

- Either package or adjudication is required.

```javascript
  checkr.Reports
    .update('ABC123', {
      package: 'mvr_only'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `eta(id)`

Request the ETA for a specified report `id`.

```javascript
  checkr.Reports
    .eta('ABC123')
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

Accounts
-----------

##### `get(id)`

Returns the account information.

```javascript
  checkr.Accounts
    .get()
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `create(params)`

Create a new (sub)account (does not work).

```javascript
  checkr.Accounts
    .create(params)
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

Account schema: (supported params)

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| client_id             | string        |     x    |               |
| oauth_authorize       | boolean       |          |               |
| name                  | string        |     x    |               |
| email                 | string        |     x    |               |
| default_compliance_city  | string     |          |               |
| default_compliance_state | string     |          |               |
| purpose               | string        |     x    |               |
| adverse_action_email  | string        |          |               |
| support_email         | string        |          |               |
| support_phone         | string        |          |               |
| technical_contact_email  | string     |          |               |
| user                  | object        |     x    |               |
| user.full_name        | string        |     x    |               |
| user.email            | string        |     x    |               |
| company               | object        |     x    |               |
| company.dba_name      | string        |          | nullable      |
| company.industry      | string        |          | nullable      |
| company.city          | string        |     x    |               |
| company.state         | string        |     x    |               |
| company.street        | string        |     x    |               |
| company.tax_id        | string        |     x    |               |
| company.zipcode       | string        |     x    |               |
| company.incorporation_state | string  |          | nullable      |
| company.incorporation_type  | string  |     x    | see values below |
| company.email         | string        |     x    |               |
| company.phone         | string        |          | nullable      |
| company.website       | string        |          | nullable      |

Purpose Allowed Values:

```
purpose_values = [
    "employment",
    "business",
    "insurance",
    "tenant" ]
```

Incorporation Type Allowed Values

```
incorporation_values = [
    "association",
    "co-ownership",
    "corporation",
    "joint-venture",
    "limited-partnership",
    "llc",
    "llp",
    "non-profit",
    "partnership",
    "s-corporation",
    "sp",
    "trusteeship" ]
```

Schema:

```
account schema = {
    // Client credentials provided as part of your Partner Application.
    client_id : string, // required
    // Allows skipping of the /oauth/authorize call.
    oauth_authorize : boolean, // default(false)
    // Name of Account displayed in the Dashboard.
    name : string, // required
    // Fallback compliance city if candidate location is not provided.
    default_compliance_city : string | null, // default(''), not required
    // Fallback compliance state if candidate location is not provided. Format: ISO 3166-2:US.
    default_compliance_state : string | null, // default(''), not required
    // Permissible purpose to run background checks.
    // Determines which background checks the Account is credentialed for.
    // purpose_values = [ "employment", "business", "insurance", "tenant" ]
    purpose : string, // required.allow(purpose_values)
    adverse_action_email : string, // default('')
    support_email : string, // default('')
    support_phone : string, // default('')
    technical_contact_email : string(), // default('')
    user : {
      // Full name of the initial Admin user for the Account.
      full_name : string, // required
      // Email of the initial Admin user for the Account.
      email : string, // required
    }, // required
    company : {
      // Name of Company displayed in Checkr emails and branded web pages.
      dba_name : string | null, // not required
      // Industry that company operates in. Format: NAICS 2017 Code.
      industry : string | null, // not required
      // City where company is headquartered.
      city : string, // required
      // State where company is headquartered. Format: ISO 3166-2:US.
      state : string, // required
      // Street address where company is headquartered.
      street : string, // required
      // Company Tax ID number.
      tax_id : string, // required
      // Zipcode where company is headquartered.
      zipcode : string, // required
      // State where company is incorporated. Format: ISO 3166-2:US.
      incorporation_state : string | null, // not required
      // Type of incorporation. (incorporation_type : string)
      incorporation_type : string, // required().allow(incorporation_values),
      // Company phone number.
      phone : string | null, // not required
      // Company website.
      website : string | null, // not required
    }, // required
  };
```

Webhooks
-----------

##### `create(params)`

Create a new webhook.

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| webhook_url           | string        |     x    |               |

```javascript
  checkr.Webhooks
    .create(params)
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

##### `get(id)`

Retrieve the specific webhook, given the `id`.

```javascript
  checkr.Webhooks
    .get(id)
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| webhook_url           | string        |     x    |               |

Webhook get/retrieve response schema

```javascript
{
  "id": "e44aa283528e6fde7d542194",
  "object": "webhook",
  "uri": "/v1/webhooks/12b660d580fc219b1c26ff4f",
  "account_id": "8e122cc56b8fa82d33c6118a",
  "application_id": null,
  "include_object": true,
  "webhook_url": "https://example.com",
  "deleted_at": null
}
```

##### `list()`

Returns the list of all existing webhooks.

```javascript
  checkr.Webhooks
    .list()
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

Webhook list response schema

```javascript
{
  "object": "list",
  "next_href": "http://example.com",
  "previous_href": "http://example.com",
  "count": 1,
  "data": [
    {
    "id": "e44aa283528e6fde7d542194",
    "object": "webhook",
    "uri": "/v1/webhooks/12b660d580fc219b1c26ff4f",
    "account_id": "8e122cc56b8fa82d33c6118a",
    "application_id": null,
    "include_object": true,
    "webhook_url": "https://example.com",
    "deleted_at": null
    }
  ]
}
```

##### `delete(id)`

Delete the specified webhook, given the `id`.

```javascript
  checkr.Webhooks
    .delete(id)
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| id                    | string        |     x    | existing webhook id |

Counties
-----------

##### `get(states)`

Retrieve the counties (name,FIPS) for each given `state` in array.

```javascript
  let states = ["CA", "GA", "FL"];
  checkr.Counties
    .get(states)
    .then(res => console.log(res))
    .catch(err => console.log(err));
```

|         Param         |      Type     | Required |     Notes     |
|:---------------------:|:-------------:|:--------:|:-------------:|
| states                | Array(string(2) |     x  | array of states (FIPS) |

- (FIPS) Federal Information Processing Series.

To do
-----------

* Tests for screenings [ ]


Testing & Development
-----------

* Clone repository

```bash
  git clone https://github.com/franciscofsales/node-checkr.git
```

* Install dependencies

```bash
  yarn install
```

* Setup API Key

- copy `.env.example` into `.env` and input your API key.

* Run test set

```bash
  yarn run test
```

Develop and keep tests green.

**NOTE: packages cannot be created multiple times with the same slug, take that into account on package related tests.**


License
-----------

This Library is licensed under the MIT license.
