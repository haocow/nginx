import React from 'react'
import { Maybe } from '../../types/maybe'
import { User } from '../../types/user'

interface IContext {
    userDisplayName: Maybe<string>;
    user: Maybe<User>;
    error: Maybe<Error>;
}

export const UserContext = React.createContext<IContext>({
    userDisplayName: "",
    user: null,
    error: null,
});
