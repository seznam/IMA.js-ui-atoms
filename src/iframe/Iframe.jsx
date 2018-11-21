import PropTypes from 'prop-types';
import React from 'react';
import HtmlIframe from './HtmlIframe';
import AmpIframe from './AmpIframe';

/**
 * Common iframe
 *
 * @namespace ima.ui.atom.iframe
 * @module ima.ui.atom
 */
export default class Iframe extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      src: PropTypes.string,
      srcDoc: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
      scrolling: PropTypes.string,
      layout: PropTypes.string,
      sandbox: PropTypes.string,
      allow: PropTypes.string,
      allowFullScreen: PropTypes.bool,
      resizable: PropTypes.bool,
      frameBorder: PropTypes.string,
      noloading: PropTypes.bool,
      className: PropTypes.string,
      onLoad: PropTypes.func,
      'data-e2e': PropTypes.string,
      marginWidth: PropTypes.number,
      marginHeight: PropTypes.number
    };
  }

  static get defaultProps() {
    return {
      src: null,
      srcDoc: null,
      width: null,
      height: null,
      scrolling: 'no',
      layout: null,
      sandbox: null,
      allow: null,
      allowFullScreen: null,
      resizable: false,
      frameBorder: '0',
      noloading: false,
      className: '',
      onLoad: null,
      'data-e2e': null,
      marginWidth: null,
      marginHeight: null
    };
  }

  render() {
    if (this.context.$Utils.$UIComponentHelper.isAmp()) {
      return <AmpIframe {...this.props} />;
    } else {
      return <HtmlIframe {...this.props} />;
    }
  }
}
