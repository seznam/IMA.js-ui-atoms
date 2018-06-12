import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common ListItem
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class ListItem extends React.PureComponent {
  static get contextTypes() {
    return {
      $Utils: PropTypes.object
    };
  }

  static get propTypes() {
    return {
      text: PropTypes.string,
      mode: PropTypes.string,
      style: PropTypes.object,
      className: PropTypes.string,
      'data-e2e': PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      text: null,
      mode: '',
      style: null,
      className: '',
      'data-e2e': null
    };
  }

  render() {
    let helper = this.context.$Utils.$UIComponentHelper;
    let { mode, className, children, text, style } = this.props;
    let listItem = null;
    let componentClassName = helper.cssClasses(
      {
        'atm-li': true,
        ['atm-li-' + mode]: mode
      },
      className
    );

    if (children) {
      listItem = (
        <li
          style={style}
          className={componentClassName}
          {...helper.getDataProps(this.props)}>
          {children}
        </li>
      );
    } else {
      listItem = (
        <li
          style={style}
          className={componentClassName}
          {...helper.getDataProps(this.props)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      );
    }

    return listItem;
  }
}
