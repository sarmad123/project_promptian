'use client';
import React from 'react';
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import {signOut, useSession} from "next-auth/react"
import {useRouter} from "next/navigation";


const Nav = () => {
    const {data: session} = useSession()
    const [toggleDropDown, setToggleDropDown] = useState(false);
    const router = useRouter();
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src='/assets/images/logo.svg'
                       alt='Logo'
                       width={30}
                       height={30}
                       className='object-contain'
                />
                <p className='logo_text'>Promptian</p>
            </Link>
            {/* Desktop Navigation*/}
            <div className='sm:flex hidden'>
                {session?.user ? (
                        <div className='flex gap-3 md:gap-5'>
                            <Link href="/create-prompt"
                                className='black_btn'>
                                Create Post
                            </Link>
                            <button className='outline_btn'
                                    type='button'
                                    onClick={() =>signOut()}

                            >
                                Sign Out
                            </button>
                            <Link href='/profile' className='flex gap-2'>
                                {session?.user.image ? (<Image src={session?.user.image as any}
                                       alt='Profile'
                                       width={37}
                                       height={37}
                                       className='rounded-full place-content-center'
                                />) : (
                                    <Image src='/assets/images/logo.svg'
                                           alt='Profile'
                                           width={37}
                                           height={37}
                                           className='rounded-full place-content-center'
                                    />
                                )}
                                <p className='font-medium text-center text-sm place-content-center'>{session?.user.name}</p>
                            </Link>
                        </div>
                ) : (
                    <>
                             <button
                                type='button'
                                className='black_btn'
                                onClick={() => router.push('/sign-in')}
                             >
                                Sign In
                             </button>
                    </>
                )}
            </div>

            {/* Mobile Navigation*/}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className='flex'>
                        <Image src={session?.user.image as any}
                               alt='Profile'
                               width={37}
                               height={37}
                               className='rounded-full'
                               onClick={() => setToggleDropDown((prev) => !prev )}
                        />
                        {toggleDropDown && (
                            <div className='dropdown'>
                                <Link href='/profle'
                                      className='dropdown_link'
                                      onClick={() => setToggleDropDown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link href='/create-prompt'
                                      className='dropdown_link'
                                      onClick={() => setToggleDropDown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button
                                    type='button'
                                    className='mt 5 w-full black_btn'
                                    onClick={() => {
                                        setToggleDropDown(false);
                                    }}
                                >
                                    Sign Out

                                </button>

                            </div>
                        )}
                    </div>
                ) : (
                    <>
                                <button
                                    type='button'
                                    className='black_btn'
                                    onClick={() =>router.push('/sign-in')}
                                >
                                    Sign In
                                </button>
                    </>
                )}
            </div>

        </nav>
    );
};

export default Nav;