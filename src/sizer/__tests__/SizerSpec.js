import React from 'react';
import { shallow } from 'enzyme';
import Sizer from '../Sizer';
import UIComponentHelper from '../../UIComponentHelper';
import dummyRouter from '../../mocks/router';
import dummyWindow from '../../mocks/window';

describe('Sizer component', () => {

	let wrapper = null;
	let uiComponentHelper = new UIComponentHelper(dummyRouter, dummyWindow);
	let context = {
		$Utils: {
			$UIComponentHelper: uiComponentHelper
		}
	};

	beforeEach(() => {
		wrapper = shallow(<Sizer />, { context });
	});

	it('should set atm-sizer class', () => {
		expect(wrapper.hasClass('atm-sizer')).toBeTruthy();
	});

	it('should set atm-placeholder class if is defined placeholder props', () => {
		wrapper.setProps({ placeholder: true });

		expect(wrapper.hasClass('atm-placeholder')).toBeTruthy();
	});

	it('should calculate ratio between width and height', () => {
		wrapper.setProps({
			width: 16,
			height: 9
		});

		expect(wrapper.get(0).props.style.paddingTop).toEqual('56.25%');
	});

});
