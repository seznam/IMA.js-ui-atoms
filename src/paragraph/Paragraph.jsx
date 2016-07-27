import React, { PropTypes } from 'react';

/**
 * Common paragraph
 *
 * @class Paragraph
 * @namespace ima.ui.atom.paragraph
 * @module ima
 * @submodule ima.ui
 */

let Paragraph = (props, context) => {
	let paragraph = null;
	let className = context.$Utils.$UIComponentHelper.cssClasses({
		'atm-paragraph': true,
		['atm-paragraph-' + props.mode]: props.mode,
		['atm-paragraph-align-' + props.align]: props.align
	}, props.className);

	if (props.children) {
		paragraph = (
			<p
					className = { className }
					data-e2e = { props['data-e2e'] }>
				{props.children}
			</p>
		);
	} else {
		paragraph = (
			<p
					className = { className}
					data-e2e = { props['data-e2e'] }
					dangerouslySetInnerHTML = { { __html: props.text } }/>
		);
	}

	return paragraph;
};

Paragraph.contextTypes = {
	$Utils: React.PropTypes.object
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
