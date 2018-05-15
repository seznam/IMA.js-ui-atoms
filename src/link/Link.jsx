import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common link
 *
 * @namespace ima.ui.atom.link
 * @module ima.ui.atom
 */

export default class Link extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
			text: PropTypes.string,
			href: PropTypes.string,
			title: PropTypes.string,
			target: PropTypes.string,
			onClick: PropTypes.func,
			mode: PropTypes.string,
			style: PropTypes.object,
			className: PropTypes.string,
			"data-e2e": PropTypes.string
		};
	}

	static get defaultProps() {
		return  {
			text: null,
			mode: '',
			style: null,
			className: '',
			"data-e2e": null
		};
	}

	render() {
		let helper = this.context.$Utils.$UIComponentHelper;
		let { href, title, target, mode, className, onClick, children, text, style } = this.props;

		return (
			<a
					href = { href }
					title = { title }
					target = { target }
					style = { style }
					className = { helper.cssClasses({
						'atm-link': true,
						['atm-link-' + mode]: mode
					}, className) }
					onClick = { onClick }
					{...helper.getDataProps(this.props)}
					{...helper.getAriaProps(this.props)}>
				{ children || text }
			</a>
		);
	}
}
