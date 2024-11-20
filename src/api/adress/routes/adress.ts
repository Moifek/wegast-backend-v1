/**
 * adress router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::adress.adress', {
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  config: {
    create: {
      middlewares: [ 'api::adress.link-user' ],
    },
    update: {
      middlewares: [ 'api::adress.link-user' ],
    },
  }
});
