import { Box } from '@mui/material';
import { FormCurrency } from './components/FormCurrency';
import { useContext } from 'react';
import { MainContext } from './context/MainContext';
import { ClockLoader } from 'react-spinners';

const App = () => {
  const { isLoading } = useContext(MainContext);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      {isLoading ? <ClockLoader size={64} color='#fff' /> : <FormCurrency />}
    </Box>
  );
};

export default App;
