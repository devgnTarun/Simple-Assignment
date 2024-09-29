import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store.ts'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* Used here because all code is fitted in app.tsx  */}
      <App />
    </BrowserRouter>
  </Provider>,
)
