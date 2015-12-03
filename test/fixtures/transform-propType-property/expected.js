import React, { Component, PropTypes } from 'react';
import './Button.scss';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  render() {
    return (
      <button onClick={this.props.onClick.bind(this)} className={this.props.className}>
        {this.props.children}
      </button>
    );
  }
}

Button.defaultProps = {
  className: 'btn btn-default',
};
