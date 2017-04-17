import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common paragraph
 *
 * @class Paragraph
 * @namespace ima.ui.atom.paragraph
 * @module ima
 * @submodule ima.ui
 */

let Paragraph = (props, context) => {
	let helper = context.$Utils.$UIComponentHelper;
	let paragraph = null;
	let className = helper.cssClasses({
		'atm-paragraph': true,
		['atm-paragraph-' + props.mode]: props.mode,
		['atm-paragraph-align-' + props.align]: props.align
	}, props.className);

	if (props.children) {
		paragraph = (
			<p
					className = { className }
					{...helper.getDataProps(props)}>
				{props.children}
			</p>
		);
	} else {
		paragraph = (
			<p
					className = { className}
					{...helper.getDataProps(props)}
					dangerouslySetInnerHTML = { { __html: props.text } }/>
		);
	}

	return paragraph;
};

Paragraph.contextTypes = {
	$Utils: PropTypes.object
};

Paragraph.propTypes = {
	className:  PropTypes.string,
	text: PropTypes.string,
	mode: PropTypes.string,
	"data-e2e": PropTypes.string
};

Paragraph.defaultProps = {
	className: '',
	text: null,
	mode: '',
	"data-e2e": null
};

export default Paragraph;
