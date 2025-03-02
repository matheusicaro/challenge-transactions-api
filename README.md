# challenge-match-transactions-api
Summary:

- [challenge-match-transactions-api](#challenge-match-transactions-api)
- [Introduction](#introduction)
- [How to run the API](#how-to-run-the-api)
- [API specifications](#api-specifications)

<br>
<br>

# Introduction

This is a challenge to design a API to return costumers orders and transactions records.
This API should be able to handle with large datasets, and provide flexibility in matching logic, and allow for user involvement in verifying the matches.

The task is broken down into four parts to solve a matching problem involving transaction and order records.
For each part was created a issue:

- Part 1: Basic Matching of Orders and Transactions: https://github.com/matheusicaro/challenge-transactions-api/issues/1
- Part 2: Handling Data Mistakes: https://github.com/matheusicaro/challenge-transactions-api/issues/6
- Part 3: Web App Deployment: https://github.com/matheusicaro/challenge-transactions-api/issues/7
- Part 4: Approval Workflow: https://github.com/matheusicaro/challenge-transactions-api/issues/8

<br>
<br>

# How to run the API

1. clone this repository
2. in the root folder run: `npm install`
3. then run: `npm start`

<br>
<br>

# API specifications

The service use a [hexagonal-architecture](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/hexagonal-architecture.html) with the definition of Ports and Adapters for the providers.

- Used **[Node.js](https://nodejs.org/en/)** with:
  - **[TypeScript](https://www.typescriptlang.org/)**
  - **[express](https://expressjs.com/)**
- Used **[Jest](https://jestjs.io/)** for unit testing
- Used **[Husky](https://typicode.github.io/husky/#/)** for running defined steps/scripts before make a commit, script at: ['.husky/pre-commit'](./.husky/pre-commit)
