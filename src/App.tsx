import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import './app.css';

import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import ThemeProvider from './theme/ThemeProvider';
function App() {
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const content = useRoutes(router(isAuthenticated));

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
