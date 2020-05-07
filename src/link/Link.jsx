import { PageContext } from '@ima/core';
import React from 'react';

/**
 * Common link
 *
 * @namespace ima.ui.atom.link
 * @module ima.ui.atom
 */

export default class Link extends React.PureComponent {
  static get contextType() {
    return PageContext;
  }

  static get defaultProps() {
    return {
      text: null,
      mode: '',
      style: null,
      className: '',
      'data-e2e': null,
    };
  }

  render() {
    let helper = this.context.$Utils.$UIComponentHelper;
    let {
      href,
      title,
      target,
      mode,
      className,
      onClick,
      children,
      text,
      style,
    } = this.props;

    return (
      <a
        href={href}
        title={title}
        target={target}
        style={style}
        className={helper.cssClasses(
          {
            'atm-link': true,
            ['atm-link-' + mode]: mode,
          },
          className
        )}
        onClick={onClick}
        {...helper.getDataProps(this.props)}
        {...helper.getAriaProps(this.props)}>
        {children || text}
      </a>
    );
  }
}
