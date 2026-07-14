import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
// import { store } from './redux/store.js'
import { toolkitstore } from './redux/toolkitStore.js'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
   <BrowserRouter>
   <Provider store={toolkitstore}>
      <App />
    </Provider>
   </BrowserRouter>
)
