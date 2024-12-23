# Remix vs NextJS

In Remix:

- Always server-side rendered
- No static site generation (build-time pre-rendering)
- Aalways requres host that supports server-side code execution

NextJS:

- Optional server side rendering
- Static site generation (at build time) supported
- Deployment options: static hosting vs server-side code execution

# Notes about the followed Course

You find course resources (code snapshots & slides) on GitHub, in this repository: https://github.com/academind/remix-practical-guide-course-resources

The folders in the Code folder map to the different course sections.

The folders inside those subfolders (e.g., Code/02 Essentials/01 Starting Project) represent individual code snapshots - e.g., the starting project code for a course section.

I'll using Remix v2 instead of v1 and following the documentation that mentions the changes

## Remix version

The original course was made with Remix v1 - not v2 or later versions!

Whilst the core concepts remain unchanged, there are subtle differences between those versions. You can read the following article for more details on how you could upgrade to v2 after finishing this course:

https://remix.run/docs/en/main/start/v2

To create a v1 project, when viewing the next lecture, you should run the command

```sh
npx create-remix@1
```

Instead of

```sh
npx create-remix@latest
```

If you're interested in Remix v2:

You find adjusted code snapshots for all course demos in the course GitHub folder. The v2 code can be found in folders named "ZZ V2-finished" inside the respective project folders (i.e., in the subfolders in the "Code" folder).

For example, for this section, you find the v2 code here: https://github.com/academind/remix-practical-guide-course-resources/tree/main/Code/02%20Essentials/ZZ%20V2-finished

# Deployment

## Templates

Remix has a few starter templates to help you deploy to various servers. Running npx create-remix@latest with the --template flag allows you to provide the URL to one of these templates, for example:

```sh
npx create-remix@latest --template remix-run/remix/templates/express
```

The list of templates can be found here: https://github.com/remix-run/remix/tree/main/templates

If this no longer exists when you check this project then search for Remix Deployment since many of this templates disappeared since the moment the Course was created till the date I did it
