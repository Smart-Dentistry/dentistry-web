# Dentistry Web UI

This is a web UI implemented using [React][] and [Ant Design][] which goal is to help dentists manage their clinics. This project could be used as a starting point and a guide for projects related to managing a clinic for dentists or medical practitioners.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

It is assumed you have installed [Git][] in your machine.
In addition, you should have installed the latest LTS version of [Node.js][] and [Yarn][].


### Cloning repository

Clone this repo and navigate inside its root directory:

```bash
git clone https://github.com/Smart-Dentistry/dentistry-web.git && cd dentistry-web
```

### Installing dependencies

To install the project's dependencies run:

```bash
yarn install
```

### Starting server

```bash
yarn start
```

You are all set 🎉. Navigate to http://localhost:3000/ to see the project's home page.

## Useful commands

### Running tests

```bash
yarn test
```

### Formatting files using standard

[Standard JS][] is used for styling code:

```bash
yarn lint:fix
```

### Generating Translations

[i18next-parser][] is used to generate files for translations.
In order to generate them, run the following command:

```bash
i18next 'src/**/*.js'
```

## Environment Variables

### `.env` file

Create a file `.env` in the root of this project.

### Variables

The following variables should be defined inside `.env`:

|         Variable       |             Value           |
| ---------------------- | --------------------------- |
|`REACT_APP_API_URL`     | http://localhost:8000/api   |

## License

Copyright © 2020, [Mathsistor][], All Rights Reserved.
Unauthorized copying of this file, via any medium is strictly prohibited. ([see license][license])

[Ant Design]: https://ant.design/
[Git]: https://git-scm.com/downloads
[i18next-parser]: https://github.com/i18next/i18next-parser
[license]: ./LICENSE
[Mathsistor]: http://mathsistor.com/
[Node.js]: https://nodejs.org/en/
[React]: https://reactjs.org/
[Standard JS]: https://standardjs.com/
[Yarn]: https://classic.yarnpkg.com/en/docs/install/
