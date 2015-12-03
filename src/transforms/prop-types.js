import utils from '../utils';

export default ({ source }, { jscodeshift: j }, options) => utils(j)
  .findAndReplaceComponentProperty('propTypes')(j(source));
