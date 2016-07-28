import React from 'react';

/**
 * Amp image
 *
 * @class AmpImage
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

 let AmpImage = (props) => {
	return (
		<amp-img
				src = { props.src }
				srcSet = { props.srcSet }
				width = { props.width }
				height = { props.height }
				layout = { props.layout }
				alt = { props.alt }
				class = { props.className }
				data-e2e = { props['data-e2e'] } />
	);
};

export default AmpImage;
