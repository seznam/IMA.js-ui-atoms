import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common loader
 *
 * @namespace ima.ui.atom.loader
 * @module ima.ui.atom
 */

export default class Loader extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      mode: PropTypes.string, //possible values: [small, big]
      layout: PropTypes.string, //possible values: [center]
      color: PropTypes.oneOf(['black', 'white']),
      className: PropTypes.string,
      'data-e2e': PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      mode: '',
      layout: '',
      color: 'black',
      className: '',
      'data-e2e': null
    };
  }

  render() {
    let helper = this.context.$Utils.$UIComponentHelper;

    return (
      <div
        className={helper.cssClasses(
          {
            'atm-loader': true,
            ['atm-loader-' + this.props.mode]: this.props.mode,
            ['atm-loader-' + this.props.layout]: this.props.layout
          },
          this.props.className
        )}
        {...helper.getDataProps(this.props)}>
        <div
          className={helper.cssClasses({
            'atm-loader-animation': true,
            ['atm-loader-animation-' + this.props.color]: this.props.color
          })}
        />
      </div>
    );
  }
}
