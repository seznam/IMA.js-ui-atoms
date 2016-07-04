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
	var paragraph = null;

	if (props.children) {

		paragraph = (
			<p
					className = {context.$Utils.$UIComponentHelper.cssClasses({
						'atm-paragraph': true,
						['atm-paragraph-' + props.mode]: props.mode,
						['atm-paragraph-align-' + props.align]: props.align,
						[props.className]: props.className
					})}>
				{props.children}
			</p>
		);
	} else {

		paragraph = (
			<p
					className = {context.$Utils.$UIComponentHelper.cssClasses({
						'atm-paragraph': true,
						['atm-paragraph-' + props.mode]: props.mode,
						['atm-paragraph-align-' + props.align]: props.align,
						[props.className]: props.className
					})}
					dangerouslySetInnerHTML = {{ __html: props.text }}/>
		);
	}

	return paragraph;
};

Paragraph.contextTypes = {
	$Utils: React.PropTypes.object
};

Paragraph.propTypes = {
	className:  PropTypes.string,
	text: PropTypes.oneOfType([PropTypes.string, null]),
	mode: PropTypes.string
};

Paragraph.defaultProps = {
	className: '',
	text: null,
	mode: ''
};

export default Paragraph;
