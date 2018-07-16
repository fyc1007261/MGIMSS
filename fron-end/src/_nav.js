export default {
  items: [
    {
      name: 'Dashboard',
      url: '/main/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      url: '/main/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/main/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/main/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/main/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/main/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/main/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/main/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/main/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/main/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/main/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/main/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/main/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/main/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/main/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/main/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/main/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/main/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/main/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/main/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/main/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/main/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/main/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/main/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/main/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/main/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      url: '/main/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/main/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/main/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/main/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/main/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/main/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/main/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/main/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/main/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/main/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/main/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      title: true,
      name: 'Functions',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Functions',
      url: '/main/fun',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Power Use',
          url: '/main/fun/poweruse',
          icon: 'cui-bar-chart',
        },
      ],
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
      ],
    },
    {
      name: 'Download CoreUI',
      url: 'http://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
    },
    {
      name: 'Try CoreUI PRO',
      url: 'http://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
    },
  ],
};
