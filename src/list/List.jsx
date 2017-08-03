import PropTypes from 'prop-types';
import React from 'react';

/**
 * Common list
 *
 * @namespace ima.ui.atom.list
 * @module ima.ui.atom
 */

export default class List extends React.PureComponent {

	static get contextTypes() {
		return {
			$Utils: PropTypes.object
		};
	}

	static get propTypes() {
		return {
			className:  PropTypes.string,
			mode: PropTypes.string,
			type: PropTypes.string,
			"data-e2e": PropTypes.string
		};
	}

	static get defaultProps() {
		return {
			className: '',
			mode: '',
			type: 'ul',
			"data-e2e": null
		};
	}

	render() {
		let helper = this.context.$Utils.$UIComponentHelper;
		let { type: Type, mode, id, className, children } = this.props;

		return (
			<Type
					className = { helper.cssClasses({
						'atm-list': true,
						['atm-list-' + mode]: mode,
						['atm-list-' + Type]: Type
					}, className) }
					id = { id }
					{...helper.getDataProps(props)}>
				{children}
			</Type>
		);
	}
}
