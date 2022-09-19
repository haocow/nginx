import Avatar from '@mui/material/Avatar';
import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components';
import defaultPicture from '../static/images/emptyProfilePicture.png';
import { Dropdown } from './dropdown';

interface UserMenuProps {
    className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
    const items = [
        <StyledLink to="/profile">Profile</StyledLink>,
        <StyledLink to="/login">Login</StyledLink>,
        <StyledLink to="/logout">Logout</StyledLink>,
    ];
    return (
        <Dropdown 
            className={className}
            items={items}
            onItemSelect={(item) => {console.log("user-menu onItemSelect", item)}}
            selectedItem={null}
        >
            <Avatar src={defaultPicture} />
        </Dropdown>
    );
}

const StyledLink = styled(Link)`
    color: black;
    text-decoration: none;
`;
