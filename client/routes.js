import AppRoot from './app'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/notfound'

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
       path: '*',
       component: NotFound
      }
    ]
  }
]

export default routes
