import React from 'react';

export default class DefaultProps extends React.Component {
  render() {
    return <div />;
  }
}

DefaultProps.defaultProps = {
  className: 'foo',
};

