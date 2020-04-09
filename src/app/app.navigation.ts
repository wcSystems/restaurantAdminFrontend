export const NavigationItems = [
  {
    title: 'Home',
    tags: 'home',
    icon: 'fal fa-home',
    items: [
      {
        title: 'Dasboard',
        tags: 'dasboard',
        routerLink: '/dashboard'
      }
    ]
  },
  {
    title: 'Configuración',
    tags: 'users',
    icon: 'fal fa-user',
    items: [
      {
        title: 'Lista de usuarios',
        tags: 'users',
        routerLink: '/users'
      },
      {
        title: 'Lista de empleados',
        tags: 'employes',
        routerLink: '/employees'
      },
      {
        title: 'Lista de mesas',
        tags: 'tables',
        routerLink: '/tables'
      },
      {
        title: 'Lista de mesoneros',
        tags: 'weaters',
        routerLink: '/waiterList'
      },
      {
        title: 'Ordenes de Ventas',
        tags: 'compras',
        routerLink: '/ordersCompras'
      },
      {
        title: 'Ordenes de Compras',
        tags: 'purchaseOrder',
        routerLink: '/purchaseOrder'
      },
    ]
  }
];
