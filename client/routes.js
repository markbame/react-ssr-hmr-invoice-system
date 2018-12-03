import AppRoot from './app'
import Home from './pages/home'
import Login from './pages/login'
import Admin from './pages/admin'
import Invoices from './pages/invoices'
import Invoice from './pages/invoice'
import Products from './pages/products'
import Product from './pages/product'
import DownloadPDF from './pages/downloadPDF'
const routes = [
  {
    component: AppRoot,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/admin',
        component: Admin
      },
      {
        path: '/products',
        component: Products,
      },
      {
        path: '/invoices',
        component: Invoices,
      },
      {
        path: '/invoice/:id',
        component: Invoice,
      },
      {
        path: '/product/:id',
        component: Product,
      },
      {
        path: '/invoice-download/:id',
        component: DownloadPDF,
      },
      {
       path: '*',
       component: Home
      }
    ]
  }
]

export default routes
