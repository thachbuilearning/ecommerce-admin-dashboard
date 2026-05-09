
import { Publish } from '@material-ui/icons';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { userRequest } from '../../requestMethods';
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const Container = styled.div`
padding: 20px;`

const ProductTitleContainer = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
`

const ProductTitle = styled.h1``

const ProductAddButton = styled.button`
-webkit-box-shadow: inset -1px 3px 8px 5px #3497FF, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0); 
box-shadow: inset -1px 3px 8px 5px #3497FF, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0);
background: #0311FF;
color: white;
border: none;
border-radius: 10px;
padding: 5px 10px;
font-size: 16px;
cursor: pointer;
`;



const ProductTop = styled.div`
padding: 20px;
border-radius: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  display: flex;
`;


const ProductTopLeft = styled.div`
flex:1;
`;
const ProductInfoTop = styled.div`
display: flex;
align-items: center;
gap: 20px;
`;

const ProductTopRight = styled.div`
flex:1;
padding: 20px;
margin: 20px;
border-radius: 10px;
-webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
`;

const ProductIntoTopImg = styled.img`
width: 40px;
height: 40px;
border-radius:50%;
object-fit:cover;
`;


const ProductName = styled.span`
font-weight: 600;`

const ProductInfoBottom = styled.div`
margin-top: 10px;
`;

const ProductInfoItem = styled.div`
width: 170px;
display: flex;
justify-content:space-between;
`;

const ProductInfoKey = styled.span``

const ProductInfoValue = styled.span``

const ProductBottom = styled.div`
padding: 20px;
border-radius: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  /* display: flex; */
  margin-top: 20px;
`;

const ProductForm = styled.div`
display: flex;
justify-content:space-between;
`;

const ProductFormLeft = styled.div`
display: flex;
flex-direction:column;
`

const ProductFormLeftLabel = styled.label`
/* font-size: 14px; */
margin-bottom:10px;
color:gray;
`;
const ProductFormLeftInput = styled.input`
            border:none;
            width: 250px;
            height: 30px;
            border-bottom: 1px solid gray;
            margin-bottom:10px;
         `;
const ProductFormSelect = styled.select`
margin-bottom:10px;`

const ProductFormRight = styled.div`
display: flex;
flex-direction:column;
justify-content:space-around;`

const ProductUpload = styled.div`
display: flex;
align-items: center;`

const ProductUploadImg = styled.img`
width: 100px;
height: 100px;
border-radius:10px;
object-fit:cover;`

const ProductUploadLabel = styled.label``
const ProductUploadInput = styled.input``

const UploadInfo = styled.div`
  margin-left: 10px;
  font-size: 12px;
  color: #555;
`;

const UploadWarning = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #d32f2f;
`;

const UploadSuccess = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #2e7d32;
`;

const ProgressCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 4px solid #ddd;
  border-top: 4px solid #0311ff;
  animation: spin 0.8s linear infinite;
  margin-left: 12px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ProductButton = styled.button`
  -webkit-box-shadow: inset -1px 3px 8px 5px #3497FF, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0); 
  box-shadow: inset -1px 3px 8px 5px #3497FF, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0);
  background: ${(props) => (props.disabled ? "#777" : "#0311FF")};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
//---------------------------


