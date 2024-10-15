import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { store } from './redux/app/store';
import { logIn } from './redux/features/auth/authSlice';
import { decodeToken, getToken } from './redux/utils/token';

const token = getToken();
if (token) {
  const user = decodeToken(token);
  store.dispatch(logIn(user));
}

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <SidebarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SidebarProvider>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
