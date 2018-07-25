import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';


function Loading() {
  return <div>Loading...</div>;
}

const Breadcrumbs = Loadable({
  loader: () => import('./views/Base/Breadcrumbs'),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import('./views/Base/Cards'),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import('./views/Base/Carousels'),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import('./views/Base/Collapses'),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import('./views/Base/Dropdowns'),
  loading: Loading,
});

const Forms = Loadable({
  loader: () => import('./views/Base/Forms'),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import('./views/Base/Jumbotrons'),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import('./views/Base/ListGroups'),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import('./views/Base/Navbars'),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import('./views/Base/Navs'),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import('./views/Base/Paginations'),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import('./views/Base/Popovers'),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import('./views/Base/ProgressBar'),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import('./views/Base/Switches'),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import('./views/Base/Tables'),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import('./views/Base/Tabs'),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import('./views/Base/Tooltips'),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import('./views/Buttons/BrandButtons'),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import('./views/Buttons/ButtonDropdowns'),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import('./views/Buttons/ButtonGroups'),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import('./views/Buttons/Buttons'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const CoreUIIcons = Loadable({
  loader: () => import('./views/Icons/CoreUIIcons'),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import('./views/Icons/Flags'),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import('./views/Icons/FontAwesome'),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import('./views/Icons/SimpleLineIcons'),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import('./views/Notifications/Alerts'),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import('./views/Notifications/Badges'),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import('./views/Notifications/Modals'),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import('./views/Theme/Colors'),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import('./views/Theme/Typography'),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const Appliances = Loadable({
  loader: () => import('./views/Appliances/Appliances'),
  loading: Loading,
});

const Appliance = Loadable({
  loader: () => import('./views/Appliances/Appliance'),
  loading: Loading,
});

const PowerUse = Loadable({
  loader: () => import('./views/Functions/PowerUse/PowerUse'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./views/User/Profile/Profile'),
  loading: Loading,
});

const Notification = Loadable({
  loader: () => import('./views/User/Notification/Notification'),
  loading: Loading,
});

const getMedia = Loadable({
  loader: () => import('./views/getMedia/getMedia'),
  loading: Loading,
});

const forecast = Loadable({
  loader: () => import('./views/getMedia/forecast'),
  loading: Loading,
});


const Avatar = Loadable({
  loader: () => import('./views/User/Avatar/Avatar'),
  loading: Loading,
});


const Schedule = Loadable({
  loader: () => import('./views/Schedules/Schedule'),
  loading: Loading,
});

const Schedules = Loadable({
  loader: () => import('./views/Schedules/Schedules'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/main/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/main/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/main/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/main/theme/colors', name: 'Colors', component: Colors },
  { path: '/main/theme/typography', name: 'Typography', component: Typography },
  { path: '/main/base', exact: true, name: 'Base', component: Cards },
  { path: '/main/base/cards', name: 'Cards', component: Cards },
  { path: '/main/base/forms', name: 'Forms', component: Forms },
  { path: '/main/base/switches', name: 'Switches', component: Switches },
  { path: '/main/base/tables', name: 'Tables', component: Tables },
  { path: '/main/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/main/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/main/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/main/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/main/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/main/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/main/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/main/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/main/base/navs', name: 'Navs', component: Navs },
  { path: '/main/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/main/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/main/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/main/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/main/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/main/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/main/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/main/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/main/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/main/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/main/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/main/icons/flags', name: 'Flags', component: Flags },
  { path: '/main/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/main/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/main/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/main/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/main/notifications/badges', name: 'Badges', component: Badges },
  { path: '/main/notifications/modals', name: 'Modals', component: Modals },
  { path: '/main/widgets', name: 'Widgets', component: Widgets },
  { path: '/main/charts', name: 'Charts', component: Charts },
  { path: '/main/apps', exact: true,  name: 'Appliances', component: Appliances },
  { path: '/main/apps/:id', exact: true, name: 'Appliance Details', component: Appliance },
  { path: '/main/fun', exact: true, name: 'Functions', component: PowerUse },
  { path: '/main/fun/poweruse', name: 'Power Use', component: PowerUse },
  { path: '/main/user', exact: true, name: 'User', component: Profile },
  { path: '/main/user/profile', name: 'Profile', component: Profile },
  // { path: '/main/user/avatar', name: 'Avatar', component: Avatar },
  // { path: '/main/user/notification', name: 'Notification', component: Notification },
  { path: '/main/getMedia', name: 'AI小微', component: getMedia },
  { path: '/main/forecast', name: '小微预测', component: forecast },
  { path: '/main/schedule', name: 'AI小微', component: Schedules },
  { path: '/main/schedule/:id', name: '小微预测', component: Schedule },
];

export default routes;
