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
          ctx.send({ message: 'order already assigned' },400);
          return { ctx };
        }
    },
  async placeOrder(ctx) {
    const { items, user } = ctx.request.body;
    const fetchedUser = await strapi.entityService.findMany('plugin::users-permissions.user', {
      filters: {
        id: user.id,
      },
    });
    const itemsIds = items.map((item) => item.id);

    const fetchItems = await strapi.entityService.findMany('api::item.item', {
      populate : "*",
      filters: {
        id: {
          $in: itemsIds,
        },
      },
    })

    const orderedItems = items.map((item) => {
      return {
        item: item.id,
        quantity: item.quantity,
        price: item.price,
      };
    })
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const buildOrder = {
        Discount: 0,
        TotalPrice: totalPrice,
        Currency: "TND",
        OrderStatus: "orderPlaced",
        payment: null, 
        restaurant: fetchItems[0].restaurant, 
        OrderItems: orderedItems,
        discount_code: null,
        users_permissions_user: user.id, 
    };
    const order = await strapi.service('api::order.order').create({ data: buildOrder });
    
    if(order){
      ctx.send({ message: 'order placed', order },201);
    }else{
      ctx.send({ message: 'order already placed' },400);

        return { ctx };
    }
},
async takeOrder(ctx) {
  const { id, dasherId } = ctx.request.body;

  const res = await strapi.service('api::order.order').findOne(id);
  if(res.OrderStatus === "orderPlaced"){
   
  res.OrderStatus = "inProgress";
  res.dasher_profile = dasherId;

  const order = await strapi.entityService.update('api::order.order', id, { data: res }); 
  ctx.send({ message: 'order assigned', order },201);  
  }else{
    ctx.send({ message: 'order already took' },400);
      return { ctx };
  }
},
async finalizeOrder(ctx) {
  const { id, dasherId } = ctx.request.body;

  const res = await strapi.service('api::order.order').findOne(id);
  if(res.OrderStatus === "inProgress" || res.OrderStatus === "onRoute"){
    
    const order = await strapi.service('api::order.order').findOne(id);
    const dasher = await strapi.service('api::dasher-profile.dasher-profile').findOne(dasherId);
    if(order && dasher){
      dasher.Balance = dasher.Balance + order.TotalPrice;
      res.OrderStatus = "finalized";
    }
  await strapi.entityService.update('api::order.order', id, { data: res }); 
  await strapi.entityService.update('api::dasher-profile.dasher-profile', dasherId, { data: dasher }); 
  ctx.send({ message: 'order placed' },201);  
  }else{
      ctx.send({ message: 'order already finalized' },400);
      return { ctx };
  }
},
}));