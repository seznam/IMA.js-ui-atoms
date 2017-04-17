import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common sizer
 *
 * @class Sizer
 * @namespace ima.ui.atom.sizer
 * @module ima
 * @submodule ima.ui
 */

export default function Sizer(props, context) {
	let helper = context.$Utils.$UIComponentHelper;
	return (
		<div
				className = { helper.cssClasses({
					'atm-sizer': true,
					'atm-placeholder': props.placeholder
				}, props.className) }
				style = { { paddingTop: props.height / props.width * 100 + '%' } }
				{...helper.getDataProps(props)}/>
	);
}

Sizer.contextTypes = {
	$Utils: PropTypes.object
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
