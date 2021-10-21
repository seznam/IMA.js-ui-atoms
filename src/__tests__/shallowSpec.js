import classnames from 'classnames';
import React from 'react';
import { shallow } from 'enzyme';
import { Infinite } from 'infinite-circle';
import { toMockedInstance } from 'to-mock';
import { withContext } from 'shallow-with-context';

import {
  Sizer,
  UIComponentHelper,
  Visibility,
  ComponentPositions,
} from '../main';

import dummyRouter from '../mocks/router';
import dummyWindow from '../mocks/window';

describe('UIAtoms shallow rendering', () => {
  let wrapper = null;
  const visibility = toMockedInstance(Visibility);
  const componentPositions = toMockedInstance(ComponentPositions);
  const infinite = toMockedInstance(Infinite);
  const uiComponentHelper = new UIComponentHelper(
    dummyRouter,
    dummyWindow,
    visibility,
    componentPositions,
    infinite,
    classnames
  );
  const context = {
    $Utils: {
      $UIComponentHelper: uiComponentHelper,
    },
  };

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('Sizer component', () => {
    beforeEach(() => {
      const Component = withContext(Sizer, context);

      wrapper = shallow(<Component />, { context });
    });

    it('should render sizer and set atm-sizer class', () => {
      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.hasClass('atm-sizer')).toBeTruthy();
    });

    it('should set atm-placeholder class if is defined placeholder props', () => {
      wrapper.setProps({ placeholder: true });

      expect(wrapper.hasClass('atm-placeholder')).toBeTruthy();
    });

    it('should calculate ratio between width and height', () => {
      wrapper.setProps({
        width: 16,
        height: 9,
      });

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.get(0).props.style.paddingTop).toEqual('56.25%');
    });
  });
});
