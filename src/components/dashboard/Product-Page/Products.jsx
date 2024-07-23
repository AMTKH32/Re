import React, { useState, useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  image_base,
} from "../../../libs/backendAPIs";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [materialCode, setMaterialCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const res = await getAllProducts();
        setProducts(res?.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchAllProducts();
  }, []);

  const categories = [
    "Solid",
    "3D Pattern",
    "Elegant Series",
    "Fabric",
    "Marble",
    "wood grains",
  ];

  const onSubmit = async () => {
    if (
      productName.trim() !== "" &&
      productImage &&
      materialCode.trim() !== "" &&
      selectedCategory
    ) {
      try {
        setLoading(true); // Set loading to true before adding product
        const res = await addProduct({
          name: productName,
          code: materialCode,
          category: selectedCategory,
          image: productImage,
        });
        setProducts([...products, res?.newProduct]);
        setProductName("");
        setProductImage(null);
        setMaterialCode("");
        setSelectedCategory("");
        setShowModal(false);
      } catch (error) {
        console.log("Error adding product:", error);
      } finally {
        setLoading(false); // Set loading to false after adding product or error
      }
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
    }
  };

  const closeDeleteConfirmation = () => {
    setDeleteIndex(null);
    setShowModal(false);
  };

  const deleteP = async () => {
    const updatedProducts = [...products];
    const deletedProduct = updatedProducts.splice(deleteIndex, 1);
    setLoading(true); // Set loading to true before deleting product
    try {
      await deleteProduct({ productId: deletedProduct[0]._id });
      setProducts(updatedProducts);
      setDeleteIndex(null);
    } catch (error) {
      console.log("Error deleting product:", error);
    } finally {
      setLoading(false); // Set loading to false after deleting product or error
    }
  };

  const openDeleteConfirmation = (index) => {
    setDeleteIndex(index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-sans tracking-tight text-gray-900">
          Products
        </h2>

        <button
          onClick={() => {
            setShowModal(true);
            setEditIndex(null);
          }}
          className="absolute right-4 bg-[#475be8] text-white px-7 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Product
        </button>

        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                {editIndex !== null ? "Edit Product" : "Add Product"}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                  type="text"
                  value={materialCode}
                  onChange={(e) => setMaterialCode(e.target.value)}
                  placeholder="Enter material code"
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />

                <div className="col-span-2 border">
                  <label
                    htmlFor="categorySelect"
                    className="block text-sm font-medium text-gray-700 "
                  ></label>
                  <select
                    id="categorySelect"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="imageUpload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Add Image
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeDeleteConfirmation}
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Cancel
                </button>

                <button
                  onClick={editIndex !== null ? updateProduct : onSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  {editIndex !== null ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteIndex !== null && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="mb-4">Are you sure you want to delete this product?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteP}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <ul className="list-decimal flex flex-col-reverse pl-6">
            {products.map((product, index) => (
              <li key={index} className="flex items-center border rounded-lg p-9">
                <span className="mr-4">{index + 1}.</span> {/* Index number */}
                <img
                  src={`${image_base}/${product.imageUrl}`}
                  alt={product.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                  <span className="text-lg font-semibold">{product.name}</span>
                  <p className="text-sm text-gray-500">
                    Material Code: {product.code}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {product.category}
                  </p>
                </div>
                <span
                  className="ml-2 text-red-500 cursor-pointer"
                  onClick={() => openDeleteConfirmation(index)}
                >
                  Delete
                </span>
              </li>
            ))}
          </ul>
          {products.length === 0 && (
            <p className="text-gray-500 flex justify-center">
              No products available
            </p>
          )}
        </div>
      </div>

      {/* Loader */}
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      )}
    </div>
  );
};

export default Products;
