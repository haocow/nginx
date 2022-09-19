import React from 'react';
import Checkbox from '@mui/material/Checkbox';

interface IProps {
  checked: boolean;
  onChange(newValue: boolean): void;
}

const PlatesesRowCheckbox: React.FC<IProps> = ({ checked, onChange }) => {
  return (
    <Checkbox
      checked={checked}
      color='default'
      onChange={() => onChange(!checked)}
    />
  );
}

PlatesesRowCheckbox.defaultProps = {
  checked: false,
  onChange: () => {},
}

export default PlatesesRowCheckbox;
