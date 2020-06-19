# hyperia-commitizer

A commitizen adapter for [Jira smart commits](https://confluence.atlassian.com/display/FISHEYE/Using+smart+commits).

![Screenshot](other/screenshot.png)

## Global Installation

For a quick global installation of the plugin, simply run the `install.sh` script present in this repo:

```
chmod +x install.sh

./install.sh
```

## Add this adapter

Install this adapter

```
npm install hyperia-commitizer
```

## Create `.cz.json`

```json
{
  "path": "node_modules/hyperia-commitizer"
}
```


## Run 

- with pre-commit `git cz`
- without pre-commit `git cz -n`

## Program process

after run:
- auto run command: `git add -A`
- question **<list (type)>**: _Type of operation:_ `['task', 'bug', 'test', 'refactoring']`
- question **<list (from)>**: _Where did you come from?:_ `['develop', 'beta', 'rc-branch', 'master', 'other']`
- question **<input (workflow)>**: _Job description:_
- create commit from question and actual branch name in format:
```
<actualBranchName after '/'>: <workflow> [<type> from <from>] (<actualBranchName>)
```
## Example
- actual branch: `task/JIRA-5555`
- finnal commit: `JIRA-5555: Job description... [task from dev] (task/JIRA-5555)`


