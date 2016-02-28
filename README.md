WebTemplate
===================

# Why ?
If you often create new web projects, you know how long it can be to start from scratch.
You just need to kick start your project :rocket: ? This repo has been made for you !

# What's in the magic box ?
I propose a configuration but of course, you can customize it.

## Stack :
- [Gulp 4](http://gulpjs.com/)
- [Angularjs](https://angularjs.org/)
- [Sass](http://sass-lang.com/)
- [Ngdocs](https://github.com/nikhilmodak/gulp-ngdocs)
- [Karma](http://karma-runner.github.io/)

## Workflow Features
- **Gulp** fully automated workflow.
- **Development** and **production** environment targets.
- **Unit** test samples.
- **Coverage** watch if your code is tested
- **Sass** linting, sourcemaps minify and concat.
- **ngDocs** documentation generator for AngularJS.
- **Git Hook Angular** Commit message must follow the Angular conventions

## Librairies into the project :
- Bootstrap
- Live reload
- Font-Awesome
- Angular
	- angular-mocks
	- angular-translate
	- angular-sanitize
	- angular-ui-bootstrap
  	- angular-animate


## Install
```
$ npm install
$ npm run dev
```

## Global Dependencies

| Dependency | Version | Install                               |
| ---------- | ------- | ------------------------------------- |
| NodeJS     | 5.x.x   | [http://node.org](http://nodejs.org/) |
| npm        | 3.x.x   | [http://node.org](http://nodejs.org/) |
| Gulp CLI   | 0.4.x   | `npm install gulpjs/gulp-cli#4.0 -g`  |

Note: To view the app please open a new tab and go to `http://localhost:8080/`.

## Usage
### Tasks
- `$ gulp clean`: Remove generated folders - `build`, `docs`
- `$ gulp build-doc`: Run the generation of documentation about the template
- `$ gulp serve-doc`: Start web-server and live-reload to read the documentation
- `$ gulp build`: Create distribution package for the development and production environment
- `$ gulp serve`: Start web-server and live-reload.
- `$ gulp tests`: execute unit tests with Karma
- `$ gulp xo`: Linter to scan src js files
- `$ gulp release`: Automate release workflow
- `$ gulp release --patch`: Automate release workflow for a patch release (ex: v.0.0.1)
- `$ gulp release --minor`: Automate release workflow for a minor release (ex: v.0.1.0)
- `$ gulp release --major`: Automate release workflow for a major release (ex: v.1.0.0)

### Environments

#### Development:
- `$ npm run dev` is equivalent to
`$ gulp build && gulp serve`.
See the browser on : `http://localhost:8080`

#### Production:
- `$ npm run prod` is equivalent to
`$ gulp build --production`.
See the browser on : `http://localhost:8080`

#### Test:
- `$ npm run test` is equivalent to
`$ gulp tests`.

#### Documentation:
- `$ npm run doc` is equivalent to
`$ gulp build-doc&&gulp serve-doc`.
See the browser on : `http://localhost:8181`

Change Log

This project generates the CHANGELOG.md from Git metadata using the conventional-changelog library. The commit message must follow the Angular conventions for this feature to work.

# Quick custom
Before you really start your own projet, I recommend you to search for "CUSTOM" occurrences in the project.
Everything with CUSTOM is something you may want to change.

# Contribution
I think the project has a nice & clean structure.
If you have better ideas I would be glad to hear from you and why not propose a pull request

In order to contribute, please run `npm test` and check you don't have any JSHint error by running `xo`

Cheers !
