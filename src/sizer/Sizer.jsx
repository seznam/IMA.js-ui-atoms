import React, { PropTypes } from 'react';

/**
 * Common sizer
 *
 * @class Sizer
 * @namespace ima.ui.atom.sizer
 * @module ima
 * @submodule ima.ui
 */

let Sizer = (props, context) => {
	return (
		<div
				className = {context.$Utils.$UIComponentHelper.cssClasses({
					'atm-sizer': true,
					'atm-placeholder': props.placeholder
				}, props.className)}
				style = {{ paddingTop: props.height / props.width * 100 + "%" }}/>
	);
};

Sizer.contextTypes = {
	$Utils: React.PropTypes.object
};

Sizer.propTypes = {
	width:  PropTypes.number,
	height:  PropTypes.number,
	placeholder: PropTypes.bool,
	className: PropTypes.string
};

Sizer.defaultProps = {
	width: 0,
	height: 0,
	placeholder: false,
	className: ''
};

export default Sizer;
