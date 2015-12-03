import React, { Component, PropTypes } from 'react';

export default class DefaultProps extends Component {
  static defaultProps = {
    className: 'btn btn-default'
  };

  render() {
    return <div />;
  }
}

