WebTemplate
===================

# <i class="icon-rocket"></i> Why ?
If you often create new web projects, you know how long it can be to start from scratch.

# <i class="icon-magic"></i> What's in the magic box ?
Here, i propose my basic configuration for a website with :
* Bootstrap
* Less
* Angular (+ angular-route, angular-animate, angular-ui).
* (Grunt to compile in a clean final dist)

I used npm for project dependencies : 

* Dependencies (minimal node server to run your project)
	* connect
	* serve-static
* DevDependencies
	* grunt
	* grunt-contrib-clean
	* grunt-contrib-copy
	* grunt-contrib-cssmin
	* grunt-contrib-less
	* grunt-text-replace
	* time-grunt

# <i class="icon-cog"></i> How to start ?
When you start a new project from this archetype :

- *[optional]* Run "**npm update -g**"
  This allows you to update all the npm global packages.

- [optional] Run "**npm install -g npm-check-updates**"
  This allows you to update all the npm packages of this project.

- [optional] Run "**npm-check-updates -u**"
  This will update the package.json dependencies to the latests available versions.

- Run "**npm install**"
  This will install all the required dependencies.

- Run "**node server.js**"
  To run the server, as simple as that.

- [optional] Run "**npm install -g bower**"
  If you don't have bower installed, this is going to install it globally.



# <i class="icon-pencil"></i> Contribution
I think the project has a nice & clean structure.
If you have better ideas i would be glad to hear from you and why not propose a pull request ... ;)
(Tho, it's only my second public repo on github i have no idea how pull request works, be kind and comprehensive if i make some mistakes).

Cheers !