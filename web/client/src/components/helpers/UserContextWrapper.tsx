import React from 'react'
import { UserContext } from "../../components/contexts/user-context";

interface IProps {
    children: any;
}

export const UserContextWrapper: React.FC<IProps> = ({ children }) => {
    return (
        <UserContext.Provider
            value={{
                userDisplayName: "You",
                user: null,
                error: null,
            }}
        >
            { children }
        </UserContext.Provider>
    );
}
