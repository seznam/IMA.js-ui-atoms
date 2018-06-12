import PropTypes from 'prop-types';
import React from 'react';
import uiComponentHelper from './uiComponentHelper';
import _window from './windowMock';
import throttle from './throttle';

export default class Parent extends React.Component {
  getChildContext() {
    return {
      $Utils: {
        $UIComponentHelper: uiComponentHelper,
        $Helper: {
          throttle
        },
        $Window: _window
      }
    };
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}

Parent.childContextTypes = {
  $Utils: PropTypes.object
};
