import React from 'react';
import Headline from './Headline';

/**
 * Common H4 title
 *
 * @class H4
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let H4 = (props) => {
	return <Headline {...props} mode = 'h4'/>;
};

export default H4;
