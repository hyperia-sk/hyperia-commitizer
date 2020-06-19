'use strict';

const inquirer = require('inquirer');
const branch = require('git-branch');
const git = require('simple-git');

git().add('-A');

module.exports = {
    prompter: prompter,
    formatCommit: formatCommit
};

function prompter(cm, commit) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Type of operation?',
            choices: ['task', 'bug', 'test', 'refactoring'],
        },
        {
            type: 'list',
            name: 'from',
            message: 'Where did you come from?',
            choices: ['develop', 'beta', 'rc-branch', 'master', new inquirer.Separator(), 'other'],
        },
        {
            type: 'input',
            name: 'workflow',
            message: 'Job description:',
            validate: function (input) {
                if (!input) {
                    return 'LOL :) You really don\'t know what you were working on???';
                } else {
                    return true;
                }
            }
        },
    ]).then((answers) => {
        formatCommit(commit, answers);
    });
}

function formatCommit(commit, answers) {
    commit(filter([
        branch.sync().split('/')[1],
        ': ',
        answers.workflow,
        ' [',
        answers.type,
        ' from ',
        answers.from,
        '] (',
        branch.sync(),
        ')'
    ]).join(''));
}

function filter(array) {
    return array.filter(function(item) {
        return !!item;
    });
}