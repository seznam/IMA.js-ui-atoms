import React from 'react';
import List from './List';

/**
 * Common ordered HTML List
 *
 * @class OrderedList
 * @namespace ima.ui.atom.list
 * @module ima
 * @submodule ima.ui
 */

let OrderedList = (props) => {
	return <List {...props} type = 'ol'/>;
};

export default OrderedList;
