import React from 'react';
import Headline from './Headline';

/**
 * Common H1 title
 *
 * @class H1
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let H1 = (props) => {
	return <Headline {...props} mode = 'h1'/>;
};

export default H1;
