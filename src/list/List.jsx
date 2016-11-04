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
	let helper = context.$Utils.$UIComponentHelper;
	let Type = props.type;

	return (
		<Type
				className = { helper.cssClasses({
					'atm-list': true,
					['atm-list-' + props.mode]: props.mode,
					['atm-list-' + Type]: Type
				}, props.className) }
				id = { props.id }
				{...helper.getDataProps(props)}>
			{props.children}
		</Type>
	);
};

List.contextTypes = {
	$Utils: React.PropTypes.object
};

List.propTypes = {
	className:  PropTypes.string,
	mode: PropTypes.string,
	type: PropTypes.string,
	"data-e2e": PropTypes.string
};

List.defaultProps = {
	className: '',
	mode: '',
	type: 'ul',
	"data-e2e": null
};

export default List;
