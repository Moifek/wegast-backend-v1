module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/order/validate',
        handler: 'order.validateOrder',
        config: {
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/order/place',
        handler: 'order.placeOrder',
        config: {
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/order/take',
        handler: 'order.takeOrder',
        config: {
          auth: false,
        },
      },
      {
        method: 'POST',
        path: '/order/finalize',
        handler: 'order.finalizeOrder',
        config: {
          auth: false,
        },
      },
    ],
  };
  