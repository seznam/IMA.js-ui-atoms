import { PageContext } from '@ima/core';
import { mount } from 'enzyme';
import React from 'react';
import { toMockedInstance } from 'to-mock';
import classnames from 'classnames';

import {
  UIComponentHelper,
  Visibility,
  ComponentPositions,
  Headline1,
  Headline2,
  Headline3,
  Headline4,
  Headline5,
  Headline6,
  Iframe,
  Image,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
  Loader,
  Paragraph,
  Video,
  Infinite,
} from '../main';

import { JSDOM } from 'jsdom';
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

import _router from '../mocks/router';
import _window from '../mocks/window';
import _settings from '../mocks/settings';

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

const visibility = toMockedInstance(Visibility);
const mockPosition = {
  height: 0,
};
const componentPositions = toMockedInstance(ComponentPositions, {
  getWindowViewportRect: () => mockPosition,
});
const infinite = toMockedInstance(Infinite);

function getComponentOptions(overrideSettings = {}) {
  const $Settings = Object.assign({}, _settings, overrideSettings);

  const $UIComponentHelper = new UIComponentHelper(
    _router,
    _window,
    componentPositions,
    visibility,
    infinite,
    classnames,
    $Settings
  );

  const context = {
    $Utils: {
      $Settings,
      $UIComponentHelper,
    },
  };
  const mountOptions = {
    context,
    someProp: true,
  };

  return mountOptions;
}

