# Setup

- This is a continuation of the 03-route-expenses project
- This needs a MongoDB Database
  - Using Atlas https://cloud.mongodb.com
  - To connect to this database using Prisma Library https://www.prisma.io/docs/getting-started/quickstart-sqlite
  - Commands:
    - npm install prisma --save-dev
    - npx prisma init --datasource-provider mongodb
  - Do not forget to setup a .env file with the Environment variable to connect to the database
  - Example:
    - DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.tesjx.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=Cluster0"
- This needs a SESSION_SECRET env variable with a random string which will be used as a secret for the session control

# Throwing redirect

Throwing a redirect() is not the same of returning a redirect. If we do that we don't trigger an ErrorBoundary (Catch boundary) but the user is simply redirected and cancels any function being called.

This is important and can be used for example to logout an user on the authenticated part of your website by putting a protection on a loader. But be careful that any nested loader inside any nested page will be run in paralel to the loader that might be doing this control. Be careful when loading data with authentication control. Maybe it's better to add that protection to all loaders
