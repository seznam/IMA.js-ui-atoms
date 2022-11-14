import { PageContext } from '@ima/core';
import React from 'react';

/**
 * Common ListItem
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class ListItem extends React.PureComponent {
  static get contextType() {
    return PageContext;
  }

  static get defaultProps() {
    return {
      html: null,
      mode: '',
      style: null,
      className: '',
      'data-e2e': null,
    };
  }

  render() {
    let helper = this.context.$Utils.$UIComponentHelper;
    let { mode, className, children, html, style } = this.props;
    let listItem = null;
    let componentClassName = helper.cssClasses(
      {
        'atm-li': true,
        ['atm-li-' + mode]: mode,
      },
      className
    );

    if (children) {
      listItem = (
        <li
          style={style}
          className={componentClassName}
          {...helper.getEventProps(this.props)}
          {...helper.getDataProps(this.props)}>
          {children}
        </li>
      );
    } else {
      listItem = (
        <li
          style={style}
          className={componentClassName}
          {...helper.getEventProps(this.props)}
          {...helper.getDataProps(this.props)}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }

    return listItem;
  }
}
