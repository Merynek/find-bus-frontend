'use client'

import React from "react";
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";
import {SignUpForm} from "@/src/components/compositions/sign/sign-up/sign-up-form";

const RegistrationPage = () => {
    return <SignLayout>
        <SignUpForm />
    </SignLayout>
};

export default RegistrationPage;