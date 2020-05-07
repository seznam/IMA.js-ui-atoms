import { PageContext, AbstractComponent } from '@ima/core';
import React from 'react';
import uiComponentHelper from './uiComponentHelper';
import _window from './windowMock';
import throttle from './throttle';

const context = {
  $Utils: {
    $UIComponentHelper: uiComponentHelper,
    $Helper: {
      throttle,
    },
    $Window: _window,
    $Settings: {
      plugin: {
        uiAtoms: {
          useIntersectionObserver: {
            images: true,
          },
          disableNoScript: {
            images: false,
          },
        },
      },
    },
  },
};

export default class Parent extends AbstractComponent {
  render() {
    return (
      <PageContext.Provider value={context}>
        <span>{this.props.children}</span>
      </PageContext.Provider>
    );
  }
}
