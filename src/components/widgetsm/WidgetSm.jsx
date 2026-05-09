import { Visibility } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';

const WidgetSmContainer = styled.div`
  flex: 1;
  margin: 0 20px;
  padding: 30px;
  border-radius: 10px;
  cursor: pointer;
  -webkit-box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
  box-shadow: 0px 10px 13px -7px #000000, 2px 3px 35px 11px rgba(0, 0, 0, 0.13);
`;

const WidgetSmTitle = styled.span`
  font-size: 32px;
  font-weight: 600;
`;

const WidgetSmList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const WidgetSmListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
`;

const WidgetSmUserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const WidgetSmUser = styled.span`
  display: flex;
  flex-direction: column;
`;

const WidgetSmUsername = styled.span`
  font-weight: 600;
`;

const WidgetSmUserTitle = styled.span`
  font-weight: 300;
`;

const WidgetSmButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  border: none;
  border-radius: 10px;
  padding: 7px;
  cursor: pointer;
  -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, inset 5px 5px 28px 8px rgba(0, 0, 0, 0.05);
  box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, inset 5px 5px 28px 8px rgba(0, 0, 0, 0.05);
`;

const CustomVisibility = styled(Visibility)`
  font-size: 18px;
  color: #850088;
`;

const WidgetSm = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/all-users?new=true&page=1");
        setUsers(res.data);
      } catch { }
    };
    getUsers();
  }, []);

  return (
    <WidgetSmContainer>
      <WidgetSmTitle>New Join Members</WidgetSmTitle>
      <WidgetSmList>
        {users.map((user) => (
          <WidgetSmListItem key={user._id}>
            <WidgetSmUserImg src={user.img || require('../../images/widget-1.avif')} />
            <WidgetSmUser>
              <WidgetSmUsername>{user.username}</WidgetSmUsername>
              <WidgetSmUserTitle>Software Engineer</WidgetSmUserTitle>
            </WidgetSmUser>
            <WidgetSmButton>
              <CustomVisibility />
              Display
            </WidgetSmButton>
          </WidgetSmListItem>
        ))}
      </WidgetSmList>
    </WidgetSmContainer>
  );
};

export default WidgetSm;
