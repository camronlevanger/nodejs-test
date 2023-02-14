US Ski and Snowboard Node.js Test
---------------------------------

## Data

Data is stored in an SQLite database located in the data directory.  The database can be generated using the scirpt below.

### Generating Data

````bash
node ./data/generate.js
````

## Schema

### Members Table

````
id TEXT,
firstName TEXT,
lastName TEXT,
title TEXT,
phone TEXT,
company TEXT,
department TEXT,
url TEXT,
image TEXT
````

### Addresses Table

````
id TEXT,
memberId TEXT,
primaryAddress INTEGER,
address TEXT,
city TEXT,
state TEXT,
zip TEXT
````


## Task

* Display the SQLite data in a format similar to that depicted in [public/images/layout.png](public/images/layout.png)
  * The address displayed should be the primary address with a non-zero value in the primaryAddress column.
  * You may use any or no CSS framework as you choose.
* Allow the user to search by first/last name.
* You may add any additional npm packages to the project that you want to use.


## Submission

Please email a copy of your solution.
