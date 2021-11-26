Main Build: [![CircleCI](https://circleci.com/gh/epsilonethan/Delethan/tree/main.svg?style=svg)](https://circleci.com/gh/epsilonethan/Delethan/tree/main)


# Delethan
Discord bot for auto deleting messages

## Commands
`/set-rule` - sets up a rule for auto-delete. Requires the channel to be monitored and the lifetime of message in hours. Currently only integer hours are supported.

`/rules` - displays a list of the current rules for a server

`/delete-rule` - deletes a rule for the server. Requires the rule-id to be deleted. The rule-id can be found using the `/rules` command

## Installation
[Link to Invite Delethan](https://discord.com/api/oauth2/authorize?client_id=912017861822779423&permissions=19327428608&scope=bot%20applications.commands)

## Quirks
Ehhh.... It doesn't auto add the slash commands yet. The deploye-commands.js script has to be run which requires clientId and guildId. 