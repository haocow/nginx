import React from 'react'
import { Maybe } from 'common/types/maybe'
import { User } from 'common/types/user'

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
