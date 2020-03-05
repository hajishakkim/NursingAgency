import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard'
  },
  {
    name: 'Bookings',
    url: '/bookings'
  },
  {
    name: 'Vacancies',
    url: '/vacancies'
  },
  {
    name: 'Staffs',
    url: '/staff',
  },
  {
    name: 'Candidates',
    url: '/candidates',
  },
  {
    name: 'Client Rate',
    url: '/client-rate',
  },
  {
    name: 'Clients',
    url: '/clients',
  },
  {
    name: 'History',
    url: '/history',
  },
  {
    name: 'Holidays',
    url: '/holidays',
  },
  {
    name: 'Invoice',
    url: '/invoice',
  },
  {
    name: 'Job Roles',
    url: '/job-roles',
  },
  {
    name: 'Jobs',
    url: '/jobs',
  },
  {
    name: 'Reports',
    url: '/reports',
  },
  {
    name: 'Staff Rate',
    url: '/staff-rate',
  },
  {
    name: 'Time Sheet',
    url: '/time-sheets',
  },
  {
    name: 'Base',
    url: '/base',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      }
    ]
  },
];
