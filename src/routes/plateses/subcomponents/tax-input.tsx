import TextField  from '@mui/material/TextField';
import { TAX_RATE_NY } from 'common/constants/constants';
import React from 'react';
import { renderPercentage, toDecimal } from '../../../utils/percentages';

interface TaxInputProps {
  error: any;
  onChange(newValue: string): void;
  placeholder: number;
  variant?: "standard" | "filled" | "outlined" | undefined;
}

const TaxInput: React.FC<TaxInputProps> = ({ error, onChange, placeholder, variant }) => {
  const handleChange = (val: string) => {
    onChange(val);
  }

  return (
    <TextField
      error={error}
      margin='none'
      onChange={val => handleChange(val.target.value)}
      placeholder={renderPercentage(placeholder)}
      size='small'
      variant={variant}
    />
  );
}

TaxInput.defaultProps = {
  error: false,
  onChange: () => {},
  placeholder: toDecimal(TAX_RATE_NY),
  variant: 'outlined',
}

export default TaxInput;
