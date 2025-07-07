import React, {lazy} from "react";
import {observer} from "mobx-react";
import {Navigate, Route, Routes} from "react-router-dom";
import {ROUTES} from "@/src/enums/router.enum";
import {PageLoader} from "@/src/components/compositions/router/pageLoader";

const LoginPage = lazy(() => import("../../pages/sign/login/login-page"));
const ForgotPasswordPage = lazy(() => import("../../pages/sign/forgot-password/forgot-password-page"));
const RegistrationPage = lazy(() => import("../../pages/sign/registration/registration-page"));
const ResetPasswordPage = lazy(() => import("../../pages/sign/reset-password/reset-password-page"));
const ActiveUserPage = lazy(() => import("../../pages/sign/active-user/active-user-page"));

export const AnonymousRoutes = observer(() => {
    return <Routes>
        <Route path={ROUTES.LOGIN} element={<PageLoader><LoginPage /></PageLoader>} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<PageLoader><ForgotPasswordPage /></PageLoader>} />
        <Route path={ROUTES.REGISTRATION} element={<PageLoader><RegistrationPage /></PageLoader>} />
        <Route path={ROUTES.RESET_PASSWORD + "/:token"} element={<PageLoader><ResetPasswordPage /></PageLoader>} />
        <Route path={ROUTES.ACTIVE_USER + "/:code"} element={<PageLoader><ActiveUserPage /></PageLoader>} />
        <Route path="*" element={<Navigate to={ROUTES.LOGIN}/>} />
    </Routes>
})