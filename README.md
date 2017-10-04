![](https://img.shields.io/badge/Version-Alpha-orange.svg)
![https://gitter.im/git-token/Lobby](https://img.shields.io/badge/Gitter-Chat-brightgreen.svg?colorB=5504f2) 
![https://GitToken.org](https://img.shields.io/badge/GitToken-ORG-brightgreen.svg)

# GitToken Command Line Interface

The GitToken CLI is the primary interface to GitToken services. The two main services it supports are registering an organization and viewing data related to organizations on the GitToken network.

## Installing GitToken CLI

Using NPM or Yarn run `npm i -g git-token@alpha` or `yarn global add git-token@alpha`

## Registering an Organization

Register by running `git token register` in your terminal.

`git token rebase` will eventually be used to migrate contracts when new versions of GitToken contracts are released or when migrating contracts to different blockchain networks.

## GitToken Terminal

The GitToken Terminal listens to contract events in real-time for a selected organization. The terminal will eventually provide a decentralized auction and exchange for GitToken projects.

The GitToken Terminal is automatically installed with the GitToken CLI package. To access the terminal run

`git token terminal`
