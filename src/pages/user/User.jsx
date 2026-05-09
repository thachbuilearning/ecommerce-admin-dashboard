import { CalendarToday, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
// import Logoimage from "../../images/widget-12.avif"

const Container = styled.div`
padding: 20px;`

const UserTitleContainer = styled.div`
display: flex;
align-items: center;
justify-content:space-between;`

const UserTitle = styled.h1``

const UserAddButton = styled.button`
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

const UserContainer = styled.div`
display: flex;
margin-top: 20px;
gap:30px;
`;

const UserShow = styled.div`
flex:1;
padding: 20px;
border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
`

const UserUpdate = styled.div`
flex:2;
padding: 20px;
border-radius: 10px;
  /* cursor: pointer; */
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  `;
const UserShowTop = styled.div`
display: flex;
align-items: center;
gap:20px;
`;

const UserShowImg = styled.img`
width: 40px;
height: 40px;
border-radius:50%;
object-fit:cover;
`;
const UserShowTopTitle = styled.div`
display: flex;
flex-direction:column;
`;
const UserShowUserTitle = styled.span`
font-weight: 300;`
const UserShowUsername = styled.span`
font-weight: 600;`;

const UserShowBottom = styled.div`
margin-top: 20px;
`;

const UserShowBottomTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: lightgray;

`;

const UserShowBottomInfo = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #444;
    gap: 10px;
`;

const userShowIcon = {
    fontSize: "16px",
};

const UserShowBottomInfoTitle = styled.span`
  
`;
const UserUpdateTitle = styled.span`
  font-size: 24px;
    font-weight: 600;`
const UserUpdateForm = styled.form`
display: flex;
justify-content:space-between;
margin-top: 20px;
`;

const UserUpdateFormLeft = styled.div`
    
`;

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction:column;
    margin-top: 20px;
    gap: 5px;
`;

const UserUpdateFormRight = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:space-between;
`;
const UserUpdateFormLeftLabel = styled.label`
font-size: 14px;
`;
const UserUpdateFormLeftInput = styled.input`
            border:none;
            width: 250px;
            height: 30px;
            border-bottom: 1px solid gray;
        `;

const UserUpdateUpload = styled.div`
display: flex;
align-items: center;`
const UserUpdateImg = styled.img`
width: 100px;
height: 100px;
border-radius:10px;
object-fit:cover;`

const UserUpdateLable = styled.label``
const UserUpdateInput = styled.input``
const UserUpdateButton = styled.button`
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


const User = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <UserTitleContainer>
                <UserTitle>Edit User</UserTitle>
                <UserAddButton onClick={() => navigate(`/newuser`)}>Create</UserAddButton>
            </UserTitleContainer>
            <UserContainer>
                <UserShow>
                    <UserShowTop>
                        <UserShowImg src={require('../../images/widget-12.avif')} />
                        <UserShowTopTitle>
                            <UserShowUsername>Anna Becker</UserShowUsername>
                            <UserShowUserTitle>Software Engineer</UserShowUserTitle>

                        </UserShowTopTitle>
                    </UserShowTop>
                    <UserShowBottom>
                        <UserShowBottomTitle>Account Details</UserShowBottomTitle>
                        <UserShowBottomInfo>
                            <PermIdentity style={userShowIcon} />
                            <UserShowBottomInfoTitle>annabeck99</UserShowBottomInfoTitle>
                        </UserShowBottomInfo>
                        <UserShowBottomInfo>
                            <CalendarToday style={userShowIcon} />
                            <UserShowBottomInfoTitle>10.12.1999</UserShowBottomInfoTitle>
                        </UserShowBottomInfo>
                        <UserShowBottomTitle>Contact Details</UserShowBottomTitle>
                        <UserShowBottomInfo>
                            <PhoneAndroid style={userShowIcon} />
                            <UserShowBottomInfoTitle>+1-123 456 789</UserShowBottomInfoTitle>
                        </UserShowBottomInfo>
                        <UserShowBottomInfo>
                            <MailOutline style={userShowIcon} />
                            <UserShowBottomInfoTitle>annabeck99@gmail.com</UserShowBottomInfoTitle>
                        </UserShowBottomInfo>
                        <UserShowBottomInfo>
                            <LocationSearching style={userShowIcon} />
                            <UserShowBottomInfoTitle>New York | USA</UserShowBottomInfoTitle>
                        </UserShowBottomInfo>
                    </UserShowBottom>
                </UserShow>
                <UserUpdate>
                    <UserUpdateTitle>Edit</UserUpdateTitle>
                    <UserUpdateForm>
                        <UserUpdateFormLeft>
                            <UserUpdateItem>
                                <UserUpdateFormLeftLabel>Username</UserUpdateFormLeftLabel>
                                <UserUpdateFormLeftInput placeholder='annabeck99' ></UserUpdateFormLeftInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateFormLeftLabel>Birthday</UserUpdateFormLeftLabel>
                                <UserUpdateFormLeftInput placeholder='10.12.1999' ></UserUpdateFormLeftInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateFormLeftLabel>Telephone</UserUpdateFormLeftLabel>
                                <UserUpdateFormLeftInput placeholder='+1-123 456 789' ></UserUpdateFormLeftInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateFormLeftLabel>Email</UserUpdateFormLeftLabel>
                                <UserUpdateFormLeftInput placeholder='annabeck99@gmail.com' ></UserUpdateFormLeftInput>
                            </UserUpdateItem>
                            <UserUpdateItem>
                                <UserUpdateFormLeftLabel>Address</UserUpdateFormLeftLabel>
                                <UserUpdateFormLeftInput placeholder='New York | USA' ></UserUpdateFormLeftInput>
                            </UserUpdateItem>
                        </UserUpdateFormLeft>
                        <UserUpdateFormRight>
                            <UserUpdateUpload>
                                <UserUpdateImg src={require('../../images/widget-12.avif')} />
                                <UserUpdateLable htmlFor='file'><Publish style={{ cursor: "pointer" }} /></UserUpdateLable>
                                <UserUpdateInput type='file' id='file' style={{ display: "none" }}></UserUpdateInput>
                            </UserUpdateUpload>
                            <UserUpdateButton>Update</UserUpdateButton>
                        </UserUpdateFormRight>
                    </UserUpdateForm>
                </UserUpdate>
            </UserContainer>
        </Container>
    )
}

export default User