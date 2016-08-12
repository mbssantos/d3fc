import fetchReadmes from './fetchReadmes';
import parseReadmes from './parseReadmes';
import filterReadmes from './filterReadmes';
import yamlSerialize from './yamlSerialize';

fetchReadmes()
  .then(parseReadmes)
  .then(filterReadmes)
  .then(yamlSerialize)
  .catch(err => console.log(err));
