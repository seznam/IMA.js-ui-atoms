import React, { PropTypes } from 'react';

/**
 * Common ListItem
 *
 * @class ListItem
 * @namespace ima.ui.atom.list
 * @module ima
 * @submodule ima.ui
 */

let ListItem = (props, context) => {
	let listItem = null;
	let className = context.$Utils.$UIComponentHelper.cssClasses({
		'atm-li': true,
		['atm-li-' + props.mode]: props.mode
	}, props.className);

	if (props.children) {
		listItem = (
			<li
					className = { className }
					data-e2e = { props['data-e2e'] }>
				{props.children}
			</li>
		);
	} else {
		listItem = (
			<li
					className = { className}
					data-e2e = { props['data-e2e'] }
					dangerouslySetInnerHTML = { { __html: props.text } }/>
		);
	}

	return listItem;
};

ListItem.contextTypes = {
	$Utils: React.PropTypes.object
};


ListItem.propTypes = {
	text: PropTypes.string,
	mode: PropTypes.string,
	className: PropTypes.string,
	"data-e2e": PropTypes.string
};

ListItem.defaultProps = {
	text: null,
	mode: '',
	className: '',
	"data-e2e": null
};

export default ListItem;
