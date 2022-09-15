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
            {navMenuItems.map(item => (<StyledLink href={item.href}>{item.name}</StyledLink>))}
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

const StyledLink = styled(Link)`
    color: ${HAO_PALETTE.WHITE};
    font-weight: bold;
`;
