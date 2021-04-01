#!/bin/bash

echo "Installing current-git-branch Globally"
npm install -g current-git-branch --save

echo "Installing simple-git Globally"
npm install -g simple-git

echo "Installing Commitizen Globally"
npm install -g commitizen

echo "Installing JIRA smart commits from HYPERIA"
npm install -g hyperia-commitizer

echo "Creating a global config file"
echo '{ "path": "/usr/local/lib/node_modules/hyperia-commitizer/" }' > ~/.czrc
