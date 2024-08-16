'use client';
import React, {useState} from 'react';
import {useFormik} from "@node_modules/formik";
import * as Yup from "@node_modules/yup";
import Forms from "@components/Forms";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {TOAST_CONFIGURATION} from "@app/constants/constants";
import {useLoading} from "@app/loadingProvider";
import Guard from "@app/guard";

const SignUp = () => {
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const { setLoading } = useLoading();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toastConfig   = TOAST_CONFIGURATION
    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            email: '',
            image: null,
        },
        initialStatus: false,
        validationSchema: Yup.object({
            name: Yup.string().min(8, 'Name must be 8 characters or more').required('Name is required').matches(/^\S*$/, 'No spaces allowed'),
            password: Yup.string().min(8, 'Password must be 8 characters or more').required('Password is required')
                .matches(
                    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/,
                    'Password must contain at least one uppercase letter, one numeric digit, and one special character'
                ),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            image: Yup.mixed().required('An image is required'),
            imageFile: Yup.mixed()
                .required('An image file is required')
                .test('fileSize', 'File too large', value => {
                    return value && (value as File).size <= 1024 * 1024; // Assert `value` as File
                })
                .test('fileType', 'Unsupported file format', value => {
                    return value && ['image/jpeg', 'image/png'].includes((value as File).type); // Assert `value` as File
                }),
        }),
        onSubmit: async (values) => {
             setLoading(true)
            try {
                const response  = await fetch('/api/signUp', {
                    method: 'POST',
                    body : JSON.stringify({
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        image: values.image
                    })
                });
                const data = await response.json();
                if (data?.status) {
                    formik.resetForm();
                    router.push('/')
                }else{
                    toast.error(data.message, toastConfig);
                }

            } catch (error : any ) {
                toast.error(error, toastConfig);
                setLoading(false)
            }finally {
                setLoading(false)
            }
        },
    });

    return (
        <Forms
            type="Sign Up"
            submitting={submitting}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            data={formik}
            setFieldValue={formik.setFieldValue}
            setData={() =>{}}
            handleSubmit={() => {}}
            providers={() => {}}
            providerSignIn={() => {}}

        />
    );
};

export default Guard(SignUp);