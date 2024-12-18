# Routing alternative to dot notation

As of version 2 of Remix there's no easy alternative to the dot notation for routing.
If you want to use a folder aproach you need to opt out of flat routes. Didn't find much documentation on how to do it

## An Alternative Way Of Setting Up Routes

Remix offers two ways of setting up routes (called the "v1" and "v2" route structures).

This course was recorded using the "v1" approach (which is also the approach I personally still prefer).

Remix projects by default now come with the "v2" approach set as a default.

> > > It's important to note, that these two approaches are alternatives - the v2 approach is not better, faster or more secure than the v1 approach!

Still, after learning about the v1 approach in this and the previous section, you can also explore the v2 alternative to pick your personal favorite.

In a nutshell, the core difference is that the v1 approach uses folders for organizing and nesting routes, whereas the v2 approach is all about maintaining a flat route file structure.

The official documentation provides a good comparison: https://remix.run/docs/en/main/pages/v2#upgrading-to-the-new-convention

To learn more about the v2 routing approach, you can use this article - after learning the v1 approach, going through this article will be very simple & straightforward for you: https://remix.run/docs/en/main/file-conventions/route-files-v2

# Pathless Layout Routes

When you need an extra level of nesting without adding a new path to the URL for example for styling you can use this feature.

But basically it's done by adding a hidden route that starts with \_ then the actual route. Look at the expenses for example where that Pathless Layout is called \_app

More documentation here:
https://remix.run/docs/en/main/file-conventions/routes#nested-layouts-without-nested-urls

# Resource Routes

Sometimes you need links that load data or a file instead of a page. For that you don't declare your component but instead just declare and export a loader function. Check the expenses/raw page

# Splat Route

A splat route is a route that will be loaded whenever no other route matches the given URL. And it will give us access to all the path segments that were entered

This can be usefull to redirect users to pages that no longer exist.

Check the $.tsx on the project or the following documentation for more details:

https://remix.run/docs/en/main/file-conventions/routes#splat-routes
