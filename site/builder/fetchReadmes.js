import fs from 'fs-promise';
import path from 'path';
import glob from 'glob';

const root = path.resolve(__dirname, '../../');

// const readmeGlob = 'node_modules/d3fc-*/README.md';
const readmeGlob = 'site/SAMPLE.md';

const getPackageName = (inputPath) =>
  inputPath.split('/')[1].replace('d3fc-', '');

export default () =>
  new Promise((resolve, reject) => {
    glob(readmeGlob, { cwd: root }, (err, files) => {
      if (err) {
        console.error('Finding README\'s failed - ', err);
        reject(err);
      }

      const readPromises = files.map(path =>
        fs.readFile(path)
          .then(buffer => ({
            name: getPackageName(path),
            contents: buffer.toString()
          }))
      );

      return Promise
        .all(readPromises)
        .then(resolve)
        .catch(reject);
    });
  });
