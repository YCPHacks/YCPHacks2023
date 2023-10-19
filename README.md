# YCPHacks2023

## For New File Structure
To start up the API and Web Server locally:
- Do `npm install` to install packages in the package.json
- Do `npm run dev` to start the web app and api app

## Understanding the file structure
Explanation of what your work in the repository should look like

### Apps Folder
The apps folder is where we will hold the root Fastify instances for both the Web and API servers. All of the code for the web server goes in the ```/web``` folder, and all of the code for the API server goes in the ```/api``` folder. For individual team work, the files in the apps folder generally shouldn't be touched. All we need is the inital plugin importing for each sub-app, which can be handled before the sub-app is developed on.
Think of the apps folder as the glue that pulls the sub-apps together into a cohesive Web Application.

### Packages Folder
Here is where 90% of the individual development will take place. We have two folders nested inside this packages folder ```/web``` and ```/api```. These two folders will separate the front-end and back-end portions of each sub-app. Inside the nested folder should hold a folder for each of the sub-apps, you can think of these individual folders as their own "repository" in a way. The files in these folders should pull from any files outside of the folder (unless it is imported from a package, ie. an api service imports a database util file from @ycphacks/core-api).