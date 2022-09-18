import React, { useState } from 'react';
import styled from "styled-components";
import { styled as muiStyled } from '@mui/material/styles';
import { withStyles } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormGroup from '@mui/material/FormGroup';
import InputBase from '@mui/material/InputBase';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { DECIMAL, DEFAULT_TIP_PCT, ENTER_KEY_CODE, PERCENTAGE, TAX_RATE_NY, FinancialTypes } from '../../constants/constants';
import { Maybe, isSome } from '../../types/maybe';
import { getCurrency, renderCurrency } from '../../utils/currency';
import { toDecimal } from '../../utils/percentages';

import PlatesesTableRow, { getUpdatedShares } from './subcomponents/PlatesesTableRow';
import TaxInput from './subcomponents/tax-input';
import { Diner, Item } from './interfaces';

import { HAO_PALETTE } from '../../styles/colors';
import './PlatesesPage.scss';

const DEFAULT_TAX = toDecimal(TAX_RATE_NY);
const DEFAULT_TIP = toDecimal(DEFAULT_TIP_PCT);

export const Plateses: React.FC = () => {
  const [dinerText, setDinerText] = useState('');
  const [dinerTextErrorMsg, setDinerTextErrorMsg] = useState<Maybe<string>>(undefined);
  const [diners, setDiners] = useState<Diner[]>([{name: 'You'}]);
  const [items, setItems] = useState<Item[]>([{amount: '', checked: false, id: 0, name: '', selected: new Set(), shares: {first: 0.00, rest: 0.00}}]);
  const [tax, setTax] = useState(DEFAULT_TAX);
  const [taxError, setTaxError] = useState(false);
  const [taxType, setTaxType] = useState<FinancialTypes>(PERCENTAGE);
  const [tips, setTips] = useState(DEFAULT_TIP);
  const [tipsError, setTipsError] = useState(false);
  const [tipsType, setTipsType] = useState<FinancialTypes>(PERCENTAGE);

  // ON CHANGE FUNCTIONS
  const onDinerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDinerTextErrorMsg(undefined);
    setDinerText(e.target.value);
  }

  const addDiner = () => {
    if (dinerText && isNewDiner(dinerText)) {
      setDiners(diners.concat({ name: dinerText }));
      setDinerText('');
    } else {
      if (!dinerText) {
        setDinerTextErrorMsg('Name must not be empty');
      } else if (!isNewDiner(dinerText)) {
        setDinerTextErrorMsg('Name already exists');
      } else {
        setDinerTextErrorMsg('Unknown error');
      }
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY_CODE) {
      addDiner();
    }
  }

  const onTaxChange = (val: string) => {
    const isPercentage = val.slice(-1) === '%';
    const tax = val === '' ? DEFAULT_TAX : val;
    const type = (val === '' || isPercentage) ? PERCENTAGE : DECIMAL;

    setTax(toDecimal(tax));
    setTaxError(isNaN(toDecimal(tax)));
    setTaxType(type);
  }

  const onTipsChange = (val: string) => {
    const isPercentage = val.slice(-1) === '%';
    const tip = val === '' ? DEFAULT_TIP : val;
    const type = (val === '' || isPercentage) ? PERCENTAGE : DECIMAL;

    setTips(toDecimal(tip));
    setTipsError(isNaN(toDecimal(tip)));
    setTipsType(type);
  }

  const onDelete = (chipToDelete: Diner) => {
    const newItems = items.map(item => {
      const name = chipToDelete.name;
      const updates: Partial<Item> = {};
      if (item.selected.has(name)) {
        const newSelected = new Set(item.selected)
        newSelected.delete(name)
        updates.selected = newSelected
        updates.shares = getUpdatedShares(item.amount, newSelected);
      }
      return {...item, ...updates};
    });
    setItems(newItems); // remove name from all selecteds and update shares
    setDiners(diners.filter((diner) => diner.name !== chipToDelete.name )); // remove name from diners list
  }

  // const SubmitButton = muiStyled(Button)<ButtonProps>(({ theme }) => ({
  //   color: theme.palette.success.secondary,
  // }));
  const SubmitButton = () => (
    <Button
      disableElevation
      onClick={addDiner}
      style={{
        padding: 0,
        backgroundColor: HAO_PALETTE.AMBER,
      }}
      variant='contained'
    >
      Submit
    </Button>
  );

  const getDinersBar = () => {
    return (
      <StyledUsersInputDiv>
        <TextField
          InputProps={{
            endAdornment: (<SubmitButton />)
          }}
          error={isSome(dinerTextErrorMsg)}
          helperText={dinerTextErrorMsg}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onDinerNameChange(e) }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyDown(e)}
          placeholder='Diner name...'
          style={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            minWidth: 260,
          }}
          value={dinerText}
          variant='outlined'
          size='small'
        />
        <StyledUsersChipsDiv>
          {diners.map((chip) => {
            return (
              <Chip
                id={chip.name}
                key={chip.name}
                label={chip.name}
                onDelete={() => onDelete(chip)}
              />
            );
          })}
        </StyledUsersChipsDiv>
      </StyledUsersInputDiv>
    );
  }

  const getHeader = () => {
    return (
      <TableHead id='table-header'>
        <TableRow>
          <TableCell className='item-name-header item-name-col' scope='col'>Item</TableCell>
          <TableCell className='currency-symbol amount-col' scope='col'>$</TableCell>
          {diners.map(diner =>
            <TableCell key={diner.name}>{diner.name}</TableCell>
          )}
        </TableRow>
      </TableHead>
    );
  }

  const getItemsBody = () => {
    return (
      <TableBody id='items-body'>
        {items.map((item) =>
          <PlatesesTableRow
            amount={item.amount}
            checked={item.checked}
            diners={diners}
            id={item.id}
            items={items}
            key={item.id}
            name={item.name}
            onChange={setItems}
            selected={item.selected}
            shares={item.shares}
          />)
        }
      </TableBody>
    );
  }

  const getTotalsBody = () => {
    return (
      <TableBody id='totals-body'>
        {getSubtotalsRow()}
        {getTaxesRow()}
        {getTipsRow()}
        {getTotalsRow()}
      </TableBody>
    );
  }

  const getSubtotalsRow = () => {
    const dinerSubtotals = getDinerSubtotalsMap();

    return (
      <TableRow className='subtotals-row'>
        <TableCell className='subtotals-row name-col'>Subtotal</TableCell>
        <TableCell className='subtotals-row amount-col'>{renderCurrency(getSubtotalAmount())}</TableCell>
        {diners.map((diner) =>
          <TableCell
            className='subtotals-row diner-subtotal'
            key={diner.name}
          >
            {renderCurrency(dinerSubtotals[diner.name])}
          </TableCell>
        )}
      </TableRow>
    )
  }

  const getTaxesRow = () => {
    const dinerTaxes = getDinerAdditionalsMap(taxType, tax);

    return (
      <TableRow className='taxes-row'>
        <TableCell className='taxes-row name-col'>+ Taxes</TableCell>
        <TableCell className='taxes-row amount-col'>
          <TaxInput
            error={taxError}
            onChange={val => onTaxChange(val)}
            placeholder={DEFAULT_TAX}
          />
        </TableCell>
        {diners.map((diner) =>
          <TableCell
            className='taxes-row diner-tax'
            key={diner.name}
          >
            {renderCurrency(dinerTaxes[diner.name])}
          </TableCell>
        )}
      </TableRow>
    );
  }

  const getDinerAdditionalsMap = (type: FinancialTypes, amount: number) => {
    const subtotal = getSubtotalAmount();
    const dinerSubtotals = getDinerSubtotalsMap();
    const dinerShares: { [key: string]: number } = {}

    let subtotalDiff = type === DECIMAL ? amount : subtotal*amount;
    diners.forEach(diner => {
      if (type === PERCENTAGE) {
        const amt = getCurrency(dinerSubtotals[diner.name] * amount);
        dinerShares[diner.name] = isNaN(amt) ? getCurrency(0) : amt;
        subtotalDiff -= amt;
      } else {
        const share = toDecimal(dinerSubtotals[diner.name]/subtotal);
        subtotalDiff -= getCurrency(amount * share);
        dinerShares[diner.name] = getCurrency(amount * share);
      }
    })

    const first = diners.find(diner => dinerSubtotals[diner.name] > 0);
    if (first) {
      dinerShares[first.name] += getCurrency(subtotalDiff);
    }

    return dinerShares;
  }

  const getTipsRow = () => {
    const dinerTips = getDinerAdditionalsMap(tipsType, tips);

    return (
      <TableRow className='tips-row'>
        <TableCell className='tips-row name-col'>+ Tips</TableCell>
        <TableCell className='tips-row amount-col'>
          <TaxInput
            error={tipsError}
            onChange={val => onTipsChange(val)}
            placeholder={DEFAULT_TIP}
          />
        </TableCell>
        {diners.map((diner) =>
          <TableCell
            className='tips-row diner-tip'
            key={diner.name}
          >
            {renderCurrency(dinerTips[diner.name])}
          </TableCell>
        )}
      </TableRow>
    );
  }

  const getTotalAmount = () => {
    const subtotal = getSubtotalAmount();
    const taxAmt = taxType === DECIMAL ? tax : subtotal*tax;
    const tipAmt = tipsType === DECIMAL ? tips : subtotal*tips;

    return subtotal + taxAmt + tipAmt;
  }

  const getTotalsRow = () => {
    const total = getTotalAmount();
    const dinerSubtotals = getDinerSubtotalsMap();
    const dinerTaxes = getDinerAdditionalsMap(taxType, tax);
    const dinerTips = getDinerAdditionalsMap(tipsType, tips);

    return (
      <TableRow className='totals-row'>
        <TableCell className='totals-row name-col'>Grand Total</TableCell>
        <TableCell className='totals-row amount-col'>{renderCurrency(total)}</TableCell>
        {diners.map(diner =>
          <TableCell
            className='totals-row diner-total'
            key={diner.name}
          >
            {renderCurrency(dinerSubtotals[diner.name] + dinerTaxes[diner.name] + dinerTips[diner.name])}
          </TableCell>
        )}
      </TableRow>
    );
  }

  const getSubtotalAmount = () => {
    return items.reduce((acc, item) => acc + getCurrency(item.amount), 0.00);
  }

  const getDinerSubtotalsMap = () => {
    const dinerSubtotals: { [key: string]: number } = {}
    diners.forEach(diner => dinerSubtotals[diner.name] = 0.00);
    items.forEach(item => {
      const first = diners.find(diner => item.selected.has(diner.name));
      item.selected.forEach(name =>
        dinerSubtotals[name] += name === first?.name ? item.shares.first : item.shares.rest
      );
    });
    return dinerSubtotals;
  }

  const getTable = () => {
    return (
      <TableContainer>
        <Table className='plateses-table' id='plateses-table'>
          {getHeader()}
          {getItemsBody()}
          {getTotalsBody()}
        </Table>
      </TableContainer>
    );
  }

  const isNewDiner = (name: string) => {
    return diners.findIndex((diner) => name === diner.name) === -1;
  }

  return (
    <StyledApplicationDiv>
      {getDinersBar()}
      <StyledContentDiv>
        <h3>Itemized Items</h3>
        {getTable()}
      </StyledContentDiv>
    </StyledApplicationDiv>
  );
}

const StyledApplicationDiv = styled.div`
  padding: 16px;
`;

const StyledUsersInputDiv = styled.div`
  display: flex;
  gap: 16px;
`;

const StyledUsersChipsDiv = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledContentDiv = styled.div`
`;
