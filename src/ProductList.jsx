import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [productSearch, setProductSearch] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products
  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((response) => setProductList(response));
  };

  // Fetch categories
  const getProductsCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((response) => setCategory(response));
  };

  // Display products
  const displayProducts = () => {
    const ProductsTemp = productList.filter((product) => {
      const matchesSearch = product.title.includes(productSearch);
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return ProductsTemp.map((item, key) => {
      return <Product key={key} product={item} />;
    });
  };

  const SearchProducts = (e) => {
    e.preventDefault();
    const searchInput = document.querySelector("#search").value;
    setProductSearch(searchInput);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    getProducts();
    getProductsCategories();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">List of Products</h1>

      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input
              id="search"
              type="text"
              className="form-control"
              placeholder="Enter your item here"
            />
            <button
              id="buttonSearch"
              className="btn btn-primary"
              onClick={SearchProducts}
            >
              Search
            </button>
          </div>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {category.map((cat, index) => (
              <option key={index} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{displayProducts()}</tbody>
        </table>
      </div>
    </div>
  );
}
