import axios from "axios";

export const backend_base = "https://formitebackendnew2024-production-1282.up.railway.app";
// export const backend_base = "https://auction-backend-production-df32.up.railway.app";
export const image_base = `${backend_base}/uploads`;

export const addProduct = async (values) => {
    try {
        // Create a new FormData object
        const formData = new FormData();

        // Append each key-value pair from the values object to the FormData
        Object.keys(values).forEach((key) => {
            // If the value is a file, append it with the corresponding key
            if (key === "image") {
                formData.append("image", values[key]);
            } else {
                // Otherwise, append it as a regular field
                formData.append(key, values[key]);
            }
        });

        // Send the FormData to the backend API
        const response = await axios.post(`${backend_base}/api/addProduct`, formData, {
            headers: {
                "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
            },
        });

        return response?.data;
    } catch (error) {
        console.log("there are errors in loading data", error);
    }
};
export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${backend_base}/api/getAllProducts`);
        return response?.data;
    } catch (error) {
        console.log("there are errors in loading data", error);
    }
};
export const deleteProduct = async (values) => {
    try {
        const response = await axios.post(`${backend_base}/api/deleteProduct`, values);
        return response?.data;
    } catch (error) {
        console.log("there are errors in loading data", error);
    }
};
