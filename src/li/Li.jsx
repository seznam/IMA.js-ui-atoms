import React, { PropTypes } from 'react';

/**
 * Common Li
 *
 * @class Li
 * @namespace ima.ui.atom.li
 * @module ima
 * @submodule ima.ui
 */

let Li = (props, context) => {
	return (
		<li
				className = {context.$Utils.$UIComponentHelper.cssClasses({
					'atm-li': true,
					['atm-li-' + props.mode]: props.mode,
					[props.className]: props.className
				})}
				data-e2e = {props['data-e2e']}>
			{props.children || props.text}
		</li>
	);
};

Li.contextTypes = {
	$Utils: React.PropTypes.object
};


Li.propTypes = {
	text: PropTypes.oneOfType([PropTypes.string, null]),
	mode: PropTypes.string,
	className: PropTypes.string,
	"data-e2e": PropTypes.oneOfType([PropTypes.bool, null])
};

Li.defaultProps = {
	text: null,
	mode: '',
	className: '',
	"data-e2e": null
};

export default Li;
