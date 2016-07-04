import React from 'react';
import Headline from './Headline';

/**
 * Common H6 title
 *
 * @class H6
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let H6 = (props) => {
	return <Headline {...props} mode = 'h6'/>;
};

export default H6;
