import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { getCurrency, renderCurrency } from '../../../utils/currency';

import PlatesesRowCheckbox from './PlatesesRowCheckbox';
import { Diner, Item } from '../interfaces';

export const getUpdatedShares = (amount: string, selected: Set<string>) => {
  return {
    first: calculateFirstShare(amount, selected) || 0.00,
    rest: calculateBaseShare(amount, selected) || 0.00,
  };
}

export const calculateBaseShare = (amount: string, selected: Set<string>) => {
  if (selected.size === 0 || isNaN(Number(Number(amount)/selected.size))) {
    return getCurrency("0");
  }

  return getCurrency(Number(amount)/selected.size);
}

export const calculateFirstShare = (amountStr: string, selected: Set<string>) => {
  const amount = Number(amountStr);
  const baseShare = calculateBaseShare(amountStr, selected);
  return getCurrency(baseShare + (amount - (baseShare * selected.size)));
}

interface ITableRowProps {
  amount: any;
  checked: boolean;
  diners: Diner[];
  id: number;
  items: Item[];
  name: string;
  onChange(items: Item[]): void;
  selected: Set<string>;
  shares: {
    first: number;
    rest: number;
  };
}

const PlatesesTableRow: React.FC<ITableRowProps> = ({ amount, checked, diners, id, items, name, onChange, selected, shares }) => {
  const [amountError, setAmountError] = useState(false);

  const onRowAmountChange = (id: number, amount: string) => {
    setAmountError(isNaN(getCurrency(amount)));
    const shares = getUpdatedShares(amount, selected);
    const updatedItems = getUpdatedItems({ id, amount, shares })
    onChange(updatedItems);
  };

  const onRowNameChange = (id: number, name: string) => {
    const updatedItems = getUpdatedItems({ id, name })

    if (id !== items.length-1) {
      onChange(updatedItems);
    } else {
      onChange([...updatedItems, getNewItem(id+1)]);
    }
  };

  const onDinerCellClick = (id: number, diner: Diner) => {
    const newSet = new Set(selected);
    let updates: Partial<Item> = {};

    if (!selected.has(diner.name)) {
      newSet.add(diner.name);
      if (newSet.size === diners.length) {
        updates.checked = true;
      }
    } else {
      newSet.delete(diner.name);
      updates.checked = false;
    }
    updates.selected = newSet;
    updates.shares = getUpdatedShares(amount, newSet);
    onChange(getUpdatedItems({ id, ...updates }))
  }

  const onCheckboxClick = (id: number, checked: boolean) => {
    let updates: Partial<Item> = {checked: checked};
    if (checked) {
      updates.selected = new Set(diners.map((diner) => diner.name));
    } else {
      updates.selected = new Set();
    }
    updates.shares = getUpdatedShares(amount, updates.selected);
    onChange(getUpdatedItems({ id, ...updates }))
  }

  const getNewItem = (id: number): Item => {
    return { amount: '', checked: false, id, name: '', selected: new Set(), shares: {first: 0.00, rest: 0.00} };
  }

  const getUpdatedItems = ({id, ...updates}: Partial<Item> & Pick<Item, "id">) => {
    const updatedRow = {...items[id], ...updates};
    return items.map(item => item.id === id ? updatedRow : item);
  }

  const getFirstSelectedDiner = () => {
    return diners.find(diner => selected.has(diner.name));
  }

  return (
    <TableRow key={id}>
      <TableCell className='input item-name-col'>
        <TextField
          margin='none'
          onChange={val => onRowNameChange(id, val.target.value)}
          placeholder='Description'
          size='small'
          value={name}
          variant='outlined'
        />
      </TableCell>
      <TableCell className='input amount-col'>
        <TextField
          disabled={!name}
          error={amountError}
          margin='none'
          onChange={val => onRowAmountChange(id, val.target.value)}
          size='small'
          variant='outlined'
          value={amount}
        />
      </TableCell>
      {diners.map((diner) => {
        const first = getFirstSelectedDiner();
        const share = selected.has(diner.name) ?
          (diner.name === first?.name ? shares.first : shares.rest) :
          0;

        const classNames = ['itemized-item']
        if (selected.has(diner.name)) {
          classNames.push('selected');
        }
        return (
          <TableCell
            className={classNames.join(' ')}
            key={diner.name}
            onClick={() => onDinerCellClick(id, diner)}
            style={{
              border: `1px solid`,
            }}
          >
            {renderCurrency(share)}
          </TableCell>
        );
      })}
      <TableCell className='input' padding='checkbox' size='small'>
        <PlatesesRowCheckbox
          checked={checked}
          onChange={(checked) => onCheckboxClick(id, checked)}
        />
      </TableCell>
    </TableRow>
  );
}

PlatesesTableRow.defaultProps = {
  onChange: () => {},
}

export default PlatesesTableRow;
