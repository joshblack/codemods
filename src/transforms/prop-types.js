import utils from '../utils';

export default (file, api, options) => {
  const j = api.jscodeshift;
  const {
    findComponentClassExportDefault,
    findReactComponentClassExportDefault,
    findPropTypesProperty,
    getComponentName } = utils(j);

  const root = j(file.source);
  const componentClass = findComponentClassExportDefault(root);

  let propTypes;

  componentClass
    .find(j.ClassDeclaration)
    .map((p) => {
      const name = getComponentName(p);
      const propTypesProperty = findPropTypesProperty(root, name);
      const { properties } = propTypesProperty.get('expression').node.right;

      propTypes = properties;
      propTypesProperty.remove();

      return p.get('body');
    })
    .replaceWith(
      (p) => j.classBody([
        j.classProperty(
          j.identifier('propTypes'),
          j.objectExpression(propTypes),
          null,
          true
        ),
        ...p.node.body
      ]));

  return root.toSource();
};
