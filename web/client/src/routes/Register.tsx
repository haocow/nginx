import Button from '@mui/material/Button'
import { Maybe } from 'common/types/maybe'
import React from 'react';
import { Link } from 'react-router-dom'
import { FieldError, useWatch } from 'react-hook-form'
import {
    FormContainer,
    PasswordElement,
    TextFieldElement,
} from 'react-hook-form-mui';
import styled from 'styled-components'
import { HAO_PALETTE } from '../styles/colors';

const parseError = (error: FieldError) => {
    if (error.type === 'pattern') {
        return 'Enter an email'
    }
    return 'This field is required'
}

interface SubmitButtonProps {
    children?: Maybe<any>;
    style?: React.CSSProperties;
}

const SubmitButton = ({ children, style }: SubmitButtonProps) => {
    const [email, firstName, lastName] = useWatch({
        name: ['email', 'first-name', 'last-name']
    })
    console.log('register', email, firstName, lastName)
    return (
        <Button
            disabled={!(email && firstName && lastName)}
            style={style}
            type='submit'
            variant='contained'
        >
            {children}
        </Button>
    )
}

export const Register: React.FC = () => {
    return (
        <StyledApplicationDiv>
            <FormContainer
                FormProps={{
                    style: {
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
                defaultValues={{}}
                onSuccess={() => {console.log('submit?')}}
            >
                <TextFieldElement
                    fullWidth
                    required
                    label='Email'
                    margin='dense'
                    name='email'
                    parseError={parseError}
                    type='email'
                />
                <TextFieldElement
                    fullWidth
                    required
                    label='First Name'
                    margin='dense'
                    name='first-name'
                />
                <TextFieldElement
                    fullWidth
                    required
                    label='Last Name'
                    margin='dense'
                    name='last-name'
                />
                <PasswordElement
                    fullWidth
                    required
                    label='Password'
                    margin='dense'
                    name='password'
                />
                <SubmitButton style={{ marginTop: '16px' }}>Login</SubmitButton>
            </FormContainer>
            <div>
                <span>Already have an account? </span>
                <StyledLink to='/login'>Login</StyledLink>
            </div>
        </StyledApplicationDiv>
    );
}

const StyledApplicationDiv = styled.div`
    align-items: center;
    // background-color: lightgray;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding-top: 100px;
    width: 100%;
`

const StyledLink = styled(Link)`
    color: ${HAO_PALETTE.AMBER};
    text-decoration: none;
`;
