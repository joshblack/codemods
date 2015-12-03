import React from 'react';

export default class DefaultProps extends Component {
  static defaultProps = {
    className: 'foo'
  };

  render() {
    return <div />;
  }
}

