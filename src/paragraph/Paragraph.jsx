import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common paragraph
 *
 * @namespace ima.ui.atom.paragraph
 * @module ima.ui.atom
 */

export default class Paragraph extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
			className:  PropTypes.string,
			text: PropTypes.string,
			mode: PropTypes.string,
			style: PropTypes.object,
			"data-e2e": PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			className: '',
			text: null,
			mode: '',
			style: null,
			"data-e2e": null
		};
	}

	render() {
		let helper = this.context.$Utils.$UIComponentHelper;
		let { mode, align, className, children, text, style } = this.props;
		let paragraph = null;
		let componentClassName = helper.cssClasses({
			'atm-paragraph': true,
			['atm-paragraph-' + mode]: mode,
			['atm-paragraph-align-' + align]: align
		}, className);

		if (children) {
			paragraph = (
				<p
						style = { style }
						className = { componentClassName }
						{...helper.getDataProps(this.props)}
						{...helper.getAriaProps(this.props)}>
					{ children }
				</p>
			);
		} else {
			paragraph = (
				<p
						style = { style }
						className = { componentClassName }
						{...helper.getDataProps(this.props)}
						{...helper.getAriaProps(this.props)}
						dangerouslySetInnerHTML = { { __html: text } }/>
			);
		}

		return paragraph;
	}
}
