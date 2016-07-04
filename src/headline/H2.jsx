import React from 'react';
import Headline from './Headline';

/**
 * Common H2 title
 *
 * @class H2
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let H2 = (props) => {
	return <Headline {...props} mode = 'h2'/>;
};

export default H2;
