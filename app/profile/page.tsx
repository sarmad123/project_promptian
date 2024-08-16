"use client";
import React,{Suspense,useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Loading from '@app/loading';
const Profile = React.lazy(() => import("@components/Profile"));
const MyProfile = () => {
    const [posts, setPosts] = useState([])
    const {data : session} = useSession();
    const router = useRouter();
    useEffect(() => {
        const fetchPosts = async () => {
            if (session?.user?.id) {
                const res = await fetch(`/api/users/${session.user.id}/posts`);
                const data = await res.json();
                setPosts(data);
            }
        };

        fetchPosts();
    }, [session?.user?.id]);
    const handleEdit =  (post : any) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete =  async (post : any) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
        if(hasConfirmed){
            try{
                 await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                })
                const filteredPosts = posts.filter((item : any) => item?._id !== post?._id);
                setPosts(filteredPosts)
            }catch (error) {
                console.log(error);
            }
        }
    }
    return (
    <Suspense fallback={<Loading/>}>
        <Profile
            name="My"
            desc="Welcome to your personalize profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    </Suspense>

    );
};

export default MyProfile;