const Product = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    console.log("product id:", id)
    const [product, setProduct] = useState(null);
    const [pStats, setPStats] = useState([])
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const MAX_IMAGE_SIZE = 500 * 1024; // 500 KB
    const [uploadError, setUploadError] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");
    const [selectedFileSize, setSelectedFileSize] = useState("");


    const [updatedProductData, setUpdatedProductData] = useState({
        title: '',
        img: '',
        desc: '',
        price: 0,
        inStock: false,
        // Add more fields as needed
    });



    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + id);
                const list = res.data.sort((a, b) => {
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [id, MONTHS]);

    useEffect(() => {
        // Make a request to the backend to fetch the product by _id
        fetch(`https://ecommerce-backendapi-p6ga.onrender.com/api/products/${id}/product-details`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
            });
    }, [id]); // Include id as a dependency to trigger the request when it changes

    if (product === null) {
        // Render a loading state, or you can return a loading spinner
        return <div>Loading...</div>;
    }


    const formatFileSize = (bytes) => {
        if (bytes < 1024) return `${bytes} B`;
        return `${(bytes / 1024).toFixed(1)} KB`;
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };


    const saveImageToFirestore = async () => {
        if (!file) return null;

        setIsUploading(true);
        setUploadError("");
        setUploadMessage("Saving image to Firestore...");

        try {
            const base64Image = await convertFileToBase64(file);

            const imageDocRef = doc(db, "productImages", id);

            await setDoc(imageDocRef, {
                productId: id,
                fileName: file.name,
                contentType: file.type,
                size: file.size,
                imageData: base64Image,
                updatedAt: new Date().toISOString(),
            });

            setIsUploading(false);
            setUploadMessage("Image saved to Firestore successfully.");

            return base64Image;
        } catch (error) {
            setIsUploading(false);
            setUploadMessage("");
            setUploadError("Image upload failed. Please try again.");
            console.error("Error saving image to Firestore:", error);
            throw error;
        }
    };

    const handleUpdateProduct = async () => {
        try {
            let imageValue = updatedProductData.img;

            // If user selected a local image file, save it to Firestore first
            if (file) {
                imageValue = await saveImageToFirestore();
            }

            // Fetch the existing product data first
            const response = await userRequest.get(`products/${id}/product-details`);

            if (response.status === 200) {
                const existingProduct = response.data;

                const updatedFields = {
                    title: updatedProductData.title || existingProduct.title,
                    img: imageValue || existingProduct.img,
                    desc: updatedProductData.desc || existingProduct.desc,
                    price: updatedProductData.price
                        ? Number(updatedProductData.price)
                        : existingProduct.price,
                    inStock:
                        updatedProductData.inStock === "true"
                            ? true
                            : updatedProductData.inStock === "false"
                                ? false
                                : existingProduct.inStock,
                };

                const updateResponse = await userRequest.put(
                    `products/${id}/update-product`,
                    updatedFields
                );

                if (updateResponse.status === 200) {
                    console.log("Product updated successfully");

                    setProduct({
                        ...existingProduct,
                        ...updatedFields,
                    });

                    setUpdatedProductData({
                        title: "",
                        img: "",
                        desc: "",
                        price: 0,
                        inStock: false,
                    });

                    setFile(null);
                    setSelectedFileSize("");
                    setUploadMessage("Product updated successfully.");
                    setUploadError("");
                }
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };




    return (
        <Container>
            <ProductTitleContainer>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductAddButton onClick={() => navigate(`/newproduct`)}>Create</ProductAddButton>
            </ProductTitleContainer>

            <ProductTop>
                <ProductTopLeft>
                    <Chart data={pStats} title="Sales Performance" dataKey="Sales" grid />
                </ProductTopLeft>
                <ProductTopRight>
                    <ProductInfoTop>
                        <ProductIntoTopImg src={product.img} />
                        <ProductName>Apple Airpods</ProductName>
                    </ProductInfoTop>
                    <ProductInfoBottom>
                        <ProductInfoItem>
                            <ProductInfoKey>{id}:</ProductInfoKey>
                            <ProductInfoValue>123</ProductInfoValue>
                        </ProductInfoItem>
                        <ProductInfoItem>
                            <ProductInfoKey>Price:</ProductInfoKey>
                            <ProductInfoValue>{product.price}</ProductInfoValue>
                        </ProductInfoItem>

                        <ProductInfoItem>
                            <ProductInfoKey>in stock:</ProductInfoKey>
                            <ProductInfoValue>{product.inStock ? "In Stock" : "Out of Stock"}</ProductInfoValue>
                        </ProductInfoItem>
                    </ProductInfoBottom>
                </ProductTopRight>
            </ProductTop>
            <ProductBottom>
                <ProductForm>
                    <ProductFormLeft>
                        <ProductFormLeftLabel>Product Name</ProductFormLeftLabel>
                        <ProductFormLeftInput
                            type="text"
                            placeholder={product.title}
                            onChange={(e) => setUpdatedProductData({ ...updatedProductData, title: e.target.value })}
                        />

                        <ProductFormLeftLabel>Product Description</ProductFormLeftLabel>
                        <ProductFormLeftInput
                            type="text"
                            placeholder={product.desc}
                            onChange={(e) => setUpdatedProductData({ ...updatedProductData, desc: e.target.value })}
                        />

                        <ProductFormLeftLabel>Price</ProductFormLeftLabel>
                        <ProductFormLeftInput
                            type="text"
                            placeholder={product.price}
                            onChange={(e) => setUpdatedProductData({ ...updatedProductData, price: e.target.value })}
                        />

                        <ProductFormLeftLabel>In Stock</ProductFormLeftLabel>
                        <ProductFormSelect
                            name="inStock"
                            id="inStock"
                            onChange={(e) => setUpdatedProductData({ ...updatedProductData, inStock: e.target.value })}
                        >
                            <option value="">Select</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </ProductFormSelect>

                    </ProductFormLeft>
                    <ProductFormRight>

                        <ProductUpload>
                            {/* Display the current product image */}
                            <ProductUploadImg src={updatedProductData.img || product.img} />

                            {/* Input for uploading a local image */}
                            <ProductUploadLabel htmlFor="file">
                                <Publish style={{ cursor: "pointer" }} />
                            </ProductUploadLabel>
                            <ProductUploadInput
                                type="file"
                                id="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const selectedFile = e.target.files[0];

                                    setUploadError("");
                                    setUploadMessage("");
                                    setSelectedFileSize("");

                                    if (!selectedFile) return;

                                    if (selectedFile.size > MAX_IMAGE_SIZE) {
                                        setFile(null);
                                        e.target.value = "";

                                        setUpdatedProductData({
                                            ...updatedProductData,
                                            img: "",
                                        });

                                        setUploadError(
                                            `Image is too large. Maximum allowed size is ${formatFileSize(MAX_IMAGE_SIZE)}. Your file is ${formatFileSize(selectedFile.size)}.`
                                        );

                                        return;
                                    }

                                    setFile(selectedFile);
                                    setSelectedFileSize(formatFileSize(selectedFile.size));
                                    setUploadMessage("Image selected. Click Update to save.");

                                    setUpdatedProductData({
                                        ...updatedProductData,
                                        img: URL.createObjectURL(selectedFile),
                                    });
                                }}
                            />

                            {/* Input for providing a URL */}
                            <ProductUploadInput
                                type="text"
                                placeholder="Image URL"
                                onChange={(e) => {
                                    setFile(null);
                                    setUploadError("");
                                    setUploadMessage("");
                                    setSelectedFileSize("");

                                    setUpdatedProductData({
                                        ...updatedProductData,
                                        img: e.target.value,
                                    });
                                }}
                            />

                            {isUploading && <ProgressCircle />}
                        </ProductUpload>

                        <UploadInfo>
                            Max image size: {formatFileSize(MAX_IMAGE_SIZE)} , no webp format
                            {selectedFileSize && ` | Selected: ${selectedFileSize}`}
                        </UploadInfo>

                        {uploadError && <UploadWarning>{uploadError}</UploadWarning>}

                        {uploadMessage && !uploadError && (
                            <UploadSuccess>{uploadMessage}</UploadSuccess>
                        )}

                        <ProductButton onClick={handleUpdateProduct} disabled={isUploading}>
                            {isUploading ? "Saving Image..." : "Update"}
                        </ProductButton>

                    </ProductFormRight>

                </ProductForm>
            </ProductBottom>


        </Container>
    )
}

export default Product

