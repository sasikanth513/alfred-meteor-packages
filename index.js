const alfy = require('alfy');
const query = alfy.input;
const dataURL = `https://gist.githubusercontent.com/sasikanth513/8d0f73fbc9e312281a1795e0ea2cccbb/raw/2494834cef27223dc138b4ffc6ce04a885474923/meteor-packages.json`;

const atmoshphereURL = name => `https://atmospherejs.com/?q=${encodeURIComponent(name)}`

alfy.fetch(dataURL).then(data => {
  const items = alfy
    .inputMatches(data, 'name')
    .map(item => ({
      title: item.name,
      subtitle: item.homepage ? item.homepage : atmoshphereURL(item.name),
      arg: `meteor add ${item.name}`,
      variables: {
        action: 'clipboard'
      },
      mods: {
        cmd: {
          arg: item.homepage ? `${item.homepage}#readme` : atmoshphereURL(item.name),
          subtitle: 'Open the package page in github',
          variables: {
            action: 'browser'
          }
        }
      },
    }));

  alfy.output(items);
});
