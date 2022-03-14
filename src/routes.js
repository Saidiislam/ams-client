import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base

// Buttons

//Forms

// Icons

// Notifications

const Table = React.lazy(() => import('./views/theme/colors/Table'))
const filterUserTable = React.lazy(() => import('./views/theme/colors/FilterUserTable'))
const QrCodeUserData = React.lazy(() => import('./views/theme/colors/QrCodeUser'))
const UserProfile = React.lazy(() => import('./views/theme/colors/UserProfile'))
const UserList = React.lazy(() => import('./views/theme/colors/UserList'))
const PendingCheck = React.lazy(() => import('./views/theme/colors/PendingCheck'))
const BarCodeScanner = React.lazy(() => import('./views/theme/colors/BarCodeScanner'))
const FaceRecognition = React.lazy(() => import('./views/theme/colors/FaceRecognition'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/checking', name: 'Checking', component: Colors, exact: true },
  { path: '/checking/check', name: 'Check', component: Colors },
  { path: '/checking/table', name: 'Table', component: Typography },
  { path: '/checking/admin', name: 'Admin', component: Table, exact: true },
  { path: '/checking/filterUserTable', name: 'FilterUserTabele', component: filterUserTable },
  { path: '/checking/qrcodeUser', name: 'QrCodeUserData', component: QrCodeUserData },
  { path: '/checking/userprofile', name: 'UserProfile', component: UserProfile },
  { path: '/checking/userlist', name: 'UserList', component: UserList },
  { path: '/checking/paddingcheck', name: 'PendingCheck', component: PendingCheck },
  { path: '/checking/barcodescanner', name: 'BarCodeScanner', component: BarCodeScanner },
  { path: '/checking/facerecognition', name: 'FaceRecognition', component: FaceRecognition },
]

export default routes
