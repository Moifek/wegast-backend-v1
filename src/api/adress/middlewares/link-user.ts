module.exports = (config, { strapi })=> {
    return async (context, next) => {
        if(context.request.url === '/api/adresses' && context.request.method === 'POST') {
            const user = await strapi.entityService.findOne('plugin::users-permissions.user', context.request.body.data.user, {
                populate: { role: true }
              });
            if(!user) {
                return context.send({ message: 'user not found' },400);
            }
            context.request.body.data.User = user;
        }
    await next();
    };
  };