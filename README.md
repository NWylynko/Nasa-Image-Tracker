# nodejs api

## purpose
This base is to provide a solid but simple template for a nodejs service. Whether it be a microservice with only ten endpoints or a full stack application with a database, this base will provide a solid foundation for your project.

## setup
  1. copy .env.example to .env
  2. run `yarn` to install dependencies
  3. if using vscode run `yarn dlx @yarnpkg/sdks vscode`
  4. run `yarn dev` to start the development server

## scripts
  - `yarn build` to build the production distribution
  - `yarn start` to run the production server
  - `yarn dev` to run the development server, with fast refresh on file changes
  - `yarn lint` to run the linter, ensuring consistent code style throughout
  - `yarn test` to run the test suite

## source
  The `src` folder holds all the code for this repository. inside is the `index.ts` file, which is the entry point for the application. This purpose of this file is to import the configs and the app, setup the database connection (if needed or any other connections) run the app and cleanly shutdown the server. The `app.ts` file defines everything else, import all the endpoint handlers or attach the event listers, listen for new tcp connections, etc. Any deployment specific configuration should be imported in to the index.ts file and passed to `app`.