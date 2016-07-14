import React, { PropTypes } from 'react';

/**
 * Common list
 *
 * @class List
 * @namespace ima.ui.atom.list
 * @module ima
 * @submodule ima.ui
 */

 let List = (props, context) => {
	return (
		<ul
				className = { context.$Utils.$UIComponentHelper.cssClasses({
					'atm-list': true,
					['atm-list-' + props.mode]: props.mode,
					[props.className]: props.className
				})}
				data-e2e = {props['data-e2e']}>
			{props.children}
		</ul>
	);
};

List.contextTypes = {
	$Utils: React.PropTypes.object
};

List.propTypes = {
	className:  PropTypes.string,
	mode: PropTypes.string,
	"data-e2e": PropTypes.string
};

List.defaultProps = {
	className: '',
	mode: '',
	"data-e2e": null
};

export default List;
