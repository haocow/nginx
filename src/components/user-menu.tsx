import Avatar from '@mui/material/Avatar';
import React from 'react'
import defaultPicture from '../static/images/emptyProfilePicture.png';
import { Dropdown } from './dropdown';

interface UserMenuProps {
    className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({ className }) => {
    const items = ["Profile", "Logout", "Third option?"];
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
