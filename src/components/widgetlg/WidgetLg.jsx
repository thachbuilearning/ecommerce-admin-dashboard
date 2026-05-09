import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../../requestMethods';
import { format } from 'timeago.js';

const WidgetLgContainer = styled.div`
  flex: 2;
  margin: 0 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
`;

const WidgetLgTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
`;
const WidgetLgTable = styled.table`
width: 100%;
border-spacing:20px;
`;

const WidgetLgTr = styled.tr``;

const WidgetLgTh = styled.th`
text-align:left;
`;

const WidgetLgTdUser = styled.td`
display: flex;
align-items: center;
font-weight: 600;
gap:10px;
`;

const WidgetLgTdImg = styled.img`
width: 40px;
height: 40px;
border-radius:50%;
object-fit:cover;
`;


const WidgetLgTdSpan = styled.span``;

const WidgetLgTdAmount = styled.td`

`;

const WidgetLgTdDate = styled.td`

`;

const WidgetLgTdStatus = styled.td`

`;

const Button = styled.button`
padding:5px 7px;

  background-color: ${(props) => (props.type === 'Approved' ? 'blue' : props.type === 'Declined' ? 'red' : 'yellow')};
  color: ${(props) => (props.type === 'Approved' ? 'white' : props.type === 'Declined' ? 'yellow' : 'red')};
width: 80px;
  -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px 5px 24px 0px rgba(0,0,0,0.13); 
box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 5px 5px 24px 0px rgba(0,0,0,0.13);
border:none;
border-radius:10px;
`;

const WidgetLg = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await userRequest.get("orders/all-orders?new=true&page=1");
                setOrders(res.data);
            } catch { }
        };
        getOrders();
    }, []);
    return (
        <WidgetLgContainer>
            <WidgetLgTitle>Latest Transactions</WidgetLgTitle>
            <WidgetLgTable>
                <WidgetLgTr>
                    <WidgetLgTh>Customer</WidgetLgTh>
                    <WidgetLgTh>Date</WidgetLgTh>
                    <WidgetLgTh>Amount</WidgetLgTh>
                    <WidgetLgTh>Status</WidgetLgTh>
                </WidgetLgTr>
                {orders.map((order) => (
                    <WidgetLgTr key={order._id}>
                        <WidgetLgTdUser>
                            <WidgetLgTdImg src={require('../../images/widget-5.jpg')} />
                            <WidgetLgTdSpan>{order.userId}</WidgetLgTdSpan>
                        </WidgetLgTdUser>
                        <WidgetLgTdDate>{format(order.createdAt)}</WidgetLgTdDate>
                        <WidgetLgTdAmount>${order.amount}</WidgetLgTdAmount>
                        <WidgetLgTdStatus>
                            <Button type={order.status}>{order.status}</Button>
                        </WidgetLgTdStatus>
                    </WidgetLgTr>
                ))}

            </WidgetLgTable>
        </WidgetLgContainer>
    );
};

export default WidgetLg;
