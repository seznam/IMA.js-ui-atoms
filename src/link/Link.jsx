import React, { PropTypes } from 'react';

/**
 * Common link
 *
 * @class Link
 * @namespace ima.ui.atom.link
 * @module ima
 * @submodule ima.ui
 */

let Link = (props, context) => {
	let helper = context.$Utils.$UIComponentHelper;

	return (
		<a
				href = { props.href }
				title = { props.title }
				target = { props.target }
				className = { helper.cssClasses({
					'atm-link': true,
					['atm-link-' + props.mode]: props.mode
				}, props.className) }
				onClick = { props.onClick }
				{...helper.getDataProps(props)}>
			{ props.children || props.text }
		</a>
	);
};

Link.contextTypes = {
	$Utils: React.PropTypes.object
};


Link.propTypes = {
	text: PropTypes.string,
	href: PropTypes.string,
	title: PropTypes.string,
	target: PropTypes.string,
	onClick: PropTypes.func,
	mode: PropTypes.string,
	className: PropTypes.string,
	"data-e2e": PropTypes.string
};

Link.defaultProps = {
	text: null,
	mode: '',
	className: '',
	"data-e2e": null
};

export default Link;
