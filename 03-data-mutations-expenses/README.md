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
