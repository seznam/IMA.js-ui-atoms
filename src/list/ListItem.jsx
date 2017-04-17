import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common ListItem
 *
 * @class ListItem
 * @namespace ima.ui.atom.list
 * @module ima
 * @submodule ima.ui
 */

let ListItem = (props, context) => {
	let helper = context.$Utils.$UIComponentHelper;
	let listItem = null;
	let className = helper.cssClasses({
		'atm-li': true,
		['atm-li-' + props.mode]: props.mode
	}, props.className);

	if (props.children) {
		listItem = (
			<li
					className = { className }
					{...helper.getDataProps(props)}>
				{props.children}
			</li>
		);
	} else {
		listItem = (
			<li
					className = { className}
					{...helper.getDataProps(props)}
					dangerouslySetInnerHTML = { { __html: props.text } }/>
		);
	}

	return listItem;
};

ListItem.contextTypes = {
	$Utils: PropTypes.object
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
