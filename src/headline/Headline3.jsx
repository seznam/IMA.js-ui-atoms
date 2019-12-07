import { AbstractPureComponent } from '@ima/core';
import React from 'react';
import Headline from './Headline';

/**
 * Common Headline 3 title
 *
 * @namespace ima.ui.atom.headline
 * @module ima.ui.atom
 */
export default class Headline3 extends AbstractPureComponent {
  render() {
    return <Headline {...this.props} type="h3" />;
  }
}
