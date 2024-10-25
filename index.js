'use strict';

const inquirer = require('inquirer');
const git = require('simple-git');
const branchName = require('current-git-branch');

module.exports = {
    prompter,
    formatCommit
};

function prompter(cm, commit) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Select the type of change you are committing:',
            choices: [
                {value: 'feat', name: 'FEAT - a new feature'},
                {value: 'fix', name: 'FIX - a bug fix'},
                {value: 'build', name: 'BUILD - changes that affect the build system or external dependencies'},
                {value: 'chore', name: 'CHORE - changes to the build process or auxiliary tools'},
                {value: 'ci', name: 'CI - continuous integration changes'},
                {value: 'docs', name: 'DOCS - documentation only changes'},
                {value: 'perf', name: 'PERF - a code change that improves performance'},
                {value: 'refactor', name: 'REFACTOR - a code change that neither fixes a bug nor adds a feature'},
                {value: 'revert', name: 'REVERT - reverting a previous commit'},
                {value: 'style', name: 'STYLE - changes that do not affect the meaning of the code'},
                {value: 'test', name: 'TEST - adding missing tests or correcting existing tests'},
                new inquirer.Separator()
            ],
        },
        {
            type: 'list',
            name: 'breakingChange',
            message: 'It\'s a BREAKING CHANGE:',
            choices: [
                {value: 'false', name: 'NO'},
                {value: 'true', name: 'Yes'},
                new inquirer.Separator()
            ],
        },
        {
            type: 'input',
            name: 'scope',
            message: 'Enter the scope of the change (optional):',
            default: '',
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Enter a short description of the change:',
            validate: function (input) {
                return input ? true : 'LOL :) You really don\'t know what you were working on???';
            }
        }
    ])
        .then((answers) => {
            formatCommit(commit, answers);
        })
        .catch(err => {
            console.error('An error occurred during the prompt', err);
        });
}

function formatCommit(commit, answers) {
    const scopePart = answers.scope ? `(${answers.scope})` : '';
    const breakingChange = answers.breakingChange === 'true' ? '!' : '';
    const commitMessage = `${answers.type}${scopePart}${breakingChange}: ${answers.subject} [${shortBranch()}]`;

    try {
        commit(commitMessage)
    } catch (err) {
        console.error('\n\n    ! ! ! Commit FAILED ! ! !\n\n\n', err);
    }
}

function shortBranch() {
    const name = branchName();

    if (name.includes("task/")) {
        const format = name.split('/')[1].split('-');
        return format[0] + '-' + format[1];
    }

    return name;
}
