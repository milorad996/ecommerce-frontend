import { PLACE_ORDER } from "../graphql/placeOrder";
import { graphqlRequest } from "./graphqlClient";

export const placeOrder = async (items) => {
    const data = await graphqlRequest(PLACE_ORDER, { items });
    return data.placeOrder;
};