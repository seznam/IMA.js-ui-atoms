import Router from 'ima/router/Router';
import { toMockedInstance } from 'to-mock';

export default toMockedInstance(Router, {
  getCurrentRouteInfo: () => {
    return {
      params: {
        amp: false
      }
    };
  }
});
