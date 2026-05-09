import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { deleteProduct } from '../../redux/apiCalls';
import { userRequest } from '../../requestMethods';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
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

// Rest of your component code...

const ProductList = () => {
    // const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);


    useEffect(() => {
        // Fetch products when the component mounts
        userRequest.get('/products/all-products')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleDelete = (id) => {
        setDeleteConfirmation(true);
        setProductIdToDelete(id);
    };

    const confirmDelete = () => {
        // Make the delete request
        userRequest.delete(`/products/${productIdToDelete}/delete`)
            .then(() => {
                // Remove the deleted product from the list
                setProducts(products.filter((product) => product._id !== productIdToDelete));
                setDeleteConfirmation(false);
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
                setDeleteConfirmation(false);
            });
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'title',
            headerName: 'Product name',
            width: 500,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}
                            src={params.row.img}
                            alt=""
                        />
                        {params.row.title}
                    </div>
                );
            },
        },
        {
            field: 'inStock',
            headerName: 'Stock',
            width: 50,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 50,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            style={{ border: 'none', borderRadius: '10px', padding: '5px 10px', boxShadow: 'inset -1px 3px 8px 5px #FFD7D7, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0)', background: '#FF2F2F', color: 'white', cursor: 'pointer', marginRight: '30px' }}
                            onClick={() => navigate(`/product/${params.row._id}`)}
                        >
                            Edit
                        </button>
                        <DeleteOutline
                            style={{ cursor: 'pointer', color: 'red' }}
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div style={{ backgroundColor: 'gray', height: '400px' }}>
            <DataGrid
                rows={products}
                columns={columns}
                disableSelectionOnClick
                pageSize={5}
                getRowId={(row) => row._id}
                checkboxSelection
                style={{ background: 'white', border: '1px solid #ccc' }}
            />
            {deleteConfirmation && (
                <ModalContainer>
                    <ModalContent>
                        <p>Are you sure you want to delete this item?</p>
                        <button onClick={confirmDelete}>Yes</button>
                        <button onClick={() => setDeleteConfirmation(false)}>No</button>
                    </ModalContent>
                </ModalContainer>
            )}
        </div>
    );
};

export default ProductList;
