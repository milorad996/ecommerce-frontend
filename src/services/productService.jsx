import { GET_PRODUCTS } from "../graphql/getProducts.jsx";
import { graphqlRequest } from "./graphqlClient.jsx";


export const getProducts = async () => {
    const data = await graphqlRequest(GET_PRODUCTS);
    return data.products;
};
