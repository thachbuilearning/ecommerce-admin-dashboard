import { AttachMoney, BarChart, ChatBubbleOutline, DynamicFeed, LineStyle, MailOutline, PermIdentity, Report, Storefront, Timeline, TrendingUp, WorkOutline } from '@material-ui/icons';
import React from 'react'

import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components'


const SidebarContainer = styled.div`
    flex:1;
    height: calc(100vh-50px);
    /* background-color:pink; */
    position: sticky;
    top: 50px;
    /* padding: 20px;
border-radius: 10px;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13); */
`;
const Wrapper = styled.div`
padding: 20px;
color: #555;
`

const Menu = styled.div`
margin-bottom:10px;
`

const Title = styled.h1`
font-size: 24px;
padding: 5px;
`;

const SidebarList = styled.ul`
list-style-type:none;
padding: 5px;
`

const ListItem = styled.li`
padding: 5px;
cursor: pointer;
display: flex;
align-items: center;
border-radius:10px;
transition: background-color 0.2s;
gap: 5px;

/* Regular state styles */
${props =>
        !props.active &&
        css`
    &:hover {
        -webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0); 
box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0);
    }
  `}

/* Active state styles */
${props =>
        props.active &&
        css`
    -webkit-box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0); 
box-shadow: #FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, red 0 -18px 40px, 5px 5px 15px 5px rgba(0,0,0,0);
  `}
`;



const Sidebar = () => {
    const navigate = useNavigate();


    // Function to fetch product data when the "Products" item is clicked
    const handleProductsClick = () => {

        navigate(`/products`);
    };

    return (

        <SidebarContainer>
            <Wrapper>
                <Menu>
                    <Title>Dashboard</Title>
                    <SidebarList>
                        <ListItem active onClick={() => navigate(`/`)} >
                            <LineStyle />
                            Menu
                        </ListItem>
                        <ListItem>
                            <Timeline />
                            Analytics
                        </ListItem>
                        <ListItem>
                            <TrendingUp />
                            Sales
                        </ListItem>

                    </SidebarList>
                </Menu>
                <Menu>
                    <Title>Quick Menu</Title>
                    <SidebarList>
                        <ListItem active onClick={() => navigate(`/users`)}>
                            <PermIdentity />
                            Users
                        </ListItem>
                        <ListItem active onClick={handleProductsClick}>
                            <Storefront />
                            Products
                        </ListItem>
                        <ListItem>
                            <AttachMoney />
                            Transactions
                        </ListItem>
                        <ListItem>
                            <BarChart />
                            Reports
                        </ListItem>
                    </SidebarList>
                </Menu>
                <Menu>
                    <Title>Notifications</Title>
                    <SidebarList>
                        <ListItem>
                            <MailOutline />
                            Mail
                        </ListItem>
                        <ListItem>
                            <DynamicFeed />
                            Feedback
                        </ListItem>
                        <ListItem>
                            <ChatBubbleOutline />
                            Messages
                        </ListItem>

                    </SidebarList>
                </Menu>
                <Menu>
                    <Title>Staff</Title>
                    <SidebarList>
                        <ListItem>
                            <WorkOutline />
                            Manage
                        </ListItem>
                        <ListItem>
                            <Timeline />
                            Analytics
                        </ListItem>
                        <ListItem>
                            <Report />
                            Reports
                        </ListItem>

                    </SidebarList>
                </Menu>
                {/* jjjjjjjjjjjjjjjjjjjjjjjjj */}
                <Menu>
                    <Title>Dashboard</Title>
                    <SidebarList>
                        <ListItem>
                            <LineStyle />
                            Menu
                        </ListItem>
                        <ListItem>
                            <Timeline />
                            Analytics
                        </ListItem>
                        <ListItem>
                            <TrendingUp />
                            Sales
                        </ListItem>

                    </SidebarList>
                </Menu>
                <Menu>
                    <Title>Quick Menu</Title>
                    <SidebarList>
                        <ListItem>
                            <PermIdentity />
                            Users
                        </ListItem>
                        <ListItem onClick={handleProductsClick}>
                            <Storefront />
                            Products
                        </ListItem>
                        <ListItem>
                            <AttachMoney />
                            Transactions
                        </ListItem>
                        <ListItem>
                            <BarChart />
                            Reports
                        </ListItem>
                    </SidebarList>
                </Menu>
                <Menu>
                    <Title>Notifications</Title>
                    <SidebarList>
                        <ListItem>
                            <MailOutline />
                            Mail
                        </ListItem>
                        <ListItem>
                            <DynamicFeed />
                            Feedback
                        </ListItem>
                        <ListItem>
                            <ChatBubbleOutline />
                            Messages
                        </ListItem>

                    </SidebarList>
                </Menu>
                <Menu>
                    <Title>Staff</Title>
                    <SidebarList>
                        <ListItem>
                            <WorkOutline />
                            Manage
                        </ListItem>
                        <ListItem>
                            <Timeline />
                            Analytics
                        </ListItem>
                        <ListItem>
                            <Report />
                            Reports
                        </ListItem>

                    </SidebarList>
                </Menu>
            </Wrapper>
        </SidebarContainer >

    )
}

export default Sidebar