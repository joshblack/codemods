import utils from '../utils';

export default ({ source }, { jscodeshift }, options) => utils(jscodeshift)
  .findAndReplaceComponentProperty('propTypes')(jscodeshift(source));
