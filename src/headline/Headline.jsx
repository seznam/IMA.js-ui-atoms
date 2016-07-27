import React, { PropTypes } from 'react';

/**
 * Base headline
 *
 * @class Headline
 * @namespace ima.ui.atom.headline
 * @module ima
 * @submodule ima.ui
 */

let Headline = (props, context) => {
	let headline = null;
	let Type = props.type;
	let className = context.$Utils.$UIComponentHelper.cssClasses({
		['atm-headline']: true,
		['atm-' + props.mode]: props.mode,
		['atm-' + Type]: Type
	}, props.className);

	if (props.children) {
		headline = (
			<Type
					id = { props.id }
					className = { className }
					data-e2e = { props['data-e2e'] }>
				{props.children}
			</Type>
		);
	} else {
		headline = (
			<Type
					id = { props.id }
					className = { className }
					data-e2e = { props['data-e2e'] }
					dangerouslySetInnerHTML = { { __html: props.text } }/>
		);
	}

	return headline;
};

Headline.contextTypes = {
	$Utils: React.PropTypes.object
};

Headline.propTypes = {
	id:  PropTypes.string,
	className:  PropTypes.string,
	text: PropTypes.string,
	type: PropTypes.string,
	mode: PropTypes.string,
	"data-e2e": PropTypes.string
};

Headline.defaultProps = {
	id: null,
	className: '',
	text: null,
	mode: null,
	type: 'h1',
	"data-e2e": null
};

export default Headline;
