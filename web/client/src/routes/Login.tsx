import Button from '@mui/material/Button';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';
import { FieldError } from 'react-hook-form'
import {
    FormContainer,
    PasswordElement,
    TextFieldElement,
} from 'react-hook-form-mui';
import styled from 'styled-components'

const parseError = (error: FieldError) => {
    if (error.type === 'pattern') {
        return 'Enter an email'
    }
    return 'This field is required'
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
                    required
                    parseError={parseError}
                    autoComplete={'email'}
                    margin={'dense'}
                    label={'Email'}
                    name={'default-email-field'}
                />
                <PasswordElement
                    margin={'dense'}
                    label={'Password'}
                    required
                    name={'password'}
                />
                <Button style={{ marginTop: '16px' }} type='submit' variant='contained'>Login</Button>
            </FormContainer>
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
