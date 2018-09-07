export default {
  items: [
    {
      title: true,
      name: 'Info',
    },
    {
      name: 'About',
      url: '/main/about',
      icon: 'cui-aperture',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Appliance',
    },
    {
      name: 'Appliances',
      url: '/main/apps',
      icon: 'cui-list',
    },
    {
      name: 'Schedule',
      url: '/main/schedule',
      icon: 'cui-browser',
    },
    {
      title: true,
      name: 'Charts',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Power Use',
      url: '/main/fun/poweruse',
      icon: 'cui-bar-chart',
    },
    {
      name: 'Charge Board',
      url: '/main/dashboard',
      icon: 'cui-battery-full',
    },
    {
      title: true,
      name: 'AI Assistant',
    },
    {
      name: 'AI Wei',
      url: '/main/getMedia',
      icon: 'fa fa-circle-o-notch',
      badge: {
        variant: 'info',
        text: 'HOT',
      },
    },
    {
      name: 'Wei forcast',
      url: '/main/forecast',
      icon: 'cui-graph',
    },
    {
      title: true,
      name: 'User',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'User',
      url: '/main/user',
      icon: 'icon-user',
      children: [
        {
          name: 'Profile',
          url: '/main/user/profile',
          icon: 'cui-clipboard',
        },
        {
          name: 'Avatar',
          url: '/main/user/avatar',
          icon: 'cui-camera',
        },
        // {
        //   name: 'Notification',
        //   url: '/main/user/notification',
        //   icon: 'cui-bullhorn',
        // },
      ],
    },
  ],
};
