import { PageContext } from '@ima/core';
import React from 'react';

/**
 * Common sizer
 *
 * @namespace ima.ui.atom.sizer
 * @module ima.ui.atom
 */
export default class Sizer extends React.PureComponent {
  static get contextType() {
    return PageContext;
  }

  static get defaultProps() {
    return {
      width: 1,
      height: 0,
      placeholder: false,
      className: '',
    };
  }

  render() {
    const helper = this.context.$Utils.$UIComponentHelper;
    const { className, height, width, placeholder } = this.props;

    return (
      <div
        className={helper.cssClasses(
          {
            'atm-sizer': true,
            'atm-placeholder': !!placeholder,
          },
          className
        )}
        style={{
          paddingTop: (height / width) * 100 + '%',
        }}
        {...helper.getEventProps(this.props)}
        {...helper.getDataProps(this.props)}
      />
    );
  }
}
