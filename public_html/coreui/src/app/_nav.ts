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
    name: 'Candidates',
    url: '/candidates',
    icon: 'icon-drop'
  },
  {
    name: 'Client Rate',
    url: '/client-rate',
    icon: 'icon-drop'
  },
  {
    name: 'Clients',
    url: '/clients',
    icon: 'icon-drop'
  },
  {
    name: 'History',
    url: '/history',
    icon: 'icon-drop'
  },
  {
    name: 'Holidays',
    url: '/holidays',
    icon: 'icon-drop'
  },
  {
    name: 'Invoice',
    url: '/invoice',
    icon: 'icon-drop'
  },
  {
    name: 'Job Roles',
    url: '/job-roles',
    icon: 'icon-drop'
  },
  {
    name: 'Scheduler',
    url: '/timeline',
    icon: 'icon-drop'
  },
  {
    name: 'Jobs',
    url: '/jobs',
    icon: 'icon-drop'
  },
  {
    name: 'Reports',
    url: '/reports',
    icon: 'icon-drop'
  },
  {
    name: 'Staff Rate',
    url: '/staff-rate',
    icon: 'icon-drop'
  },
  {
    name: 'Time Sheet',
    url: '/time-sheets',
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
