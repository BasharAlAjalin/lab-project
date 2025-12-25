import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Common/Loader";

export default function ProductDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  // Replace with real API call later
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProduct({
        id,
        title: `Product #${id}`,
        price: 49.99,
        description:
          "This is a placeholder product page. Connect your backend to load real data.",
        stock: 12,
      });
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <Loader text="Loading product..." />;
  if (!product) return <p className="container">Product not found.</p>;

  return (
    <div className="container page">
      <h1>{product.title}</h1>
      <p className="muted">ID: {product.id}</p>

      <div className="card">
        <p className="big">${product.price}</p>
        <p>{product.description}</p>
        <p className="muted">Stock: {product.stock}</p>

        <button className="btn">Add to cart</button>
      </div>
    </div>
  );
}
