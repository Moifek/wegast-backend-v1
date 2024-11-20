/**
 * adress controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::adress.adress', ({ strapi }) => ({async create(ctx) {
    // The user should now be attached to ctx.request.body.data
    const { data } = ctx.request.body;

    // You can log the data to verify the user is attached
    strapi.log.info('Create data:', data);
    // Create the entity using the modified data
    const entity = await strapi.entityService.create('api::adress.adress', {
      data: data,
      populate: '*',
    });
return { data: entity };
  },
}));
