import { PageContext, AbstractPureComponent } from '@ima/core';
import React from 'react';

/**
 * Base headline
 *
 * @namespace ima.ui.atom.headline
 * @module ima.ui.atom
 */
export default class Headline extends AbstractPureComponent {
  static get contextType() {
    return PageContext;
  }

  static get defaultProps() {
    return {
      id: null,
      className: '',
      text: null,
      mode: null,
      type: 'h1',
      style: null,
      'data-e2e': null
    };
  }

  render() {
    let headline = null;
    let { type: Type, id, mode, text, className, children, style } = this.props;
    let helper = this.utils.$UIComponentHelper;
    let computedClassName = helper.cssClasses(
      {
        ['atm-headline']: true,
        ['atm-' + mode]: mode,
        ['atm-' + Type]: Type
      },
      className
    );

    if (children) {
      headline = (
        <Type
          id={id}
          style={style}
          className={computedClassName}
          {...helper.getDataProps(this.props)}
          {...helper.getAriaProps(this.props)}>
          {children}
        </Type>
      );
    } else {
      headline = (
        <Type
          id={id}
          style={style}
          className={computedClassName}
          {...helper.getDataProps(this.props)}
          {...helper.getAriaProps(this.props)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    return headline;
  }
}
