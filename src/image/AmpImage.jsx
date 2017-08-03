import PropTypes from 'prop-types';
import React from 'react';

/**
 * Amp image
 *
 * @namespace ima.ui.atom.image
 * @module ima.ui.atom
 */

export default class AmpIframe extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	render() {
		let helper = this.context.$Utils.$UIComponentHelper;
		let { src, srcSet, width, height, layout, alt, className } = this.props;

		return (
			<amp-img
					src = { src }
					srcSet = { srcSet }
					width = { width }
					height = { height }
					layout = { layout }
					alt = { alt }
					class = { helper.cssClasses(className) }
					{...helper.getDataProps(props)}/>
		);
	}
}
