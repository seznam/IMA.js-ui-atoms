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
	src: PropTypes.oneOfType([PropTypes.string, null]),
	srcSet: PropTypes.oneOfType([PropTypes.string, null]),
	width: PropTypes.number,
	height: PropTypes.number,
	layout: PropTypes.oneOfType([PropTypes.string, null]),
	alt: PropTypes.oneOfType([PropTypes.string, null]),
	noloading: PropTypes.oneOfType([PropTypes.bool, null]),
	className: PropTypes.string,
	"data-e2e": PropTypes.oneOfType([PropTypes.bool, null])
};

Image.defaultProps = {
	src: null,
	width: 0,
	height: 0,
	className: '',
	"data-e2e": null
};

export default Image;