<p align="center">
<img src="https://github.com/swttt/HomeyDash/raw/master/.github/logo.png" alt="HomeyDash Logo"/>
</p>

# HomeyDash

> Home-automation dashboard for Homey

HomeyDash is a dashboard that can be used to control devices paired to Homey  ([Athom.com](http://athom.com)) and show information like weather, news, media etc.


#### Support this project, become a Patron!

To keep the server and coffee running, please consider becoming a patron!

<a href="https://www.patreon.com/bePatron?u=9768305"><img width="175" src="https://github.com/swttt/HomeyDash/raw/next/.github/patreon.png" alt="HomeyDash Logo"/></a>

## Contributing

#### Found Bugs

First make sure the bug hasn't been reported yet. New bugs found can be submitted to the [GitHub Issues](https://github.com/swttt/HomeyDash/issues/new) .
And if you already know a good solution, feel free to make a [Pull Request](https://github.com/swttt/HomeyDash/pulls)!

#### Pull Requests

Pull requests can be done on the develop branch. Until the master branch isn't stable enough (and is considered alpha/beta) the develop branch won't get build and pushed for now. After the master branch is more stable, i will auto build the develop branch to a seperate sub-domain.

## Build Setup

Make sure to add this to your HOSTS file: `127.0.0.1     homeydash.local`

``` bash
# you need the quasar-cli
$ npm install -g quasar-cli

# install all other dependencies
$ npm install

# serve with hot reload at localhost:8081
$ npm run dev
```
