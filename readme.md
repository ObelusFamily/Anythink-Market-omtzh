# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

Hey! Setting up the project for the first time? Here are some things you need to do:

1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker Compose](https://docs.docker.com/compose/install/)
3. Clone the repo
4. Run `docker-compose up` in the root of the project
5. Open [http://localhost:3000/api/ping](http://localhost:3000/api/ping) in your browser.
6. You should see `pong` in your browser, worked? Easy Peasy! The backend is up and running.
7. Open [http://localhost:3001/register](http://localhost:3001/register) to register a new user in the browser, make sure to give yourself a cool name!
8. You're done! Let's get coding!
