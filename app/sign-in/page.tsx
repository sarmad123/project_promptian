'use client'
import React, {useEffect, useState} from 'react';
import Forms from "@components/Forms";
import {useFormik} from "formik";
import * as Yup from "yup";
import { signIn, getProviders } from "next-auth/react"
import {toast} from "@node_modules/react-toastify";
import {useLoading} from "@app/loadingProvider";
import {TOAST_CONFIGURATION} from "@app/constants/constants";
import {useRouter} from "@node_modules/next/navigation";
import Guard from "@app/guard";
const SignIn = () => {
    const [providers, setProviders] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { setLoading } = useLoading();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const router = useRouter();
    const toastConfig   = TOAST_CONFIGURATION
    useEffect(() => {
        const setUpProviders = async () => {
            const  response = await  getProviders();
            setProviders(response)
        }
        setUpProviders()
    }, [])
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        initialStatus: false,
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be 8 characters or more').required('Password is required')
        }),
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const response  = await signIn("credentials", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });
                if (response?.ok) {
                    formik.resetForm();
                    router.push('/')
                }else{
                    console.log(response);
                    toast.error(response?.error, toastConfig);
                }

            } catch (error : any ) {
                setLoading(false)
            }finally {
                 setLoading(false)
            }
        },
    });

    return (
        <Forms
            type="Sign In"
            submitting={submitting}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            data={formik}
            providers={providers}
            providerSignIn={signIn}
        />
    );
};

export default Guard(SignIn) ;