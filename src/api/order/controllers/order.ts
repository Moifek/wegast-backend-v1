'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async validateOrder(ctx) {
        const { query } = ctx;
        const { order, dasher } = query;
        
        const res = await strapi.service('api::order.order').findOne(order);
        
        if(res){
          res.OrderStatus = 'inProgress';
          res.dasher = dasher;
          await strapi.entityService.update('api::order.order', order, { data: res });
          return { message: 'order assigned to you', res };
        }else{
          ctx.notfound('order not found');
          return { ctx };
        }
    },
    async finishOrder(ctx) {
      const { query } = ctx;
      const { order, dasher } = query;
      
      const res = await strapi.service('api::order.order').findOne(order);
      
      if(res){
        
        res.OrderStatus = 'finalized';
        await strapi.entityService.update('api::order.order', order, { data: res });
        return { message: 'order finalized', res };
      }else{
        ctx.notfound('order not found');
        return { ctx };
      }
  },
}));