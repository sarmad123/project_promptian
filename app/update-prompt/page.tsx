'use client';
import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import Forms from "@components/Forms";

const EditPrompt = () => {
    const [sumbitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const router =  useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        const getPromptDetails = async ()=> {
            if(promptId){
                const res = await fetch(`/api/prompt/${promptId}`);
                const data = await res.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            }
        }
        getPromptDetails();
    }, [promptId]);
    const updatePrompt = async(e) =>{
        e.preventDefault();
        setSubmitting(true);
        if(!promptId) return alert("Prompt ID not found");
        try{
            const res = await fetch(`/api/prompt/${promptId}`,{
                method: 'PATCH',
                body : JSON.stringify({
                    prompt: post.prompt,
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
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={sumbitting}
            handleSubmit={updatePrompt}
        />
    );
};

export default EditPrompt;