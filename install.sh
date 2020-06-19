#!/bin/bash

echo "Installing git-branch Globally"
npm install -g git-branch

echo "Installing simple-git Globally"
npm install -g simple-git

echo "Installing Commitizen Globally"
npm install -g commitizen

echo "Installing JIRA smart commits from HYPERIA"
npm install -g hyperia-commitizer

echo "Creating a global config file"
echo '{ "path": "/usr/local/lib/node_modules/hyperia-commitizer/" }' > ~/.czrc
