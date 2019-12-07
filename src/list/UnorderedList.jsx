import { AbstractPureComponent } from '@ima/core';
import React from 'react';
import List from './List';

/**
 * Common unordered HTML List
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class UnorderedList extends AbstractPureComponent {
  render() {
    return <List {...this.props} type="ul" />;
  }
}
