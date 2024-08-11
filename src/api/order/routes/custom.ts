module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/order/validate',
        handler: 'order.validateOrder',
      },
      {
        method: 'POST',
        path: '/order/place',
        handler: 'order.placeOrder',
      },
      {
        method: 'POST',
        path: '/order/take',
        handler: 'order.takeOrder',
      },
      {
        method: 'POST',
        path: '/order/finalize',
        handler: 'order.finalizeOrder',
      },
    ],
  };
  