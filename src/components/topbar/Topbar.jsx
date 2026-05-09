import {
    LanguageOutlined,
    NotificationsNoneOutlined,
    SettingsOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const TopbarContainer = styled.div`
    width: 100%;
    height: 50px;
    background-color: #fff;
`;

const TopbarWrapper = styled.div`
    height: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopLeft = styled.div`
    height: 100%;
`;

const Logo = styled.img`
    height: 100%;
    width: auto;
    cursor: pointer;
`;

const TopRight = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TopbarIcons = styled.div`
    position: relative;
    cursor: pointer;
    color: #555;
    margin-right: 15px;
`;

const TopIconBadge = styled.span`
    position: absolute;
    top: -5px;
    right: 0;
    background-color: red;
    color: white;
    font-weight: bold;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
`;

const AvatarWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const TopAvatar = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    cursor: pointer;
    object-fit: cover;
`;

const Dropdown = styled.div`
    position: absolute;
    top: 46px;
    right: 0;
    width: 180px;
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    z-index: 999;
    overflow: hidden;
`;

const DropdownHeader = styled.div`
    padding: 10px;
    font-size: 13px;
    color: #333;
    border-bottom: 1px solid #eee;
`;

const DropdownItem = styled.div`
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #333;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const Topbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser);
    const [openDropdown, setOpenDropdown] = useState(false);
    const avatarMenuRef = useRef(null);

    const defaultAvatar = require("./c3137ee1cdfeff1ec40ef5b6cb7a07b1.jpg");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                avatarMenuRef.current &&
                !avatarMenuRef.current.contains(event.target)
            ) {
                setOpenDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("persist:root");
        setOpenDropdown(false);
        navigate("/login");
    };

    return (
        <TopbarContainer>
            <TopbarWrapper>
                <TopLeft>
                    <Logo src={require("./logo.jpg")} alt="Logo" />
                </TopLeft>

                <TopRight>
                    <TopbarIcons>
                        <NotificationsNoneOutlined />
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIcons>

                    <TopbarIcons>
                        <LanguageOutlined />
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIcons>

                    <TopbarIcons>
                        <SettingsOutlined />
                        <TopIconBadge>2</TopIconBadge>
                    </TopbarIcons>

                    <AvatarWrapper ref={avatarMenuRef}>
                        <TopAvatar
                            src={currentUser?.img || defaultAvatar}
                            alt="admin avatar"
                            onClick={() => setOpenDropdown((prev) => !prev)}
                        />

                        {openDropdown && (
                            <Dropdown>
                                <DropdownHeader>
                                    {currentUser?.username || "Admin"}
                                </DropdownHeader>

                                <DropdownItem onClick={handleLogout}>
                                    Logout
                                </DropdownItem>
                            </Dropdown>
                        )}
                    </AvatarWrapper>
                </TopRight>
            </TopbarWrapper>
        </TopbarContainer>
    );
};

export default Topbar;