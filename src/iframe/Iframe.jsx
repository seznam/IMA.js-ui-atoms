import React, { PropTypes } from 'react';
import HtmlIframe from './HtmlIframe';
import AmpIframe from './AmpIframe';

/**
 * Common iframe
 *
 * @class Iframe
 * @namespace ima.ui.atom.iframe
 * @module ima
 * @submodule ima.ui
 */
let Iframe = (props, context) => {
	if (context.$Utils.$UIComponentHelper.isAmp()) {
		return <AmpIframe {...props} />;
	} else {
		return <HtmlIframe {...props} />;
	}
};

Iframe.contextTypes = {
	$Utils: React.PropTypes.object
};

Iframe.propTypes = {
	src: PropTypes.oneOfType([PropTypes.string, null]),
	width: PropTypes.oneOfType([PropTypes.number, null]),
	height: PropTypes.oneOfType([PropTypes.number, null]),
	scrolling: PropTypes.oneOfType([PropTypes.string, null]),
	layout: PropTypes.oneOfType([PropTypes.string, null]),
	sandbox: PropTypes.oneOfType([PropTypes.string, null]),
	allowFullScreen: PropTypes.oneOfType([PropTypes.bool, null]),
	frameBorder: PropTypes.string,
	className: PropTypes.string
};

Iframe.defaultProps = {
	src: null,
	width: null,
	height: null,
	scrolling: 'no',
	layout: null,
	sandbox: null,
	allowFullScreen: null,
	frameBorder: '0',
	className: ''
};

export default Iframe;
