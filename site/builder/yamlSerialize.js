import { safeDump } from 'js-yaml';
import fs from 'fs-promise';
import path from 'path';

const dist = (pathname) => path.resolve(__dirname, '../dist', pathname);

function convertToYaml(readme) {
  readme.yaml = safeDump(readme.structure);
  return readme;
}

export default (readmes) =>
  new Promise((resolve, reject) => {
    console.log('YAML-IFYING READMES');
    readmes = readmes.map(convertToYaml);

    const writePromises = readmes.map(readme =>
      fs.writeFile(`${dist(readme.name.split('.')[0])}.yaml`, readme.yaml));

    return Promise
      .all(writePromises)
      .then(() => console.log('DONE YAML-IFYING READMES'))
      .then(() => readmes)
      .then(resolve)
      .catch(reject);
  });
