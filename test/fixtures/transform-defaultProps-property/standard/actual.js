import React, { Component, PropTypes } from 'react';

export default class DefaultProps extends Component {
  render() {
    return <div />;
  }
}

DefaultProps.defaultProps = {
  className: 'btn btn-default',
};

