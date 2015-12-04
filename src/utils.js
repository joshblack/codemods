
/**
 * Collection of utility functions used for querying React-specific Nodes
 */
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

  const findComponentClass = (path) =>
    path.find(j.ClassDeclaration, {
      superClass: {
        type: 'Identifier',
        name: 'Component'
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

  const findReactComponentClass = (path) =>
    path.find(j.ClassDeclaration, {
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
    });

  /**
   * Matches any React Component defined as a class with the following
   * superClass types:
   *
   *   - class Foo extends React.Component {} (MemberExpression)
   *   - class Foo extends Component {} (Identifier)
   *
   * and returns the resulting NodePath
   *
   * @param path NodePath
   * @return NodePath
   */
  const findReactComponentExportDefault = (path) => {
    const componentClass = findComponentClassExportDefault(path);

    if (componentClass.size()) {
      return componentClass;
    }

    return findReactComponentClassExportDefault(path);
  };

  const findReactComponent = (path) => {
    const componentClass = findComponentClass(path);

    if (componentClass.size()) {
      return componentClass;
    }

    return findReactComponentClass(path);
  };

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

  const getComponentName = (classPath) =>
    classPath.node.id && classPath.node.id.name;

  const findAndReplaceComponentProperty = (propertyName) => (path) => {
    const findProperty = findComponentProperty(propertyName);
    const componentClass = findReactComponent(path);

    let propertyValue;

    componentClass
      .filter((p) => {
        const name = getComponentName(p);
        const property = findProperty(path, name);

        if (property.size()) {
          const { properties } = property
            .get('expression').node.right;

          propertyValue = properties;
          property.remove();

          return true;
        }

        return false;
      })
      .map((p) => p.get('body'))
      .replaceWith(
        (p) => j.classBody([
          j.classProperty(
            j.identifier(propertyName),
            j.objectExpression(propertyValue),
            null,
            true
          ),
          ...p.node.body
        ]));

    return path.toSource();
  };

  return {
    findReactComponent,
    findReactComponentExportDefault,
    findAndReplaceComponentProperty,
    getComponentName
  };
};

export default utils;

