import React, { PropTypes } from 'react';
import HtmlImage from './HtmlImage';
import AmpImage from './AmpImage';

/**
 * Common image
 *
 * @class Image
 * @namespace app.component.atom.image
 * @module app
 * @submodule app.component
 */

let Image = (props, context) => {
	if (context.$Utils.$UIComponentHelper.isAmp()) {
		return <AmpImage {...props} />;
	} else {
		return <HtmlImage {...props} />;
	}
};

Image.contextTypes = {
	$Utils: React.PropTypes.object
};

Image.propTypes = {
	src: PropTypes.string,
	srcSet: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	layout: PropTypes.string,
	alt: PropTypes.string,
	noloading: PropTypes.bool,
	className: PropTypes.string,
	"data-e2e": PropTypes.string
};

Image.defaultProps = {
	src: null,
	width: null,
	height: null,
	layout: null,
	alt: null,
	noloading: false,
	className: '',
	"data-e2e": null
};

export default Image;
