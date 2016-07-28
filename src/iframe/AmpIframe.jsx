import React from 'react';

/**
 * Amp iframe
 *
 * @class AmpIframe
 * @namespace ima.ui.atom.image
 * @module ima
 * @submodule ima.ui
 */

 let AmpIframe = (props) => {
	return (
		<amp-iframe
				src = { props.src }
				width = { props.width }
				height = { props.height }
				scrolling = { props.scrolling }
				layout = { props.layout }
				sandbox = { props.sandbox }
				frameBorder = { props.frameBorder }
				allowFullScreen = { props.allowFullScreen }
				class = { props.className }
				data-e2e = { props['data-e2e'] }>
			<div placeholder='' />
		</amp-iframe>
	);
};

export default AmpIframe;
