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

More information about it here:
https://remix.run/docs/ja/main/utils/redirect

# Metadata

Metadata can be applied to the routes by exporting the remix specific funtion meta in each route. There are few examples of this in project but the best one is in \_app.expense.$id route

More information about metadata here:
https://remix.run/docs/ja/main/route/meta

# Attaching Response Headers

One way to set Response Headers is by going to entry.server and look for the place where a Header is already being set inside handleBrowserRequest and set your new Headers there. This is good when you want to set them globably. But when you want to set them locally (page-by-page) then you need an alternative.

To add page specific headers you need to use the headers function. I did this in the \_app.tsx route by setting a caching control to 60 minutes.
Just like the meta function this headers can be nested. But Remix doesn't automatically apply parent route headers when you have child routes. Remix looks for the deepest Headers set on the route and applies them, but you can use the arguments to access the parentHeaders and add them to your child route. Example of this in \_marketing.pricing.\_index route

More information about it here:
https://remix.run/docs/ja/main/route/headers

## Loaders and Action Headers

Loaders and Actions always return a response. And in this Headers can be present. Keep this in mind when implementing your Headers function

# Handle constant

One example of how to use this Handle constant is to avoid loading data that is not needed you can disable Javascript in some pages that are static.
In the root.tsx you will see a Scripts tag that's responsible to download any Script files. If you remove it then no Scripts are loaded hence no Javascript is loaded. This isn't very usefull.

There's a way to do it route-by-route. For that you need to export the constant handle with an object with a Key you defined. Then you can access it with the useMatches function to access to this data. Then you can look for it in the root route and disable the JS.

Check the example in the project code

More information about the handle constant and how to use it check here:
https://remix.run/docs/ja/main/route/handle

# Vite config

For information on what options are available in vite config check here:
https://vite.dev/config/server-options.html

If you are still using the old remix configuration check it here:
https://remix.run/docs/en/main/file-conventions/remix-config
