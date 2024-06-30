import type { Schema, Attribute } from '@strapi/strapi';

export interface OrderItemsOrderItems extends Schema.Component {
  collectionName: 'components_order_items_order_items';
  info: {
    displayName: 'OrderItems';
    icon: 'bulletList';
  };
  attributes: {
    item: Attribute.Relation<
      'order-items.order-items',
      'oneToOne',
      'api::item.item'
    >;
    Quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    Price: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    Comment: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'order-items.order-items': OrderItemsOrderItems;
    }
  }
}
