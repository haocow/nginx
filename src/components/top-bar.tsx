import styled from "styled-components";
import { HAO_PALETTE } from "../styles/colors";
import logo from "../static/images/logo/logo.svg";
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';

const navMenuItems = [
    { name: "Plateses", href: "/plateses"},
];

const topBarStyle = {
    background: HAO_PALETTE.OXFORD_BLUE,
}

const toolbarStyle = {
    gap: 24,
}

const linkStyle = {
    color: HAO_PALETTE.WHITE,
    fontWeight: "bold",
    textDecoration: "none",
}

export const TopBar: React.FC = () => {
    return (
        <AppBar position="relative" style={topBarStyle}>
            <Toolbar style={toolbarStyle}>
                <TopBarLogo />
                <TopBarNavMenu />
            </Toolbar>
        </AppBar>
    );
}

const TopBarNavMenu = () => {
    return (
        <>
            {navMenuItems.map(item => (<Link style={linkStyle} href={item.href}>{item.name}</Link>))}
        </>
    );
}

const TopBarLogo = () => (
    <Link href='/'>
        <StyledTopBarLogoImg alt="logo" src={logo} />
    </Link>    
);

const StyledTopBarLogoImg = styled.img`
    height: 36px;
    margin: 12px;
`;
