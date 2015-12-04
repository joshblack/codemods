export default (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  let targetNode;

  root.find(j.ExpressionStatement, {
    type: 'ExpressionStatement',
    expression: {
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: 'module'
        },
        property: {
          type: 'Identifier',
          name: 'exports'
        }
      }
    }
  }).forEach((p) => {
    const name = p.value.expression.right.name;
    const [node] = p.scope.getBindings()[name];

    targetNode = node.parentPath;
  }).remove();

  if (targetNode) {
    targetNode.replace(
      j.exportDefaultDeclaration(
        targetNode.value
      )
    );
  }

  return root.toSource();
};
