import React, { useEffect, useState } from "react";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([
    "Crops",
    "Machinery",
    "Agrochemicals",
    "Fertilizers",
    "Seeds",
    "Dairy",
    "Poultry",
    "Fruits",
    "Animal Feed",
    "Farm Tools",
    "LiveStock",
  ]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const [cart, setCart] = useState([]);

  // Fetch cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProduct = updatedCart.find(
      (item) => item.productId === product.productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.products_name} has been added to your cart.`);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handlePriceChange = (e) => setPriceRange([0, parseInt(e.target.value)]);
  const handleTagChange = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleLike = (productName) => {
    setLikedProducts((prev) =>
      prev.includes(productName)
        ? prev.filter((name) => name !== productName)
        : [...prev, productName]
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.products_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => product.tags?.includes(tag));

    return matchesSearch && matchesCategory && matchesPrice && matchesTags;
  });

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col p-8">
        <div className="flex">
          <div className="w-1/4 p-4 bg-gray-100 rounded-lg">
            <h2 className="font-bold mb-4">Filter By</h2>
            <div className="mb-4">
              <h3 className="font-semibold">Categories</h3>
              {[
                "Crops",
                "Machinery",
                "Agrochemicals",
                "Fertilizers",
                "Seeds",
                "Dairy",
                "Poultry",
                "Fruits",
                "Animal Feed",
                "Farm Tools",
                "LiveStock",
              ].map((category) => (
                <label className="block" key={category}>
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                    className="form-checkbox h-5 w-5 text-green-500 focus:ring-0"
                  />{" "}
                  {category}
                </label>
              ))}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold">Price</h3>
              <input
                type="range"
                min="0"
                max="1000000"
                value={priceRange[1]}
                onChange={handlePriceChange}
                className="w-full"
              />
              <p>MWK0 - MWK{priceRange[1]}</p>
            </div>

            <div>
              <h3 className="font-semibold">Tags</h3>
              {["New", "Trending", "Label"].map((tag) => (
                <label className="block" key={tag}>
                  <input
                    type="checkbox"
                    onChange={() => handleTagChange(tag)}
                    checked={selectedTags.includes(tag)}
                    className="form-checkbox h-5 w-5 text-green-500 focus:ring-0"
                  />{" "}
                  {tag}
                </label>
              ))}
            </div>
          </div>

          <div className="w-3/4 ml-8">
            <div className="flex items-center mb-4">
              <FiSearch className="mr-2" />
              <input
                type="text"
                placeholder="Looking for what?"
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:border-black focus:ring-0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="border rounded-lg p-4 shadow-sm bg-white flex flex-col"
                  >
                    <Link to={`/productDetails/:${product.productId}`}>
                      <img
                        src={product.imageUrl}
                        alt={product.products_name}
                        className="w-full h-48 mb-4 rounded-md object-cover"
                      />
                    </Link>
                    <h3 className="text-lg font-semibold">
                      {product.products_name}
                    </h3>
                    <p className="text-gray-800 mb-2">
                      MWK{product.price} / {product.quantity_amount}{" "}
                      {product.quantity_metric}
                    </p>
                    <p className="text-gray-600">{product.category}</p>
                    <div className="flex items-center mb-2">
                      {/* Rating can be implemented based on product.rating if available */}
                    </div>
                    <div className="flex gap-4 mt-auto">
                      <button
                        onClick={() => toggleLike(product.products_name)}
                        className="relative transition-transform duration-200 hover:scale-110"
                      >
                        <FiHeart
                          className={`transition-colors duration-200`}
                          style={{
                            color: likedProducts.includes(product.products_name)
                              ? "red"
                              : "gray",
                            fontSize: "24px",
                          }}
                        />
                        {likedProducts.includes(product.products_name) && (
                          <span className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></span>
                        )}
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="relative transition-transform duration-200 hover:scale-110"
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="bg-gray-300 p-2 rounded"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="bg-gray-300 p-2 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductSearch;
