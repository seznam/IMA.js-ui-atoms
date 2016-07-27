import React from 'react';
import Headline from './Headline';

/**
 * Common Headline 1 title
 *
 * @class Headline1
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let Headline1 = (props) => {
	return <Headline {...props} type = 'h1'/>;
};

export default Headline1;
