import PropTypes from 'prop-types';
import React from 'react';
import HtmlImage from './HtmlImage';
import AmpImage from './AmpImage';

/**
 * Common image
 *
 * @namespace ima.ui.atom.image
 * @module ima.ui.atom
 */

export default class Image extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
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
	}

	static get defaultProps() {
		return {
			src: null,
			width: null,
			height: null,
			layout: null,
			alt: null,
			noloading: false,
			className: '',
			"data-e2e": null
		};
	}

	render() {
		if (this.context.$Utils.$UIComponentHelper.isAmp()) {
			return <AmpImage {...this.props}/>;
		} else {
			return <HtmlImage {...this.props}/>;
		}
	}

}
