import PropTypes from 'prop-types';
import React from 'react';
import HtmlImage from './HtmlImage';
import AmpImage from './AmpImage';

/**
 * Common image
 *
 * @namespace ima.ui.atom.image
 * @module ima.ui.atom
 */

export default class Image extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      src: PropTypes.string,
      srcSet: PropTypes.string,
      sizes: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      alt: PropTypes.string,
      onLoad: PropTypes.func,
      onError: PropTypes.func,
      className: PropTypes.string,
      'data-e2e': PropTypes.string,
      layout: PropTypes.string,
      noloading: PropTypes.bool,
      extendedPadding: PropTypes.number,
      imgClassName: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      src: null,
      srcSet: null,
      sizes: null,
      width: null,
      height: null,
      alt: null,
      className: '',
      'data-e2e': null,
      layout: null,
      noloading: false,
      extendedPadding: 0,
      imgClassName: ''
    };
  }

  render() {
    if (this.context.$Utils.$UIComponentHelper.isAmp()) {
      return <AmpImage {...this.props} />;
    } else {
      return <HtmlImage {...this.props} />;
    }
  }
}
