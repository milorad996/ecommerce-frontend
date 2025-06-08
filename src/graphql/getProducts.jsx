export const GET_PRODUCTS = `
  query {
    products {
      id
      name
      description
      in_stock
      category_id
      brand
      gallery {
        id
        image_url
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      attributes {
        id
        name
        type
        items {
          id
          attribute_id
          value
          display_value
        }
      }
    }
  }
`;
