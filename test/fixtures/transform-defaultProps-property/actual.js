import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button onClick={this.props.onClick.bind(this)} className={this.props.className}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: 'btn btn-default',
};
