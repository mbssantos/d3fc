import fetchReadmes from './fetchReadmes';
import parseReadmes from './parseReadmes';
import yamlSerialize from './yamlSerialize';

fetchReadmes()
  .then(parseReadmes)
  .then(yamlSerialize)
  .catch(err => console.log(err));
