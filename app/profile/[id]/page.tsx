"use client";
import React, {useEffect, useState} from 'react';
import { useSearchParams} from "next/navigation";
import Profile from "@components/Profile"

interface OtherProfileProps  {
    params: any
}
const OtherProfile : React.FC<OtherProfileProps> = ({params}) => {
    const [posts, setPosts] = useState([])
    const searchParams = useSearchParams();
    const userName = searchParams.get('name')
    const desc = 'Welcome to ' + userName + ' personalize profile page'
    useEffect(() => {
        const fetchPosts = async () => {
            if (params.id) {
                const res = await fetch(`/api/users/${params.id}/posts`);
                const data = await res.json();
                setPosts(data);
            }
        };

        fetchPosts();
    }, [params.id]);
    return (

        <Profile
            name={userName}
            desc={desc}
            data={posts}
            handleEdit={() => {}}
            handleDelete={() => {}}
        />
    );
};

export default OtherProfile;