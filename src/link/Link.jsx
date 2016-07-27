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
	return (
		<a
				href = { props.href }
				title = { props.title }
				target = { props.target }
				className = { context.$Utils.$UIComponentHelper.cssClasses({
					'atm-link': true,
					['atm-link-' + props.mode]: props.mode
				}, props.className) }
				data-e2e = { props['data-e2e'] }
				onClick = { props.onClick }>
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
