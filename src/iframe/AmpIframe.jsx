import { PageContext } from '@ima/core';
import React from 'react';

// @server-side class AmpIframe extends __VARIABLE__ {__CLEAR__}\nexports.default = AmpIframe;

/**
 * Amp iframe
 *
 * @namespace ima.ui.atom.iframe
 * @module ima.ui.atom
 */
export default class AmpIframe extends React.PureComponent {
  //#if _SERVER
  static get contextType() {
    return PageContext;
  }

  render() {
    let helper = this.context.$Utils.$UIComponentHelper;
    let {
      src,
      srcDoc,
      width,
      height,
      scrolling,
      layout,
      sandbox,
      frameBorder,
      className,
      allowFullScreen,
      resizable,
      marginWidth,
      marginHeight,
    } = this.props;
    let props = {
      src,
      srcDoc,
      width,
      height,
      scrolling,
      layout,
      sandbox,
      frameBorder,
      marginWidth,
      marginHeight,
      class: helper.cssClasses(className),
    };

    if (allowFullScreen) {
      props.allowFullScreen = '';
    }

    if (resizable) {
      props.resizable = '';
    }

    return (
      <amp-iframe
        {...props}
        {...helper.getDataProps(this.props)}
        {...helper.getAriaProps(this.props)}>
        {this.props.children || <div placeholder="" />}
      </amp-iframe>
    );
  }
  //#endif
}
