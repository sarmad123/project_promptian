import React, {useState} from 'react';
import Link from "next/link";
import {FaCloudUploadAlt, FaEye, FaEyeSlash} from 'react-icons/fa';
import { TiDelete } from "react-icons/ti";
import Image from "next/image";

const Forms = ({type, data, setData, submitting, handleSubmit,togglePasswordVisibility, showPassword, providers, providerSignIn, setFieldValue}) => {
    const [imagePreview, setImagePreview] = useState('');
    const handleImageChange = (event) => {
        const file = event.currentTarget?.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;

                if (typeof base64String === 'string') {
                    setFieldValue('image', base64String);
                    setFieldValue('imageFile', file);
                    setImagePreview(base64String);
                }
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    return (
        <>
            {type !== 'Sign In' && type !== 'Sign Up' ? (
                <section className='w-full max-w-full flex-start flex-col'>
                    <h1 className='head_text text-left'>
                        <span className='blue_gradient'>{type} Post</span>
                    </h1>
                    <p className='desc text-left max-w-md'>
                        {type} and share amazing prompts with the world, and
                        let your imagination run wild with any AI-powered platform.
                    </p>
                    <div className='mt-10 w-full max-w-screen-sm
                             flex-col gap-7 glassmorphism'>
                        <form onSubmit={handleSubmit}>
                            <label>
                    <span className='font-satoshi font-semibold
                    text-base text-gray-700'>
                        Your AI Prompt
                    </span>
                                <textarea
                                    className='form_textarea'
                                    value={data.prompt}
                                    onChange={(e) =>
                                        setData({...data, prompt: e.target.value})}
                                    placeholder='Write your prompt here...'
                                    required
                                />
                            </label>
                            <br/>
                            <label>
                    <span className='font-satoshi font-semibold
                    text-base text-gray-700'>
                        Tag{' '}
                        <span className='font-normal'>
                            (#product,#webdevelopment, #idea )
                        </span>
                    </span>
                                <input
                                    className='form_input'
                                    value={data.tag}
                                    onChange={(e) =>
                                        setData({...data, tag: e.target.value})}
                                    placeholder='#tag'
                                    required
                                />
                            </label>
                            <br/>
                            <div className='flex-end mx-3 mb-5 gap-4'>
                                <Link href='/'
                                      className='text-gray-500 text-sm'>
                                    Cancel
                                </Link>

                                <button
                                    type='submit'
                                    disabled={submitting}
                                    className='px-5 py-1.5 text-sm
                        bg-primary-orange rounded-full text-white'
                                >
                                    {submitting ? `${type}...` : type}
                                </button>

                            </div>
                        </form>

                    </div>

                </section>
            ) : (
                <section className='w-full max-w-full flex-center flex-col'>
                    <h1 className='head_text text-left'>
                        <span className='blue_gradient'>{type}</span>
                    </h1>
                    <p className='desc text-left max-w-md'>
                        Welcome Back
                    </p>
                    <div className='mt-10 w-full max-w-screen-sm
                             flex-col gap-7 glassmorphism'>
                        <form onSubmit={data.handleSubmit}>
                            {type === 'Sign In' && (
                                <>

                                    <label>
                                        <span className='font-satoshi font-semibold
                                        text-base text-gray-700'
                                        >
                                            Email
                                        </span>
                                        <input
                                            name="email"
                                            className={`form_input ${data.touched.email && data.errors.email ? 'border-red-500 border' : ''}`}
                                            placeholder='Email'
                                            type='email'
                                            value={data.values.email}
                                            onChange={data.handleChange}
                                            onBlur={data.handleBlur}
                                        />
                                        {data.touched.email && !!data.errors.email && (
                                            <p className='error_text'>
                                                *{data.errors.email}
                                            </p>
                                        )}



                                    </label>
                                    <br/>
                                    <label>
                                        <span className='font-satoshi font-semibold
                                        text-base text-gray-700'
                                        >
                                            Password
                                        </span>
                                        <div className='relative'>

                                            <input
                                                name="password"
                                                className={`form_input ${data.touched.password && data.errors.password ? 'border-red-500 border' : ''}`}
                                                placeholder='Password'
                                                required
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.values.password}
                                                onChange={data.handleChange}
                                                onBlur={data.handleBlur}
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                                            >
                                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                            </span>
                                        </div>

                                        {data.touched.password && !!data.errors.password && (
                                            <p className='error_text'>
                                                *{data.errors.password}
                                            </p>
                                        )}
                                    </label>
                                    <div className='mt-4 w-full mb-6 text-end'>
                                        <Link href="/sign-up" className='text-orange-600 font-satoshi' style={{
                                            fontSize: '16px',
                                            textDecoration: "none"
                                        }}>
                                            &nbsp;Forgot Password
                                        </Link>
                                    </div>
                                    <div className="mt-4 flex justify-center text-center mb-3">
                                        <button
                                            type='submit'
                                            className="btn btn-wide orange_btn"
                                            disabled={!data.dirty || !data.isValid}>
                                            {type}

                                        </button>
                                    </div>

                                </>
                            )}
                            {type === 'Sign Up' && (
                                <>
                                    <div className="flex justify-center mb-4">
                                        {!imagePreview ? (<div
                                            className="w-full h-40 rounded-md border-dashed border border-gray-400 text-center">
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <label
                                                htmlFor="image"
                                                className="flex flex-col items-center justify-center cursor-pointer h-full"
                                            >
                                                <FaCloudUploadAlt style={{height: '5rem', width: '5rem'}}/>
                                                <span className="font-satoshi font-semibold text-base text-gray-700">Drag & Drop</span>
                                                <p style={{color: '#A0AEC0'}}>or select files from device</p>
                                            </label>
                                        </div>) : (
                                            <div className="mt-4 relative  ">
                                                <a className='absolute -right-2 -top-2'
                                                 onClick={() => {
                                                     setFieldValue('image', null);
                                                     setImagePreview('');
                                                 }}
                                                >
                                                    <TiDelete style={{height: '2rem', width: '2rem', color:'red'}} />
                                                </a>
                                                <Image src={imagePreview} alt='Profile Image' height={100} width={100}
                                                       className="rounded-full place-content-center"/>
                                            </div>
                                        )}

                                    </div>
                                    {data.errors.imageFile && (
                                        <div className="mt-4 text-center">
                                            <p className='error_text' >*{data.errors.imageFile}</p>
                                        </div>
                                    )}


                                    <label>
                                    <span className='font-satoshi font-semibold
                                    text-base text-gray-700'
                                    >
                                        Full Name
                                    </span>
                                        <input
                                            name="name"
                                            className={`form_input ${data.touched.name && data.errors.name ? 'border-red-500 border' : ''}`}
                                            placeholder='Full Name'
                                            type='text'
                                            value={data.values.name}
                                            onChange={data.handleChange}
                                            onBlur={data.handleBlur}
                                        />
                                        {data.touched.name && !!data.errors.name && (
                                            <p className='error_text'>
                                                *{data.errors.name}
                                            </p>
                                        )}

                                    </label>
                                    <br/>
                                    <label>
                                    <span className='font-satoshi font-semibold
                                    text-base text-gray-700'
                                    >
                                        Email
                                    </span>
                                        <input
                                            name="email"
                                            className={`form_input ${data.touched.email && data.errors.email ? 'border-red-500 border' : ''}`}
                                            placeholder='Email'
                                            type='email'
                                            value={data.values.email}
                                            onChange={data.handleChange}
                                            onBlur={data.handleBlur}
                                        />
                                        {data.touched.email && !!data.errors.email && (
                                            <p className='error_text'>
                                                *{data.errors.email}
                                            </p>
                                        )}
                                    </label>
                                    <br/>
                                    <label>
                                    <span className='font-satoshi font-semibold
                                    text-base text-gray-700'
                                    >
                                        Password
                                    </span>
                                        <div className='relative'>
                                            <input
                                                name="password"
                                                className={`form_input ${data.touched.password && data.errors.password ? 'border-red-500 border' : ''}`}
                                                placeholder='Password'
                                                required
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.values.password}
                                                onChange={data.handleChange}
                                                onBlur={data.handleBlur}
                                            />
                                            <span
                                                onClick={togglePasswordVisibility}
                                                className='absolute inset-y-0 right-3 flex items-center cursor-pointer'
                                            >
                                                {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                            </span>
                                        </div>
                                        {data.touched.password && !!data.errors.password && (
                                            <p className='error_text'>
                                                *{data.errors.password}
                                            </p>
                                        )}
                                    </label>
                                    <div className="mt-4 flex justify-center text-center mb-3">
                                        <button
                                            disabled={!data.dirty || !data.isValid}
                                            type='submit'
                                            className="btn btn-wide orange_btn">
                                            {type}
                                        </button>
                                    </div>

                                </>
                            )}


                        </form>
                        {type === 'Sign In' && providers && (
                            <div className="mt-4 flex justify-center text-center mb-3">
                                <button
                                    onClick={() => providerSignIn('google')}
                                    type='submit'
                                    className="btn btn-wide rounded-full bg-white">
                                    <Image src='/assets/icons/google-icon.png' alt='Google' height={20}
                                           width={20}/>
                                    Sign In with Google
                                </button>
                            </div>
                        )}
                        {type === 'Sign In' && (
                            <div className="w-full text-center mb-2">
                                <p className="font-satoshi" style={{color: "#A0AEC0", fontSize: "16px"}}>
                                    Don&apos;t have an account?
                                    <Link
                                        href="/sign-up"
                                        className="text-orange-600 font-satoshi"
                                        style={{
                                            fontSize: "16px",
                                            textDecoration: "none",
                                        }}
                                    >
                                        &nbsp;Sign Up
                                    </Link>
                                </p>
                            </div>

                        )}
                        {type === 'Sign Up' && (
                            <div className="w-full text-center mb-2">
                                <p className='font-satoshi' style={{color: '#A0AEC0', fontSize: '16px'}}>Already
                                    have an account?
                                    <Link href="/sign-up" className='text-orange-600 font-satoshi' style={{
                                        fontSize: '16px',
                                        textDecoration: "none"
                                    }}>
                                        &nbsp;Sign In
                                    </Link>
                                </p>
                            </div>

                        )}


                    </div>


                </section>

            )}
        </>


    )
};

export default Forms;