import React from 'react';
import List from './List';

/**
 * Common ordered HTML List
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class OrderedList extends React.PureComponent {
  render() {
    return <List {...this.props} type="ol" />;
  }
}
