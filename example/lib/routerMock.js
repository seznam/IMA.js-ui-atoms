import { Router } from '@ima/core';
import { toMockedInstance } from 'to-mock';

export default toMockedInstance(Router, {
  getCurrentRouteInfo: () => {
    return {
      params: {
        amp: false,
      },
    };
  },
});
