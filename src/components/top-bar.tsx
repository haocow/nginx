import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from '../static/images/logo/logo.svg';
import { HAO_PALETTE } from '../styles/colors';
import { UserMenu } from './user-menu';

const navMenuItems = [
    { name: "Plateses", href: "/plateses"},
];

const topBarStyle = {
    background: HAO_PALETTE.OXFORD_BLUE,
}

const toolbarStyle = {
    gap: 24,
}

export const TopBar: React.FC = () => {
    return (
        <AppBar position="relative" style={topBarStyle}>
            <Toolbar style={toolbarStyle}>
                <TopBarLogo />
                <TopBarNavMenu />
                <StyledUserMenu />
            </Toolbar>
        </AppBar>
    );
}

const TopBarNavMenu = () => {
    return (
        <>
            {navMenuItems.map(item => (<StyledLink to={item.href} key={item.name}>{item.name}</StyledLink>))}
        </>
    );
}

const TopBarLogo = () => (
    <Link to='/'>
        <StyledTopBarLogoImg alt="logo" src={logo} />
    </Link>    
);

const StyledTopBarLogoImg = styled.img`
    height: 36px;
    margin: 12px;
`;

const StyledLink = styled(Link)`
    color: ${HAO_PALETTE.WHITE};
    font-weight: bold;
    text-decoration: none;
`

const StyledUserMenu = styled(UserMenu)`
    margin-left: auto;
`
