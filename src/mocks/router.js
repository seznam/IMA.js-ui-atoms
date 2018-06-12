import { toMockedInstance } from 'to-mock';
import Window from 'ima/router/Router';

export default toMockedInstance(Window, {
  getCurrentRouteInfo: () => {
    return {
      params: {
        amp: false
      }
    };
  }
});
