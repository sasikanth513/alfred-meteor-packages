# alfred-meteor-packages

> [Alfred 3](https://www.alfredapp.com) workflow search meteor packages

<img src="https://raw.githubusercontent.com/sasikanth513/alfred-meteor-packages/master/alfred-meteor-packages.gif">

## Install

```
$ npm install --global alfred-meteor-packages
```

or download it from [here](https://raw.githubusercontent.com/sasikanth513/alfred-meteor-packages/master/alfred-meteor-packages.alfredworkflow)

*Requires [Node.js](https://nodejs.org) 4+ and the Alfred 3 [Powerpack](https://www.alfredapp.com/powerpack/).*

## Usage

In Alfred, type `mp` followed by a package name

`return` - to copy `meteor add package-name` to clipboard

`cmd + return` to redirect to github page. if github url is not found then we redirect to atmosphere page

## Contribute

`sync/packages.js` has all the code to sync all packages from meteor server `packages.meteor.com` and save all the data to a file.

## License

MIT © [Sasikanth](https://sasi.io)