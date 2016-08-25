import { safeDump } from 'js-yaml';
import fs from 'fs-promise';
import path from 'path';

const dist = (pathname) => path.resolve(__dirname, '../src/api', pathname);

function serialize(readme) {
  const yaml = safeDump({
    layout: 'api',
    section: 'api',
    title: readme.name,
    structure: readme.structure
  });
  return `---
${yaml}
---
`;
}

export default (readmes) =>
  new Promise((resolve, reject) => {
    console.log('YAML-IFYING READMES');

    const writePromises = readmes.map(readme =>
      fs.writeFile(`${dist(readme.name.split('.')[0])}.md`, serialize(readme))
    );
    const readmeObject = {
      api: readmes
    };

    return Promise
      .all(writePromises)
      .then(() => console.log('DONE YAML-IFYING READMES'))
      .then(() => readmeObject)
      .then(resolve)
      .catch(reject);
  });
