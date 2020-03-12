# Contributing to Roastia

![Home Page](https://roastia.s3.us-east-2.amazonaws.com/Animated+GIF-downsized_large.gif)

Link: [Roastia](https://roastia.herokuapp.com)

# Background and Overview
Craft coffee shops have experienced high growth over the recent decade,
and as such, demand has increased for fair-trade, ethically-sourced,
craft coffee across the country.

Roastia allows indie coffee enthusiasts to find craft coffee shops
by location, name, origin and coffee attributes. They can then filter a shop's
coffee by desired taste qualities.

# Table of Contents

- [Claim an issue](#claim-an-issue)
- [Pull Request Process](#pull-request-process)
- [Getting Started](#getting-started)
  * [Yarn](#yarn)
    + [MacOS](#macos)
    + [MacPorts](#macports)
    + [Installation Script](#installation-script)
  * [Learn More](#learn-more)
    + [Code Splitting](#code-splitting)
    + [Analyzing the Bundle Size](#analyzing-the-bundle-size)
    + [Making a Progressive Web App](#making-a-progressive-web-app)
    + [Advanced Configuration](#advanced-configuration)
    + [Deployment](#deployment)
  * [Docker](#docker)
    + [Installation on MacOS](#installation-on-macos)
    + [Installation on Windows](#installation-on-windows)

## Claim an Issue

Communicating effectively is instrumental. Issues are similar to starting a conversation or a discussion. They are located within the
GitHub Issue tracker, which is where developers discuss issues related to the project. If you see an open issue that you want to tackle,
quickly comment on the issue to let others know you’re working on a solution. Therefore, people are less likely to duplicate your work.

**An issue is usually opened under the following circumstances:**

* Reporting an error you can’t solve yourself.
* Discussing a high-level topic.
* Proposing a new feature or necessary change.

**Tips for effective communication:**

* Keep requests short and direct.
* Give context.
* Ask questions.
* Respect decisions.

## Pull Request Process

A pull request is created by a contributor to propose and collaborate on given updates to a repository. Once a branch or issue is created and the
changes are committed, the creation of a pull request is needed, in order to receive feedback on the proposed changes.

1. To create a pull request that is ready for review, click "Create Pull Request".
2. To create a draft pull request, use the drop-down and select "Create Draft Pull Request", then click "Draft Pull Request".
3. Once a pull request is opened, you can discuss and review the potential changes with collaborators and add follow-up
commits before your changes are merged into the base branch.
4. If the developer is satisfied with the proposed changes, the pull request will be merged.<br />
Note: Anyone with push access to the repository can complete the merge.

Ultimately, a pull request is utilized to submit a working solution.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

As you begin to work with this website, we recommend that you download the following package managers. They can be downloaded in various ways, depending on your operating system, or preference.

- Yarn
- Docker

## Yarn

The first package manager is [Yarn](https://classic.yarnpkg.com/en/), which is utilized for launching the client side of the website.

Below are the installation methods for various operating systems.

### MacOS

For MacOS users, download Yarn via [Homebrew](https://brew.sh) via the following script.<br />
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

You can copy and paste this code directly into a MacOS terminal window or Linux shell prompt. This prompt will also download [Node.js](https://nodejs.org/en/) if it is not already installed.

Then download Yarn via the following command in the terminal/shell window:<br />
`brew install yarn`

### MacPorts

Yarn can also be installed via MacPorts using the following command in the terminal/shell window:<br />
`sudo port install yarn`

### Installation Script

Finally, Yarn can be installed manually via the following shell script: <br />
`curl -o- -L https://yarnpkg.com/install.sh | bash`

This is the easiest option for MacOS and generic unix environments.

From this step, you can run the following scripts...

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
Any lint errors present will be viewable in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: This is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Docker

The next package manager utilized is [Docker](https://www.docker.com), which creates containers on top of operating systems. The application also automates application deployment on the container.

The following installation methods are for MacOS and Windows, and are installations of Docker's desktop client.

### Installation on MacOS

For the MacOS Docker desktop client, visit [here](https://docs.docker.com/docker-for-mac/install/)

### Installation on Windows

For the Windows Docker desktop client, visit [here](https://docs.docker.com/docker-for-windows/install/)

### `docker-compose up`

This script will initialize the build of the Docker file in the Roastia repository.
