import {
  Box,
  FormGroup,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from '../context/MainContext';
import { MODE } from '../types/modeEnum';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 28,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 20,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(16px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 24,
    height: 24,
    borderRadius: 12,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 14,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export const FormCurrency = () => {
  const { currentMode, onChangeCurrentMode, convertUserPrice, usdt } =
    useContext(MainContext);

  const [userCurrency, setUserCurrency] = useState('');

  const onHandleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    convertUserPrice(event.target.value);
    setUserCurrency(event.target.value);
  };

  const onHandleChangeMode = () => {
    onChangeCurrentMode();
    convertUserPrice(userCurrency);
  };

  useEffect(() => {
    convertUserPrice(userCurrency);
  }, [currentMode, convertUserPrice, userCurrency]);

  return (
    <FormGroup
      sx={{
        display: 'flex',
        border: '2px solid gray',
        paddingBlock: 3,
        paddingInline: 3,
        gap: 2,
      }}
    >
      <Typography color='white' textTransform='uppercase' textAlign='center'>
        Currency Change
      </Typography>
      <Box>
        <Typography color='white' mb={1.5} textAlign='center'>
          ETH amount
        </Typography>
        <TextField
          variant='outlined'
          color='primary'
          type='number'
          placeholder='Write your ETH'
          sx={{ width: '300px' }}
          value={userCurrency}
          onChange={onHandleChangeValue}
        />
      </Box>
      <Box>
        <Typography color='white' mb={1.5} textAlign='center'>
          Action
        </Typography>

        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
          justifyContent='center'
        >
          <AntSwitch
            checked={currentMode === MODE.SELL}
            inputProps={{ 'aria-label': 'ant design' }}
            onChange={onHandleChangeMode}
          />
          <Typography color='white'>
            {currentMode === MODE.BUY ? 'Buy' : 'Sell'}
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Typography color='white' textAlign='center' mb={1.5}>
          You will recieve:
        </Typography>

        <TextField
          sx={{ width: '300px' }}
          variant='outlined'
          disabled
          value={usdt.toFixed(2) + ' USDT'}
        />
      </Box>
    </FormGroup>
  );
};
