import { ClassSharp, Publish } from '@material-ui/icons'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { userRequest } from '../../requestMethods';
// import { upload } from '@testing-library/user-event/dist/upload';
// import Logoimage from "../../images/widget-12.avif"

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
const ProductButton = styled.button`
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
//---------------------------


const Product = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    console.log("product id:", id)
    const [product, setProduct] = useState(null);
    const [pStats, setPStats] = useState([])



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
        fetch(`http://localhost:3000/api/products/${id}/product-details`)
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



    const handleUpdateProduct = async () => {
        try {
            // Fetch the existing product data first
            const response = await userRequest.get(`products/${id}/product-details`);

            if (response.status === 200) {
                const existingProduct = response.data;

                // Combine the existing product data with the updated fields
                const updatedFields = {
                    title: updatedProductData.title || existingProduct.title,
                    img: updatedProductData.img || existingProduct.img,
                    desc: updatedProductData.desc || existingProduct.desc,
                    price: updatedProductData.price || existingProduct.price,
                    inStock: updatedProductData.inStock || existingProduct.inStock,
                    // Add more fields as needed
                };

                // Send the combined data in the PUT request
                const updateResponse = await userRequest.put(`products/${id}/update-product`, updatedFields);

                if (updateResponse.status === 200) {
                    // Product updated successfully
                    console.log('Product updated successfully');
                }
            }
        } catch (error) {
            console.error('Error updating product:', error);
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
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    const image = e.target.files[0]; // Get the selected file
                                    setUpdatedProductData({ ...updatedProductData, img: image });
                                }}
                            />

                            {/* Input for providing a URL */}
                            <ProductUploadInput
                                type="text"
                                placeholder="Image URL"
                                onChange={(e) => setUpdatedProductData({ ...updatedProductData, img: e.target.value })}
                            />
                        </ProductUpload>

                        <ProductButton onClick={handleUpdateProduct}>Update</ProductButton>

                    </ProductFormRight>

                </ProductForm>
            </ProductBottom>


        </Container>
    )
}

export default Product

