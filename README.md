<p align="center">
<img src="https://github.com/swttt/HomeyDash/raw/master/.github/logo.png" alt="HomeyDash Logo"/>
</p>

# HomeyDash

> Home-automation dashboard for Homey

HomeyDash is a dashboard that can be used to control devices paired to Homey  ([Athom.com](http://athom.com)) and show information like weather, news, media etc.

#### Work in progress

Current release isn't considered stable yet.

#### Become a Patron!

https://www.patreon.com/homeydash

## Contributing

#### Found Bugs

First make sure the bug hasn't been reported yet. New bugs found can be submitted to the [GitHub Issues](https://github.com/swttt/HomeyDash/issues/new) .
And if you already know a good solution, feel free to make a [Pull Request](https://github.com/swttt/HomeyDash/pulls)!

#### Pull Requests

Pull requests can be done on the develop branch. Until the master branch isn't stable enough (and is considered alpha/beta) the develop branch won't get build and pushed for now. After the master branch is more stable, i will auto build the develop branch to a seperate sub-domain.

#### Plug-ins

Currently there isn't any documentation yet on how to create plugins. Plug-ins are functional, and will be merged once aproved.

A good example of a plug-in is the `power-usage` plugin that you can find in `/src/components/plugins/power-usage`.

Don't forget to add your plugin to the `/src/components/plugins/index.js`!

## Build Setup

Make sure to add this to your HOSTS file: `127.0.0.1     homeydash.local`

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8081
$ npm run dev
```
