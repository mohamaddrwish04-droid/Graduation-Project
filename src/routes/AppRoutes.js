import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import DashboardHome from "../pages/dashboard/DashboardHome";
import DashboardLayout from "../layouts/DashboardLayout";
import UsersPage from "../pages/users/UsersPage";
import SubscriptionPage from "../pages/subscriptions/SubscriptionsPage";
import SpecializationsPage from "../pages/specializations/SpecializationsPage";
import SubscriptionPlans from "../pages/subscriptionPlan/SubscriptionPlans";
import RatingPage from "../pages/rating/RatingPage";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/auth/ForgotPassowrd";
import ResetPassword from "../pages/auth/ResetPassword";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Forgot-Password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<DashboardHome />}
                />

                <Route
                    path="/users"
                    element={<UsersPage />}
                />

                <Route
                    path="/specializations"
                    element={<SpecializationsPage />}
                />

                <Route
                    path="/subscriptions"
                    element={<SubscriptionPage />}
                />

                <Route
                    path="/subscription-plans"
                    element={<SubscriptionPlans />}
                />

                <Route
                    path="/ratings"
                    element={<RatingPage />}
                />
            </Route>
        </Routes>
    );
}
export default AppRoutes;