# Start the remix app

Make sure you have node installed

Execute the following command in the folder you want to start your project

```sh
npx create-remix@latest
```

# Styling in remix

Check this documentation on styling a Remix app

https://remix.run/docs/en/main/styling/bundling

# Importing files

When importing files ~ always references to the app folder

# Routing

All the pages need to be created inside the routes page

Their content will be added inside the Outlet in the root.tsx

# Links

To add references to external links to be included declare the links function in the file you want it to be included

```tsx
//Example:
export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
```

This is generally automatically created when starting a new App for the root.tsx. But if it isn't then make sure to add it. The links inside this function will be used by the Links component

Note: If you are adding straight regular CSS files you might need to add a ?url at the end of the path if you are using vite

```tsx
<Links />
```

Note that Remix will only look for this links functions inside Routes. If you use them in components they won't be called. For that you need to import it to the routes file. This is a pattern called Surfacing Styles that's mentioned in the official documentation.

https://remix.run/docs/en/main/styling/css#surfacing-styles

This isn't CSS like CSS modules so styles imported this way might collide with already existing styles on the route

# Submit Form

When submitting a form with a button from a component the event will be caught by a special function action() that needs to be set on the route.
This function works a bit differently than the React one cause this one actually runs in the backend of the application.
Remix will correctly split the code of the Route into Backend and Frontend.

This action function will be triggered everytime a non-GET request reaches the route. For GET requests it will return the page.

Note that useActionData can be used everywhere not just routes. You can use it on components and you will get the data from the closer loader that was called

# Load Page

Contrary to the action function there's a loader function that will always be called on every GET request that should be used to fetch Data to the route

Note that useLoaderData can be used everywhere not just routes. You can use it on components and you will get the data from the closer loader that was called

# Error page

To prevent showing the user the default error page when something goes wrong you can implement your own Error page using the ErrorBoundary component from Remix.
On your root route you should export and declare the function ErrorBoundary like so:

```jsx
export function ErrorBoundary() {
  const error = useRouteError();
  return <>Your html</>;
}
```

This ErrorBoundary component will be rendered by remix instead of the full App if an error is thrown anywhere.

But you can specify a different error for each route by simply redeclaring this function inside any other route

The old CatchBoundary is now merged with ErrorBoundary. To identify the type of error use the condition with the function isRouteErrorResponse:

```jsx
if (isRouteErrorResponse(error)) {
}
```

Documentation on this change can be found here:
https://remix.run/docs/en/main/start/v2#catchboundary-and-errorboundary

# Dynamic routes

Dynamic routes can be achieved by stating a variable in the route file name with $variable for example notes.$noteId will translate to a page where it's route is notes/{NoteID}

https://remix.run/docs/fr/main/discussion/routes

# Metadata

Meta is a function that returns a javascript object. And on this object you can set various metadata fields. This metadata documentation can be found here:

https://remix.run/docs/zh/main/route/meta
