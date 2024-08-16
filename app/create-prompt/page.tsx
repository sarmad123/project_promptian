'use client';
import React, {FormEvent, useLayoutEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import {redirect, useRouter} from 'next/navigation';
import Forms from "@components/Forms";
import Guard from "@app/guard";

const CreatePrompt = () => {
    const [sumbitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const {data: session} =  useSession();
    const router =  useRouter();

    const createPrompt = async(e : FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        setSubmitting(true);

        try{
            const res = await fetch('/api/prompt/new',{
                method: 'POST',
                body : JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user?.id,
                    tag: post.tag

                })
            })
            if(res.ok){
                router.push('/')
            }
        } catch (error){
            console.log(error);
        } finally {
            setSubmitting(false);
        }

    }
    return (
        <Forms
            type="Create"
            data={post}
            setData={setPost}
            submitting={sumbitting}
            handleSubmit={createPrompt}
            togglePasswordVisibility={() => {}}
            showPassword={false}
            providers={[]}
            providerSignIn={() => {}}
            setFieldValue={() => {}}


        />
    );
};

export default Guard(CreatePrompt);