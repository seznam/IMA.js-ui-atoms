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
	src: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	scrolling: PropTypes.string,
	layout: PropTypes.string,
	sandbox: PropTypes.string,
	allowFullScreen: PropTypes.bool,
	frameBorder: PropTypes.string,
	className: PropTypes.string,
	"data-e2e": PropTypes.string
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
	className: '',
	"data-e2e": null
};

export default Iframe;
