# Setup

- This is a continuation of the 02-route-expenses project
- This needs a MongoDB Database
  - Using Atlas https://cloud.mongodb.com
  - To connect to this database using Prisma Library https://www.prisma.io/docs/getting-started/quickstart-sqlite
  - Commands:
    - npm install prisma --save-dev
    - npx prisma init --datasource-provider mongodb
  - Do not forget to setup a .env file with the Environment variable to connect to the database
  - Example:
    - DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.tesjx.mongodb.net/<database-name>?retryWrites=true&w=majority&appName=Cluster0"

# Server only files

If you want to make sure a file/module is only executed in the server then name it .server. Remix will make sure this file is only run on the Backend of the application

More about it here:
https://remix.run/docs/hi/main/file-conventions/-server

This is used for example on the Database connection in the database.server.js file

# Remix Backend vs Frontend

When a page loads for the first time it will be prepared in the Backend so any log you will have will be triggered on the Backend but it will also be triggered on the Frontend. But after loading it will turn into a SPA again and if you re-enter the page it will only log it in the Frontend

This is good for search engine crawlers cause when accessing the page for the first time it's coming prepared from the backend so it's ready to use.

# Nested Loaders

When opening a route that on it there's many loaders then all loaders will be executed in Paralel, to be fast as possible. In the example expenses/ has a loader and expenses/$id has a loader. When editing an expense by default it will call both the expenses/ loader and the expenses/$id loader

It might be redundant to fetch both calls since when you fetch the expenses/ data you already have the data for the expenses/$id you are loading. In that case you can use the function useMatches() on the children loaders

This function returns an array of routes that currently match the open route.

# Fetcher

Fetcher is a another hook provided by Remix. The useFetcher method returns a fetcher object which contains various pieces of data and a submit and load method. It's a object you can use to load or submit behind the scenes without triggering navigation actions that usually happen with others.

Check the delete method for the expenses

Fetcher also provides other useful information like if it's still executing other fetching actions
