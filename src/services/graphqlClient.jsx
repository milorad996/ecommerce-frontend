const GRAPHQL_ENDPOINT = "https://ecommerce-backend-production-99be.up.railway.app/graphql";

export const graphqlRequest = async (query, variables = {}) => {
    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await response.json();
    if (result.errors) {
        throw new Error(result.errors[0].message);
    }
    return result.data;
};
