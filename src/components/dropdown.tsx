import { Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import React, { useState } from 'react'
import { Maybe } from '../types/maybe'

export interface DropdownProps<T> {
    children?: Maybe<any>;
    className?: string;
    items: T[];
    onItemSelect: (item: Maybe<T>) => void;
    selectedItem: Maybe<T>;
}

export const Dropdown = <T,>({
    children,
    className,
    items,
    onItemSelect,
}: React.PropsWithChildren<DropdownProps<T>>): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClickChildren = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (index: number, item: T) => {
        onItemSelect(item);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={className}>
            <div onClick={handleClickChildren}>
                {children}
            </div>
            <Menu
                anchorEl={anchorEl}
                id={'dropdown-menu'}
                onClose={handleClose}
                open={open}
            >
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(index, item)}
                    >
                        {item as string}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
