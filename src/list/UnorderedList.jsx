import React from 'react';
import List from './List';

/**
 * Common unordered HTML List
 *
 * @class OrderedList
 * @namespace ima.ui.atom.list
 * @module ima
 * @submodule ima.ui
 */

let UnorderedList = (props) => {
	return <List {...props} type = 'ul'/>;
};

export default UnorderedList;
