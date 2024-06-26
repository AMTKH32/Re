import React, { useState } from "react";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  image_base,
} from "../../../libs/backendAPIs";
import { useEffect } from "react";

const Products = () => {
  // State for managing the list of products
  const [products, setProducts] = useState([]);
  // State for managing the input value for product name
  const [productName, setProductName] = useState("");
  // State for managing the input value for product image
  const [productImage, setProductImage] = useState(null);
  // State for managing the input value for material code
  const [materialCode, setMaterialCode] = useState("");
  // State for managing the selected category
  const [selectedCategory, setSelectedCategory] = useState("");
  // State for managing the modal visibility
  const [showModal, setShowModal] = useState(false);
  // State for managing the index of the product being edited
  const [editIndex, setEditIndex] = useState(null);
  // State for managing the index of the product being deleted
  const [deleteIndex, setDeleteIndex] = useState(null);
  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await getAllProducts();
      console.log(res);
      setProducts(res?.products);
    };
    fetchAllProducts();
  }, []);
  // List of categories
  const categories = [
    "Solid",
    "Pattern",
    "3D",
    "Elegant Series",
    "Fabric",
    "Marble",
    "wood grains",
  ];

  // Function to handle adding a new product
  const onSubmit = async () => {
    if (
      productName.trim() !== "" &&
      productImage &&
      materialCode.trim() !== "" &&
      selectedCategory
    ) {
      try {
        const res = await addProduct({
          name: productName,
          code: materialCode,
          category: selectedCategory,
          image: productImage,
        });
        console.log("res", res);
        setProducts([...products, res?.newProduct]);
        setProductName("");
        setProductImage(null);
        setMaterialCode("");
        setSelectedCategory("");
        // Close the modal
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to handle file input change
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

  // Function to handle deleting a product
  const deleteP = async () => {
    const updatedProducts = [...products];
    const deletedProduct = updatedProducts.splice(deleteIndex, 1);
    console.log(deletedProduct);
    await deleteProduct({ productId: deletedProduct[0]._id });
    setProducts(updatedProducts);
    // Reset deleteIndex
    setDeleteIndex(null);
    // Close the confirmation dialog
  };

  // Function to open the confirmation dialog for deleting a product
  const openDeleteConfirmation = (index) => {
    setDeleteIndex(index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-sans tracking-tight text-gray-900">
          Products
        </h2>

        {/* Button to open the modal */}
        <button
          onClick={() => {
            setShowModal(true);
            setEditIndex(null); // Reset edit index when adding new product
          }}
          className="absolute right-4 bg-[#475be8] text-white px-7 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Product
        </button>

        {/* Modal for adding new products */}
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

        {/* Confirmation dialog for deleting a product */}
        {deleteIndex !== null && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
              <p className="mb-4">
                Are you sure you want to delete this product?
              </p>
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

        {/* Display the list of products */}
        <div className="mt-6">
          <ul className="list-disc flex flex-col-reverse pl-6">
            {products.map((product, index) => (
              <li
                key={index}
                className="flex items-center border rounded-lg p-9"
              >
                <img
                  src={`${image_base}/${product.imageUrl}`}
                  alt={product.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div className="flex-1">
                  <span className="text-lg font-semibold">{product.name}</span>
                  <p className="text-sm text-gray-500">
                    Material Code: {product.materialCode}
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
    </div>
  );
};

export default Products;
