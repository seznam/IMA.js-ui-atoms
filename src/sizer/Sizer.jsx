import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common sizer
 *
 * @namespace ima.ui.atom.sizer
 * @module ima.ui.atom
 */
export default class Sizer extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
			width:  PropTypes.number,
			height:  PropTypes.number,
			placeholder: PropTypes.bool,
			className: PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			width: 0,
			height: 0,
			placeholder: false,
			className: ''
		};
	}

	render() {
		let helper = this.context.$Utils.$UIComponentHelper;

		return (
			<div
					className = { helper.cssClasses({
						'atm-sizer': true,
						'atm-placeholder': this.props.placeholder
					}, this.props.className) }
					style = { { paddingTop: this.props.height / this.props.width * 100 + '%' } }
					{ ...helper.getDataProps(this.props) }/>
		);
	}
}
