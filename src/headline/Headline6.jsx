import { AbstractPureComponent } from '@ima/core';
import React from 'react';
import Headline from './Headline';

/**
 * Common Headline 6 title
 *
 * @namespace ima.ui.atom.headline
 * @module ima.ui.atom
 */
export default class Headline6 extends AbstractPureComponent {
  render() {
    return <Headline {...this.props} type="h6" />;
  }
}
