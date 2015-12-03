import utils from '../utils';

export default (file, api, options) => {
  const j = api.jscodeshift;
  const {
    findComponentClassExportDefault,
    findReactComponentClassExportDefault,
    findDefaultPropsProperty,
    getComponentName } = utils(j);

  const root = j(file.source);
  const componentClass = findComponentClassExportDefault(root);

  let defaultProps;

  const findAndSaveDefaultProps = componentClass
    .find(j.ClassDeclaration)
    .map((p) => {
      const name = getComponentName(p);
      const defaultPropsProperty = findDefaultPropsProperty(root, name);

      if (defaultPropsProperty) {
        const { properties } = defaultPropsProperty.get('expression').node.right;

        defaultProps = properties;
        defaultPropsProperty.remove();
      }

      return p.get('body');
    })

  if (findAndSaveDefaultProps.size()) {
    findAndSaveDefaultProps
      .replaceWith(
        (p) => j.classBody([
          j.classProperty(
            j.identifier('defaultProps'),
            j.objectExpression(defaultProps),
            null,
            true
          ),
          ...p.node.body
        ]));
  }



  return root.toSource();
};
