import PropTypes from 'prop-types';
import React from 'react';
import AmpVideo from './AmpVideo';
import HtmlVideo from './HtmlVideo';

/**
 * Video player.
 *
 * @namespace ima.ui.atom.video
 * @module ima.ui.atom
 */

export default class Video extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
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
	}

	static get defaultProps() {
		return {
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
	}

	render() {
		if (this.context.$Utils.$UIComponentHelper.isAmp()) {
			return <AmpVideo {...props}/>;
		} else {
			return <HtmlVideo {...props}/>;
		}
	}
}
