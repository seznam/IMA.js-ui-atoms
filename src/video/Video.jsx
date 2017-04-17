import PropTypes from 'prop-types';
import React from 'react';
import AmpVideo from './AmpVideo';
import HtmlVideo from './HtmlVideo';

/**
 * Video player.
 *
 * @class Video
 * @namespace ima.ui.atom.video
 * @module ima
 * @submodule ima.ui
 */

export default function Video(props, context) {
	if (context.$Utils.$UIComponentHelper.isAmp()) {
		return <AmpVideo {...props}/>;
	} else {
		return <HtmlVideo {...props}/>;
	}
}

Video.contextTypes = {
	$Utils: PropTypes.object
};

Video.propTypes = {
	src: PropTypes.string,
	poster: PropTypes.string,
	autoplay: PropTypes.bool,
	controls: PropTypes.bool,
	loop: PropTypes.bool,
	muted: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
	layout: PropTypes.string,
	className: PropTypes.string,
	noloading: PropTypes.bool
};

Video.defaultProps = {
	src: null,
	poster: null,
	autoplay: false,
	controls: false,
	loop: false,
	muted: false,
	width: null,
	height: null,
	layout: null,
	className: '',
	noloading: false
};
