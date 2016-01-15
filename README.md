# ror-microblog
*Temporary codename*

![circleci](https://circleci.com/gh/Mteuahasan/ror-microblog.svg?style=shield&circle-token=1af1aff1bff43a4498d5847795c6c0d648544772)

Twitter clone made with Ruby on Rails for the API and Aurelia for the front-end application. A school project made in a short time.

`Ruby version: 2.2.3`

*Notes: Front-end dependencies et some Aurelia stuff were pushed on this repo, they shouldn't be here but it really simplified the automated deployement on Heroku.*

## Usage

*Requires node/npm, gulp and jspm*
```sh
  $ npm i -g jspm
```

```sh
  $ bundle install
  $ cd public/
  $ npm install
  $ jspm install -y
```
*JSPM might reach GitHub limits, it will ask to setup GitHub username and password/token. I'd recommend using the token.*

*Aurelia stuff.*
```sh
  $ npm i -g aurelia-cli
  $ cd public/
  $ aurelia bundle
  $ aurelia unbundle
```


## Styleguides

### Git Commit Messages (from [Atom](https://github.com/atom/atom/blob/master/CONTRIBUTING.md))

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Reference issues and pull requests liberally
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings
