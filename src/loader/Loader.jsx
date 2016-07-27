import React, { PropTypes } from 'react';

/**
 * Common loader
 *
 * @class Loader
 * @namespace ima.ui.atom.loader
 * @module ima
 * @submodule ima.ui
 */

let Loader = (props, context) => {
	return (
		<div
				className = { context.$Utils.$UIComponentHelper.cssClasses({
					'atm-loader': true,
					['atm-loader-' + props.mode]: props.mode,
					['atm-loader-' + props.layout]: props.layout
				}, props.className) }
				data-e2e = { props['data-e2e'] }>
			<span />
			<span />
			<span />
			<span />
			<span />
		</div>
	);
};

Loader.contextTypes = {
	$Utils: React.PropTypes.object
};

Loader.propTypes = {
	mode: PropTypes.string,
	layout: PropTypes.string,
	className: PropTypes.string,
	"data-e2e": PropTypes.string
};

Loader.defaultProps = {
	mode: '',
	layout: '',
	className: '',
	"data-e2e": null
};

export default Loader;
