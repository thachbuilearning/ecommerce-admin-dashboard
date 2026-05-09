import React from 'react'
import styled from 'styled-components'

const NewUserContainer = styled.div`
    flex:4;
`
const NewUserTitle = styled.h1``
const NewUserForm = styled.form`
display: flex;
flex-wrap:wrap;
gap: 20px;
`;

const NewUserItem = styled.div`
width: 400px;
display: flex;
flex-direction:column;
gap: 10px;
`;

const NewUserItemLable = styled.label`
font-size: 14px;
font-weight: 600;
color:gray;
`
const NewUserItemInput = styled.input`
height: 20px;
padding: 10px;
border: 1px solid gray;
border-radius:5px;
`
const NewUserGender = styled.div``

const NewUserButton = styled.button`
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

const NewUser = () => {
    return (
        <NewUserContainer>
            <NewUserTitle>New User</NewUserTitle>
            <NewUserForm>
                <NewUserItem>
                    <NewUserItemLable>Username</NewUserItemLable>
                    <NewUserItemInput type='text' placeholder="jone"></NewUserItemInput>
                </NewUserItem>
                <NewUserItem>
                    <NewUserItemLable>Full Name</NewUserItemLable>
                    <NewUserItemInput type='text' placeholder="jone smith"></NewUserItemInput>
                </NewUserItem>
                <NewUserItem>
                    <NewUserItemLable>Email</NewUserItemLable>
                    <NewUserItemInput type='email' placeholder="jone@gmail.com"></NewUserItemInput>
                </NewUserItem>
                <NewUserItem>
                    <NewUserItemLable>Password</NewUserItemLable>
                    <NewUserItemInput type='password' placeholder="password"></NewUserItemInput>
                </NewUserItem>

                <NewUserItem>
                    <NewUserItemLable>Phone</NewUserItemLable>
                    <NewUserItemInput type='text' placeholder="+1 23 456789"></NewUserItemInput>
                </NewUserItem>
                <NewUserItem>
                    <NewUserItemLable>Address</NewUserItemLable>
                    <NewUserItemInput type='text' placeholder="New York | USA"></NewUserItemInput>
                </NewUserItem>
                <NewUserItem>
                    <NewUserGender>
                        <NewUserItemLable>Gender</NewUserItemLable>
                        <input type='radio' name='gender' id='male' value="male" style={{ margin: "0 10px" }} />
                        <NewUserItemLable for="male">Male</NewUserItemLable>
                        <input type='radio' name='gender' id='female' value="female" style={{ margin: "0 10px" }} />
                        <NewUserItemLable for="female">Female</NewUserItemLable>
                    </NewUserGender>
                </NewUserItem>
                <NewUserItem>
                    <NewUserItemLable >Active</NewUserItemLable>
                    <select className="newUserSelect" name="active" id="active" style={{ height: "40px", borderRadius: "5px" }}>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </NewUserItem>
                <NewUserButton>Create</NewUserButton>
            </NewUserForm>
        </NewUserContainer>
    )
}

export default NewUser

