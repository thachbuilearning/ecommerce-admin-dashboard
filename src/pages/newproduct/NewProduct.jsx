import React, { useState } from 'react';
import styled from 'styled-components';
import { publicRequest, userRequest } from '../../requestMethods';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';

const NewProductContainer = styled.div`
  flex: 4;
`;

const NewProductTitle = styled.h1`
  margin-bottom: 30px;
`;

const NewProductForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const NewProductItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NewProductItemLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: gray;
`;

const NewProductItemInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewProductItemTextArea = styled.textarea`
  /* Define styles for the text area input */
`;

const RequiredIndicator = styled.span`
  color: red;
`;

const NewProductButton = styled.button`
  -webkit-box-shadow: inset -1px 3px 8px 5px #3497FF, 2px 5px 16px 0px #0B325E,
    inset -3px -3px 15px -30px rgba(0, 0, 0, 0);
  box-shadow: inset -1px 3px 8px 5px #3497FF, 2px 5px 16px 0px #0B325E,
    inset -3px -3px 15px -30px rgba(0, 0, 0, 0);
  background: #0311FF;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
`;

// Define styled components for the modal
const ErrorModal = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Box shadow for depth */
  width: 300px; /* Adjust the width as needed */
  text-align: center;

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    background-color: #FF2F2F;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const initialProductData = {
    title: '',
    desc: '',
    img: '',
    categories: [],
    size: [],
    color: [],
    price: '',
    inStock: false,
};

const NewProduct = () => {
    const [createProductData, setCreateProductData] = useState(initialProductData);
    const [errors, setErrors] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);

    const checkIfTitleIsUnique = async (title) => {
        try {
            // Make an API request to fetch all product titles
            const response = await publicRequest('/products/all-products');
            const productTitles = response.data.map((product) => product.title);

            // Check if the new title is unique
            return !productTitles.includes(title);
        } catch (error) {
            console.error('Error checking product titles:', error);
            return false; // Assume title is not unique on error
        }
    };

    const handleFileUpload = (image) => {
        // Generate a unique file name using the current timestamp and the original file name
        const fileName = new Date().getTime() + image.name;

        // Get a reference to the Firebase Storage
        const storage = getStorage(app);

        // Create a reference to the file in Firebase Storage
        const storageRef = ref(storage, fileName);

        // Upload the file
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Listen for state changes of the upload task
        uploadTask.on('state_changed',
            (snapshot) => {
                // Handle state changes (e.g., progress)
            },
            (error) => {
                // Handle any errors
                console.error('Error uploading file:', error);
            },
            () => {
                // Handle successful upload
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        console.log("File available at", downloadURL);
                        // Update createProductData with the download URL
                        setCreateProductData({
                            ...createProductData,
                            img: downloadURL,
                        });
                    })
                    .catch((error) => {
                        console.error('Error getting download URL:', error);
                    });
            });
    };


    const handleCreateProduct = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Validate required fields
            const requiredFields = ['title', 'img', 'desc', 'price'];
            const newErrors = {};

            // Check if any required field is empty
            let hasError = false;
            requiredFields.forEach((field) => {
                if (!createProductData[field]) {
                    newErrors[field] = 'This field is required';
                    hasError = true;
                }
            });

            // Check if the new title is unique
            if (!(await checkIfTitleIsUnique(createProductData.title))) {
                newErrors.title = 'Title must be unique';
                hasError = true;
            }

            if (hasError) {
                // Display errors and return
                setErrors(newErrors);
                setShowErrorModal(true);
                return;
            }

            // Create a new product object from createProductData
            const newProduct = {
                title: createProductData.title,
                desc: createProductData.desc,
                img: createProductData.img,
                categories: createProductData.categories,
                size: createProductData.size,
                color: createProductData.color,
                price: createProductData.price,
                inStock: createProductData.inStock,
            };

            // Make the API request to create a new product
            const response = await userRequest.post('/products', newProduct);

            if (response.status === 201) {
                console.log('Product created successfully');
                // Reset the form after successful creation
                setCreateProductData(initialProductData);
                setErrors({});
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };


    return (
        <NewProductContainer>
            <NewProductTitle>New Product</NewProductTitle>
            <NewProductForm>
                <NewProductItem>
                    <NewProductItemLabel>
                        New Product Title <RequiredIndicator>*</RequiredIndicator>
                    </NewProductItemLabel>
                    <NewProductItemInput
                        type="text"
                        placeholder="Product Title"
                        value={createProductData.title}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                title: e.target.value,
                            })
                        }
                    />
                    {errors.title && <p>{errors.title}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>
                        Image <RequiredIndicator>*</RequiredIndicator>
                    </NewProductItemLabel>
                    <NewProductItemInput
                        type="text"
                        placeholder="Image URL"
                        value={createProductData.img}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                img: e.target.value,
                            })
                        }
                    />
                    <NewProductItemInput
                        type="file"
                        id="file"
                        onChange={(e) => {
                            const image = e.target.files[0];
                            handleFileUpload(image);
                        }}
                    />
                    {errors.img && <p>{errors.img}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>
                        Categories
                    </NewProductItemLabel>
                    <NewProductItemInput
                        type="text"
                        placeholder="Product Categories"
                        value={createProductData.categories}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                categories: e.target.value.split(","),
                            })
                        }
                    />
                    {errors.title && <p>{errors.title}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>
                        Size
                    </NewProductItemLabel>
                    <NewProductItemInput
                        type="text"
                        placeholder="Product Size"
                        value={createProductData.size}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                size: e.target.value.split(","),
                            })
                        }
                    />
                    {errors.title && <p>{errors.title}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>
                        Color
                    </NewProductItemLabel>
                    <NewProductItemInput
                        type="text"
                        placeholder="Product Color"
                        value={createProductData.color}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                color: e.target.value.split(","),
                            })
                        }
                    />
                    {errors.title && <p>{errors.title}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>
                        Description <RequiredIndicator>*</RequiredIndicator>
                    </NewProductItemLabel>
                    <NewProductItemTextArea
                        placeholder="Product Description"
                        value={createProductData.desc}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                desc: e.target.value,
                            })
                        }
                    />
                    {errors.desc && <p>{errors.desc}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>Price</NewProductItemLabel>
                    <NewProductItemInput
                        type="number"
                        placeholder="Product Price"
                        value={createProductData.price}
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                price: e.target.value,
                            })
                        }
                    />
                    {errors.price && <p>{errors.price}</p>}
                </NewProductItem>

                <NewProductItem>
                    <NewProductItemLabel>In Stock</NewProductItemLabel>
                    <select
                        className="newProductSelect"
                        name="inStock"
                        style={{ height: '40px', borderRadius: '5px' }}
                        value={createProductData.inStock.toString()} // Convert true to string
                        onChange={(e) =>
                            setCreateProductData({
                                ...createProductData,
                                inStock: e.target.value === 'true', // Convert back to boolean
                            })
                        }
                    >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </NewProductItem>

                <NewProductButton onClick={handleCreateProduct}>Create</NewProductButton>
            </NewProductForm>

            {/* Modal for displaying errors */}
            {showErrorModal && (
                <ErrorModal>
                    <ModalContent>
                        <h2>Error</h2>
                        <ul>
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                        <button onClick={() => setShowErrorModal(false)}>Close</button>
                    </ModalContent>
                </ErrorModal>
            )}


        </NewProductContainer>
    )
};

export default NewProduct;
