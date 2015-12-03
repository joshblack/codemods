const utils = (j) => {
  const findComponentClassExportDefault = (path) =>
    path.find(j.ExportDefaultDeclaration, {
      declaration: {
        type: 'ClassDeclaration',
        superClass: {
          type: 'Identifier',
          name: 'Component'
        }
      }
    });

  const findReactComponentClassExportDefault = (path) =>
    path.find(j.ExportDefaultDeclaration, {
      declaration: {
        type: 'ClassDeclaration',
        superClass: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'React'
          },
          property: {
            type: 'Identifier',
            name: 'Component'
          }
        }
      }
    });

  const findComponentProperty = (propertyName) => (path, componentName) =>
    path.find(j.ExpressionStatement, {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        left: {
          object: {
            type: 'Identifier',
            name: componentName
          },
          property: {
            type: 'Identifier',
            name: propertyName
          }
        }
      }
    });

  const findPropTypesProperty = findComponentProperty('propTypes');
  const findDefaultPropsProperty = findComponentProperty('defaultProps');

  // const findPropTypesProperty = (path, componentName) =>
    // path.find(j.ExpressionStatement, {
      // type: 'ExpressionStatement',
      // expression: {
        // type: 'AssignmentExpression',
        // left: {
          // type: 'MemberExpression',
          // object: {
            // type: 'Identifier',
            // name: componentName
          // },
          // property: {
            // type: 'Identifier',
            // name: 'propTypes'
          // }
        // }
      // }
    // });

  const getComponentName = (classPath) =>
    classPath.node.id && classPath.node.id.name

  return {
    findComponentClassExportDefault,
    findReactComponentClassExportDefault,
    findPropTypesProperty,
    findDefaultPropsProperty,
    getComponentName
  };
};

export default utils;

