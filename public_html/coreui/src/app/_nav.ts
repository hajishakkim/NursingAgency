import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Bookings',
    url: '/bookings',
    icon: 'icon-drop'
  },
  {
    name: 'Vacancies',
    url: '/vacancies',
    icon: 'icon-drop'
  },
  {
    name: 'Staffs',
    url: '/staff',
    icon: 'icon-drop'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      }
    ]
  },
];
