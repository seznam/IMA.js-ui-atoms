import React from 'react';

/**
 * Amp image
 *
 * @class AmpImage
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

 let AmpImage = (props, context) => {
	let helper = context.$Utils.$UIComponentHelper;

	return (
		<amp-img
				src = { props.src }
				srcSet = { props.srcSet }
				width = { props.width }
				height = { props.height }
				layout = { props.layout }
				alt = { props.alt }
				class = { props.className }
				{...helper.getDataProps(props)}/>
	);
};

export default AmpImage;
