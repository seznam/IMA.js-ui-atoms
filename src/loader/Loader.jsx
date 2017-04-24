import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common loader
 *
 * @class Loader
 * @namespace ima.ui.atom.loader
 * @module ima
 * @submodule ima.ui
 */

let Loader = (props, context) => {
	let helper = context.$Utils.$UIComponentHelper;

	return (
		<div
				className = { helper.cssClasses({
					'atm-loader': true,
					['atm-loader-' + props.mode]: props.mode,
					['atm-loader-' + props.layout]: props.layout
				}, props.className) }
				{...helper.getDataProps(props)}>
			<div className = { helper.cssClasses('atm-loader-animation') }/>
		</div>
	);
};

Loader.contextTypes = {
	$Utils: PropTypes.object
};

Loader.propTypes = {
	mode: PropTypes.string, //possible values: [small, big]
	layout: PropTypes.string, //possible values: [center]
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
