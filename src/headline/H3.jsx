import React from 'react';
import Headline from './Headline';

/**
 * Common H3 title
 *
 * @class H3
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let H3 = (props) => {
	return <Headline {...props} mode = 'h3'/>;
};

export default H3;
