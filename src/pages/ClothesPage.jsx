import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import './../css/clothes.css';



function ClothesPage() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className="clothes-container">
            <h3 className="clothes-name">Clothes</h3>
            <div className="clothes-cards">
                {products
                    .filter(product => product.category_id === 2)
                    .map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </div>
    )
}

export default ClothesPage;