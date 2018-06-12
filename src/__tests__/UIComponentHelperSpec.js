import { toMockedInstance } from 'to-mock';
import classnames from 'classnames';

import ComponentPositions from '../ComponentPositions';
import UIComponentHelper from '../UIComponentHelper';
import Visibility from '../Visibility';
import { Infinite } from 'infinite-circle';

import _router from '../mocks/router';
import _window from '../mocks/window';

describe('UIComponentHelper', () => {
  let uiComponentHelper = null;
  let visibility = toMockedInstance(Visibility);
  let componentPositions = toMockedInstance(ComponentPositions);
  let infinite = toMockedInstance(Infinite);

  beforeEach(() => {
    uiComponentHelper = new UIComponentHelper(
      _router,
      _window,
      componentPositions,
      visibility,
      infinite,
      classnames
    );
  });

  xdescribe('isAmp method', () => {
    it('should return true if url query contains amp flag of value true', () => {
      spyOn(_router, 'getCurrentRouteInfo').and.returnValue({
        params: { amp: true }
      });

      expect(uiComponentHelper.isAmp()).toBeTruthy();
    });

    it('should return true if url query contains amp flag of value "1"', () => {
      spyOn(_router, 'getCurrentRouteInfo').and.returnValue({
        params: { amp: '1' }
      });

      expect(uiComponentHelper.isAmp()).toBeTruthy();
    });

    it('should return false if url query does not contain amp flag', () => {
      spyOn(_router, 'getCurrentRouteInfo').and.returnValue({
        params: { amp: '0' }
      });

      expect(uiComponentHelper.isAmp()).toBeFalsy();
    });

    it('should return false if url query not contains amp flag', () => {
      expect(uiComponentHelper.isAmp()).toBeFalsy();
    });
  });

  describe('getDataProps method', () => {
    let dataProps = {
      'data-e2e': 'something',
      'data-key': 'key'
    };
    let props = Object.assign({ key: 'key' }, dataProps);

    it('should return only attributes with name data-*', () => {
      expect(uiComponentHelper.getDataProps(props)).toEqual(dataProps);
    });
  });

  describe('getAriaProps method', () => {
    let ariaProps = {
      'aria-label': 'something',
      'aria-hidden': true
    };
    let props = Object.assign({ key: 'key' }, ariaProps);

    it('should return only attributes with name aria-*', () => {
      expect(uiComponentHelper.getAriaProps(props)).toEqual(ariaProps);
    });
  });

  describe('cssClasses method', () => {
    it('should compose CSS class names', () => {
      expect(
        uiComponentHelper.cssClasses(
          'stuff another-foo',
          {
            foo: true,
            bar: false,
            another: false,
            'more-things': true
          },
          'things'
        )
      ).toBe('stuff another-foo foo more-things things');
    });
  });

  describe('getVisibilityReader method', () => {
    it('return base visibility reader function', () => {
      expect(
        typeof uiComponentHelper.getVisibilityReader({}, {}) === 'function'
      ).toBeTruthy();
    });
  });
});
