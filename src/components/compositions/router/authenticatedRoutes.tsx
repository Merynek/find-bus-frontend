// import React, {lazy} from "react";
// import {observer} from "mobx-react";
// import {Navigate, Route, Routes} from "react-router-dom";
// import {CurrentUser} from "@/src/singletons/current-user";
// import {UserRole} from "@/src/api/openapi";
// import { ROUTES } from "@/src/enums/router.enum";
// import {useBean} from "ironbean-react";
// import {PageLoader} from "@/src/components/compositions/router/pageLoader";
//
// const HomePage = lazy(() => import("../../pages/homepage/home-page"));
// const AdminUsersPage = lazy(() => import("../../pages/admin/users/admin-users.page"));
// const AppConfigPage = lazy(() => import("../../pages/admin/app-config/app-config.page"));
// const EmailConfigPage = lazy(() => import("../../pages/admin/email-config/email-config.page"));
// const AdminTripsPage = lazy(() => import("../../pages/admin/trips/admin-trips.page"));
// const CreateTripPage = lazy(() => import("../../pages/create-trip/create-trip-page"));
// const ResetPasswordPage = lazy(() => import("../../pages/sign/reset-password/reset-password-page"));
// const TripDetailPage = lazy(() => import("../../pages/trip-detail/trip-detail.page"));
// const TripListPage = lazy(() => import("../../pages/trip-list/trip-list.page"));
// const UserSettingsPage = lazy(() => import("../../pages/user-settings/user-settings.page"));
// const VehiclePage = lazy(() => import("../../pages/vehicles/vehicles.page"));
// const AdminTripDetail = lazy(() => import("../../pages/admin/trip-detail/admin-trip-detail.page"));
//
// export const AuthenticatedRoutes = observer(() => {
//     const currentUser = useBean(CurrentUser);
//
//     const _routesForTransporter = () => {
//         return <>
//             <Route path={ROUTES.VEHICLES} element={<PageLoader><VehiclePage /></PageLoader>} />
//         </>
//     }
//
//     const _routesForDemander = () => {
//         return <>
//             <Route path={ROUTES.CREATE_TRIP} element={<PageLoader><CreateTripPage /></PageLoader>} />
//         </>
//     }
//
//     const _renderForAdmin = () => {
//         return <>
//             <Route path={ROUTES.ADMIN_TRIPS} element={<PageLoader><AdminTripsPage /></PageLoader>} />
//             <Route path={ROUTES.APP_CONFIG} element={<PageLoader><AppConfigPage /></PageLoader>} />
//             <Route path={ROUTES.EMAIL_CONFIG} element={<PageLoader><EmailConfigPage /></PageLoader>} />
//             <Route path={ROUTES.ADMIN_USERS} element={<PageLoader><AdminUsersPage /></PageLoader>} />
//             <Route path={ROUTES.ADMIN_TRIP_DETAIL + "/:id"} element={<PageLoader><AdminTripDetail /></PageLoader>} />
//         </>
//     }
//
//     return <Routes>
//         <Route path={ROUTES.HOME} element={<PageLoader><HomePage /></PageLoader>} />
//         <Route path={ROUTES.USER_SETTINGS} element={<PageLoader><UserSettingsPage /></PageLoader>} />
//         <Route path={ROUTES.TRIP_LIST} element={<PageLoader><TripListPage /></PageLoader>} />
//         <Route path={ROUTES.TRIP + "/:id"} element={<PageLoader><TripDetailPage /></PageLoader>} />
//         <Route path={ROUTES.RESET_PASSWORD} element={<PageLoader><ResetPasswordPage /></PageLoader>} />
//         {currentUser.role === UserRole.TRANSPORTER && _routesForTransporter()}
//         {currentUser.role === UserRole.DEMANDER && _routesForDemander()}
//         {currentUser.role === UserRole.ADMIN && _renderForAdmin()}
//         <Route path="*" element={<Navigate to={ROUTES.HOME}/>} />
//     </Routes>
// });