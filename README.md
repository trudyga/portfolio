# Portfolio
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e82e13616213466bbe93c35e1c70b8aa)](https://app.codacy.com/app/trudyga/portfolio?utm_source=github.com&utm_medium=referral&utm_content=trudyga/portfolio&utm_campaign=Badge_Grade_Dashboard)
## Description
Source code of my portfolio web site.
## Launch app locally
### Development environment
Requirements.
1. Linux-based operation system is required. Alternativelly you can launch all commands in bash shell.
2. Node.js is installed on your machine.
3. Yarn package manager is install on your machine.
Actions.
1. Make project root folder as your current directory in terminal session.
2. Run: "yarn run dev". It will start application on port 127.0.0.1:8080 and will launch bundle analyzer.
### Production environment
Requirements.
Same as for running in development environment.
Actions.
1. Make project root folder as your current directory in terminal session.
2. Run: "yarn run build". It will build an application and add output to dist folder.
3. Run: "sudo yarn run serve". It will build an application on 127.0.0.1:80.
3.1. To specify a port you may start application with "export PORT=`your_desired_port`; npm run start".
## Launch app remotely
### Google Cloud Platform
Requirements.
1. Linux-based operation system is required. Alternativelly you can launch all commands in bash shell.
2. Node.js is installed on your machine.
3. Yarn package manager is installed on your machine.
4. Google Cloud SDK is installed on your machine.
Actions.
1. Run: "yarn run build" to build an application.
2. Run: "gcloud auth login" to login to you google cloud account.
3. Create new or select a "App Engine" project.
3. Run: "gcloud deploy" to deploy your application.
### Heroku
Requirements.
1. Linux-based operation system is required. Alternativelly you can launch all commands in bash shell.
2. Node.js is installed on your machine.
3. Yarn package manager is installed on your machine.
4. docker is installed on your machine.
5. heroku is installed on your machine.
Actions.
1. Run: "yarn run build" to build an application.
2. Run: "heroku container:login"
3. Run: "heroku create"
4. Run: "heroku container:push web"
5. Run: "heroku container:release web"
6. Run: "heroku open"