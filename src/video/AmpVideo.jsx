import { PageContext } from '@ima/core';
import React from 'react';

// @server-side class AmpVideo extends __VARIABLE__ {__CLEAR__}\nexports.default = AmpVideo;

/**
 * Amp video player.
 *
 * @namespace ima.ui.atom.video
 * @module ima.ui.atom
 */
export default class AmpVideo extends React.PureComponent {
  //#if _SERVER
  static get contextType() {
    return PageContext;
  }

  render() {
    let helper = this.context.$Utils.$UIComponentHelper;
    let {
      src,
      poster,
      autoplay,
      controls,
      loop,
      muted,
      width,
      height,
      layout,
      className,
      children,
    } = this.props;

    return (
      <amp-video
        src={src}
        poster={poster}
        autoplay={autoplay}
        controls={controls}
        loop={loop}
        muted={muted}
        width={width}
        height={height}
        layout={layout}
        class={helper.cssClasses(className)}
        {...helper.getDataProps(this.props)}
        {...helper.getAriaProps(this.props)}>
        <div placeholder="" />
        {children}
      </amp-video>
    );
  }
  //#endif
}
