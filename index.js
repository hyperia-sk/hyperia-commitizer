'use strict';

const inquirer = require('inquirer');
const git = require('simple-git');
const branchName = require('current-git-branch');

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
            choices: ['task', 'bug', 'fix', 'update', 'merging', 'test', 'refactoring', 'experiment'],
        },
        {
            type: 'list',
            name: 'from',
            message: 'Where did you come from?',
            choices: ['master', 'beta', new inquirer.Separator(), 'other'],
        },
        {
            type: 'input',
            name: 'fromManual',
            message: 'Name of the parent branch:',
            when: (answers) => answers.from === 'other',
            validate: function (input) {
                if (!input) {
                    return 'LOL ;) You really don\'t know where you came from?';
                } else {
                    return true;
                }
            }
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
        {
            type: 'list',
            name: 'pushing',
            message: 'Do you want to PUSH automatically?',
            choices: ['yes', 'no'],
        },
    ]).then((answers) => {
        formatCommit(commit, answers);
    });
}

function formatCommit(commit, answers) {
    git().add('-A');

    commit(filter([
        shortBranch(),
        ': ',
        answers.workflow,
        ' [',
        answers.type,
        ' from ',
        (answers.fromManual ? answers.fromManual : answers.from),
        '] (',
        branchName(),
        ')'
    ]).join(''));

    if(answers.pushing === 'yes'){
        git()
            .push('origin', 'HEAD')
            .then(() => {
                console.log('\n\n    - - Pushing to Repo finished SUCCESSFULLY - -\n\n');
            })
            .catch((err) => {
                console.error('\n\n    ! ! ! Pushing to Repo FAILED ! ! !\n\n\n', err);
            });
    }
}

function shortBranch() {
    var name = branchName();

    if(name.includes("task/")){
        var format = name.split('/')[1].split('-');

        return format[0] + '-' + format[1];
    }

    return name;
}

function filter(array) {
    return array.filter(function(item) {
        return !!item;
    });
}