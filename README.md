<h1 align="center">
    <img src="http://static.framer.com/repos/api-logo.png" width="40"/>
    <br>
    API Docs
</h1>

A static site generator for documenting the [Framer Library][#framer-library]. It’s a curated
site that can pull in documentation from the [TSDoc][#tsdoc] comments in the project source. The
foundation of the site is built on top of [Monobase][#monobase]. You can see the published
website at [framer.com/api/][#website]

[#framer-library]: https://www.npmjs.com/package/framer
[#tsdoc]: https://github.com/Microsoft/tsdoc
[#monobase]: https://github.com/koenbok/monobase/
[#website]: https://framer.com/api/

<img src="http://static.framer.com/repos/api-banner.png" />

## Contributing

If you're interested in contributing documentation check [Contributing](./Contributing.md) for
more details on adding and updating content. For hacking on the api-docs project itself
read on.

## Installation

Clone the repository and install the dependencies:

    % git clone git@github.com:framer/api-docs.git
    % cd api-docs
    % make bootstrap

## Structure

```
.
├── Makefile            # Build Scripts
├── api                 # All files releated to generating framer.data.ts
├── components          # Holds all React components
│   ├── Navigation.tsx  # The main site navigation
│   ├── Template.tsx    # The main site template
│   ├── contexts        # React contexts
│   ├── documentation   # Components for displaying documentation from source code
│   ├── bootstrap.ts    # Contains JavaScript to be run on page load, e.g. syntax highlighting.
│   ├── framer.data.ts  # JSON data backing the documentation components
│   ├── index.tsx       # Exports components for use in pages
│   └── layout          # Components related to the site layout
├── pages               # Holds mdx & tsc files representing the page structure of the site
├── static              # Contains any static assets such as images.
```

## Development

A development server can be started by running:

    % make serve

This will watch for changes to the project files and reload the page when modified.

## Testing

We use [jest][#jest] for our unit tests, these are mostly focused around the code
used to generate the framer.data.ts file in the [api](/api) directory. Though test
for other parts of the codebase are most welcome.

To run the test suite:

    % yarn jest
    
This will also be run by CircleCI on each commit and open Pull Request. CircleCI will
also make a rudimentary check for missing models referenced by the API docs. The build
output will contain logs with the broken reference ids.

[#jest]: https://jestjs.io

## Submitting Changes

Push changes up to a new branch in a fork of the api-docs repository (core team members can
push directly to this repository) and open a Pull Request describing the changes.

## Deployment

Deployment is managed by [Netlify][#netlify]. On each commit to the master branch Netlify
will rebuild changes and publish. Netlify will also generate a build for any pull requests 
created and add a link via the comments. The [netlify.toml](./netlify.toml) file contains
the build and routing configuration for Netlify.

To invoke a manual build you can run:

    % make build

This will output the static HTML/CSS and JavaScript into a build directory in the project root.

[#netlify]: https://www.netlify.com/

## Framer API Data

The project makes use of the **framer.api.json** file bundled with each release of the "framer" 
and "framer-motion" packages. Both of these packages are installed as dependencies and we currently
always track the latest release.



in the FramerStudio repository from this we extract the useful information used by our Framer API
components. This is then transformed into a **framer.data.ts** package that is used by the
`<FramerAPIContext>` component.

A `FramerAPI` class is available that provides lookup methods for querying the TypeScript API.

Example:

```tsx
const scrollComponent = api.queryClass("Scroll")
console.log(scrollComponent.name)
console.log(scrollComponent.methods)
console.log(scrollComponent.properties)
```

The interfaces for these objects are defined in **api/types.ts**.

To regenerate the JSON data run:

    % make data

If the API docs become out of date run:

    % make data-update

By default `make data` will use the "framer" and "framer-motion" packages installed under
node_modules. To reference a different install of either of these packages you can provide
paths to make:

    % make data FRAMER_LIBRARY_DIR=../some/path/to/Library FRAMER_MOTION_DIR=../some/path/to/motion

## Adding TSDoc annotations to Framer Library

_NOTE: For Framer team only. For the moment the source code Framer Library and Framer Motion is private._

For any kind of development you'll need the Framer Library & Framer Motion source code checked
out locally.

Adding documentation can be done by updating the TSDoc in the source code and running `make data` to
re-generate the **framer.data.ts** file. We also provide a handy watcher to regenerate these files
when they change and reload the documentation web server:

    % make watch-lib

Again this accepts the `FRAMER_LIBRARY_DIR` option:

    % make watch-lib FRAMER_LIBRARY_DIR=../some/path/to/Library

When working on Framer Motion, there's a seperate command:

    % make watch-motion FRAMER_MOTION_DIR=../some/path/to/motion

And for both at the same time:

    % make watch-all FRAMER_LIBRARY_DIR=../some/path/to/Library FRAMER_MOTION_DIR=../some/path/to/motion

A [TSDoc reference][#tsdoc] can be found on the API Extractor website and a [playground][#play] 
helps to work how your documentation will be extracted.

To update the production site, new versions of "framer" and/or "framer-motion" containing the 
documentation changes will need to be published to the npm registry. Once done run 
`make data-update` to update the packages and create a Pull Request with the updated
package.json and yarn.lock files.

[#tsdoc]: http://api-extractor.com/pages/tsdoc/syntax/
[#play]: https://microsoft.github.io/tsdoc/#
