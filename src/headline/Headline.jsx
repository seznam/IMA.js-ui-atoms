import React, { PropTypes } from 'react';

/**
 * Base headline
 *
 * @class Headline
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let Headline = (props, context) => {
	let Type = props.mode;

	return (
		<Type
				id = {props.id}
				className = {context.$Utils.$UIComponentHelper.cssClasses({
					['atm-' + Type]: Type,
					[props.className]: props.className
				})}>
			{props.children || props.text}
		</Type>
	);
};

Headline.contextTypes = {
	$Utils: React.PropTypes.object
};

Headline.propTypes = {
	id:  PropTypes.string,
	className:  PropTypes.string,
	text: PropTypes.string,
	mode: PropTypes.string
};

Headline.defaultProps = {
	id: null,
	className: '',
	text: null,
	mode: 'h1'
};

export default Headline;
