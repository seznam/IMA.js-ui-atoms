import React from 'react';
import Headline from './Headline';

/**
 * Common H5 title
 *
 * @class H5
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let H5 = (props) => {
	return <Headline {...props} mode = 'h5'/>;
};

export default H5;
