import React from 'react';

export default class DefaultProps extends Component {
  render() {
    return <div />;
  }
}

DefaultProps.defaultProps = {
  className: 'foo',
};

