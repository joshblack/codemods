import React from 'react';

export default class DefaultProps extends React.Component {
  static defaultProps = {
    className: 'foo'
  };

  render() {
    return <div />;
  }
}

