import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import React from 'react'
import styled from 'styled-components'
import defaultPicture from '../static/images/emptyProfilePicture.png';
import { Dropdown } from './dropdown';

interface UserMenuProps {
    className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
    const items = ["Profile", "Logout"];
    return (
        <Dropdown 
            className={className}
            items={items}
            onItemSelect={(item) => {console.log("user-menu onItemSelect", item)}}
            selectedItem={null}
        >
            <ProfilePicture src={defaultPicture} />
        </Dropdown>
    );
}

const ProfilePicture = styled.img`
    border-radius: 50%;
    width: 36px;
`;
