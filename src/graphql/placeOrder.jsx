export const PLACE_ORDER = `
  mutation PlaceOrder($items: [OrderItemInput!]!) {
    placeOrder(items: $items)
  }
`;