import Button from '@mui/material/Button';
import { Maybe } from 'common/types/maybe'
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
    const [email] = useWatch({
        name: ['email']
    })
    console.log('login', email)
    return (
        <Button
            disabled={!(email)}
            style={style}
            type='submit'
            variant='contained'
        >
            {children}
        </Button>
    )
}

export const Login: React.FC = () => {
    const form = {
        agree: false
    }

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
                defaultValues={form}
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
                <span>Don't have an account? </span>
                <StyledLink to='/register'>Register</StyledLink>
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