describe('UIAtoms mount rendering', () => {
  let wrapper = null;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  });

  describe('should render atoms with noscript tag: ', () => {
    let mountOptions = getComponentOptions();

    it('should render Image with noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Image src="example.jpg" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(1);
    });

    it('should render Video with noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Video src="example.mov" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(1);
    });

    it('should render Iframe with noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Iframe src="example.html" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(1);
    });
  });

  describe('should render atoms without noscript tag - disabled by props: ', () => {
    let mountOptions = getComponentOptions();

    it('Image without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Image src="example.jpg" disableNoScript={true} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });

    it('Video without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Video src="example.mov" disableNoScript={true} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });

    it('Iframe without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Iframe src="example.html" disableNoScript={true} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });
  });

  describe('should render atoms without noscript tag - disabled by $Settings: ', () => {
    let mountOptions = getComponentOptions({
      plugin: {
        uiAtoms: {
          useIntersectionObserver: {
            iframes: true,
            images: true,
            videos: true,
          },
          disableNoScript: {
            iframes: true,
            images: true,
            videos: true,
          },
        },
      },
    });

    it('Image without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Image src="example.jpg" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });
    it('Video without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Video src="example.mov" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });

    it('Iframe without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Iframe src="example.html" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });
  });

  describe('should render atoms with noscript tag - disabled by $Settings, overriden by props: ', () => {
    let mountOptions = getComponentOptions({
      plugin: {
        uiAtoms: {
          useIntersectionObserver: {
            iframes: true,
            images: true,
            videos: true,
          },
          disableNoScript: {
            iframes: true,
            images: true,
            videos: true,
          },
        },
      },
    });

    it('Image without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Image src="example.jpg" disableNoScript={false} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(1);
    });

    it('Video without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Video src="example.mov" disableNoScript={false} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(1);
    });

    it('Iframe without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Iframe src="example.html" disableNoScript={false} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(1);
    });
  });

  describe('should render atoms without noscript tag - enabled by $Settings, overriden by props: ', () => {
    let mountOptions = getComponentOptions({
      plugin: {
        uiAtoms: {
          useIntersectionObserver: {
            iframes: true,
            images: true,
            videos: true,
          },
          disableNoScript: {
            iframes: false,
            images: false,
            videos: false,
          },
        },
      },
    });

    it('Image without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Image src="example.jpg" disableNoScript={true} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });

    it('Video without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Video src="example.mov" disableNoScript={true} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });

    it('Iframe without noscript tag', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Iframe src="example.html" disableNoScript={true} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.find('noscript').length).toEqual(0);
    });
  });

  describe('should render simple UI atoms: ', () => {
    let mountOptions = getComponentOptions();

    describe('Headers: ', () => {
      describe('Headline1: ', () => {
        it('with text', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline1 text="text" />
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });

        it('with children', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline1>Headline1</Headline1>
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('Headline2: ', () => {
        it('with text', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline2 text="text" />
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });

        it('with children', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline2>Headline2</Headline2>
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('Headline3: ', () => {
        it('with text', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline3 text="text" />
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });

        it('with children', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline3>Headline3</Headline3>
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('Headline4: ', () => {
        it('with text', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline4 text="text" />
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });

        it('with children', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline4>Headline4</Headline4>
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('Headline5: ', () => {
        it('with text', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline5 text="text" />
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });

        it('with children', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline5>Headline5</Headline5>
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });
      });

      describe('Headline6: ', () => {
        it('with text', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline6 text="text" />
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });

        it('with children', () => {
          wrapper = mount(
            <PageContext.Provider value={mountOptions.context}>
              <Headline6>Headline6</Headline6>
            </PageContext.Provider>,
            mountOptions
          );

          expect(wrapper.html()).toMatchSnapshot();
        });
      });
    });

    it('Link - with text', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Link href="href" className="css-class" mode="text" text="text" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('Link - with children', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Link href="href" className="css-class" mode="children">
            children
          </Link>
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
    });

    describe('List: ', () => {
      it('ListItem - full with text', () => {
        wrapper = mount(
          <PageContext.Provider value={mountOptions.context}>
            <ListItem
              className="css-class"
              mode="full-with-text"
              text="text"
              style={{ position: 'relative' }}
            />
          </PageContext.Provider>,
          mountOptions
        );

        expect(wrapper.html()).toMatchSnapshot();
      });

      it('ListItem - full with children', () => {
        wrapper = mount(
          <PageContext.Provider value={mountOptions.context}>
            <ListItem
              className="css-class"
              mode="full-with-children"
              style={{ position: 'relative' }}>
              <span>span</span>
            </ListItem>
          </PageContext.Provider>,
          mountOptions
        );
      });

      it('OrderedList', () => {
        wrapper = mount(
          <PageContext.Provider value={mountOptions.context}>
            <OrderedList className="css-class" mode="mode" />
          </PageContext.Provider>,
          mountOptions
        );

        expect(wrapper.html()).toMatchSnapshot();
      });

      it('UnorderedList', () => {
        wrapper = mount(
          <PageContext.Provider value={mountOptions.context}>
            <UnorderedList className="css-class" mode="mode" />
          </PageContext.Provider>,
          mountOptions
        );

        expect(wrapper.html()).toMatchSnapshot();
      });
    });

    it('Paragraphs - empty', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Paragraph />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('Paragraphs - full with text', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Paragraph
            className="css-class"
            mode="full-with-text"
            text="text"
            style={{ position: 'relative' }}
          />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('Paragraphs - full with children', () => {
      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Paragraph
            className="css-class"
            mode="full-with-children"
            style={{ position: 'relative' }}>
            <span>span</span>
          </Paragraph>
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('Loader snap', () => {
      jest.useFakeTimers();

      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Loader mode="basic" layout="layout" color="red" />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();
    });

    it('Loader timeout', () => {
      jest.useFakeTimers();

      wrapper = mount(
        <PageContext.Provider value={mountOptions.context}>
          <Loader mode="timeout" layout="layout" color="red" timeout={1000} />
        </PageContext.Provider>,
        mountOptions
      );

      expect(wrapper.html()).toMatchSnapshot();

      expect(setTimeout).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1001);
      wrapper.update();

      expect(wrapper.html()).toMatchSnapshot();

      jest.useRealTimers();
    });
  });
});
