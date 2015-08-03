WebTemplate
===================

# Why ?
If you often create new web projects, you know how long it can be to start from scratch :clock8:.  
You just need to kick start your project :rocket: ? This repo has been made for you !  

# What's in the magic box ?
I propose a configuration but of course, you can customize it.  

:punch: To manage the project :
- Npm
- Grunt (& Karma to test Angular web app)
- Bower
- Less

:thumbsup: Librairies into the project :
- Bootstrap
- Font-Awesome
- Angular
	- angular-mocks
	- angular-translate
	- angular-sanitize
	- angular-ui-bootstrap

# How to start ?
:video_game: When you start a new project from this archetype :  

- Run "**npm install**" (*at the root of the project*)  
  This will install all the required dependencies to manage the project.

- Run "**bower install**" (*at /site_dev/assets*)  
  This will install all the required dependencies needed by the app.

- Run "**node server.js**" (*at the root of the project*)  
  To run the server, as simple as that.

  If you don't have bower installed, this is going to install it globally.

:heavy_plus_sign: Optionnaly, you can :  

- *[optional]* Run "**npm update -g**" (*at the root of the project*)  
  This allows you to update all the npm global packages.

- [optional] Run "**npm install -g npm-check-updates**" and "**npm-check-updates**" (*at the root of the project*)  
  This allows you see available update (for npm packages) of this project.

- [optional] Run "**npm-check-updates -u**" (*at the root of the project*)  
  This will update the package.json dependencies to the latests available versions.

# Dev is done and you're moving to prod env ? Sure !
A Grunt file has been prepared for you !  
No need to worry about concating css, compiling js, optimizing your pics, ...  
Just run "**grunt**" with your favourite terminal from the root of the project.  
A "dist" folder will be created. You're ready to deploy !

# Quick custom
Before you really start your own projet, i recommend you to search for "CUSTOM" occurrences in the project.  
Everything with CUSTOM is something you may want to change (except into "bower_components" folder).

# Contribution
I think the project has a nice & clean structure.  
If you have better ideas i would be glad to hear from you and why not propose a pull request ... :wink:  
(Tho, it's only my second public repo on github i have no idea how pull request works, be kind and comprehensive if i make some mistakes).  

In order to contribute, please run "**npm test**" and check you don't have any JSHint error :tada:.  

Cheers !