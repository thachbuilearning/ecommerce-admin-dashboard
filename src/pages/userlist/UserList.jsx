import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../requestMethods';

const UserList = () => {
    const gridContainerStyle = {
        backgroundColor: 'gray',
        height: '400px',
    };

    const dataGridStyle = {
        background: 'white',
        border: '1px solid #ccc',
    };

    const userListUser = {
        display: "flex",
        alignItems: "center",
    };

    const userListImg = {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "10px",
    };

    const userListEdit = {
        border: "none",
        borderRadius: "10px",
        padding: "5px 10px",
        webkitBoxShadow: " inset -1px 3px 8px 5px #FFD7D7, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0)",
        boxShadow: "inset -1px 3px 8px 5px #FFD7D7, 2px 5px 16px 0px #0B325E, inset -3px -3px 15px -30px rgba(0,0,0,0)",
        background: " #FF2F2F",
        color: "white",
        cursor: "pointer",
        marginRight: "30px",
    };

    const userListDelete = {
        cursor: "pointer",
        color: "red",
    };

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const formatCurrency = (amount) => {
        return `$${Number(amount || 0).toFixed(2)}`;
    };

    useEffect(() => {
        const getUsersWithTransactionVolume = async () => {
            try {
                setLoading(true);

                const [usersRes, ordersRes] = await Promise.all([
                    userRequest.get("/users/all-users"),
                    userRequest.get("/orders/all-orders"),
                ]);

                const approvedOrderTotalsByUser = ordersRes.data.reduce((totals, order) => {
                    if (order.status === "approved") {
                        const userId = order.userId;
                        const amount = Number(order.amount || 0);

                        totals[userId] = (totals[userId] || 0) + amount;
                    }

                    return totals;
                }, {});

                const formattedUsers = usersRes.data.map((user) => ({
                    id: user._id,
                    username: user.username,
                    avatar: user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif",
                    email: user.email,
                    status: user.isAdmin ? "Admin" : "Customer",
                    transaction: formatCurrency(approvedOrderTotalsByUser[user._id] || 0),
                }));

                setData(formattedUsers);
                setError("");
            } catch (err) {
                console.error("Failed to fetch users or orders:", err);
                setError("Cannot load users. Please login with an admin account.");
            } finally {
                setLoading(false);
            }
        };

        getUsersWithTransactionVolume();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) return;

        try {
            await userRequest.delete(`/users/${id}/delete`);
            setData(data.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Failed to delete user:", err);
            alert("Delete failed. Please check admin permission.");
        }
    };

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 220,
        },
        {
            field: 'user',
            headerName: 'User name',
            width: 300,
            renderCell: (params) => {
                return (
                    <div style={userListUser}>
                        <img style={userListImg} src={params.row.avatar} alt='' />
                        {params.row.username}
                    </div>
                );
            },
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 230,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
        },
        {
            field: 'transaction',
            headerName: 'Transaction Volume',
            width: 180,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            style={userListEdit}
                            onClick={() => navigate(`/user/${params.row.id}`)}
                        >
                            Edit
                        </button>
                        <DeleteOutline
                            style={userListDelete}
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    if (loading) {
        return <div style={gridContainerStyle}>Loading users...</div>;
    }

    if (error) {
        return <div style={gridContainerStyle}>{error}</div>;
    }

    return (
        <div style={gridContainerStyle}>
            <DataGrid
                rows={data}
                columns={columns}
                disableSelectionOnClick
                pageSize={5}
                checkboxSelection
                style={dataGridStyle}
            />
        </div>
    );
};

export default UserList;