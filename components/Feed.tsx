'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Loading from '@app/loading';
const PromptCard = React.lazy(() => import('@components/PromptCard'));

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <Suspense key={post._id} fallback={<Loading />}>
                    <PromptCard
                        post={post}
                        handleTagClick={handleTagClick}
                    />
                </Suspense>
            ))}
        </div>
    );
};

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = async (searchString) => {
        setSearchText(searchString);
        if (searchString.length > 2) {
            const res = await fetch(`/api/search?searchString=${searchString}`);
            const data = await res.json();
            setPosts(data);
        }
    };

    const handleTagClick = (e) => {
        handleSearchChange(e);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/prompt', { cache: 'no-store' });
            const data = await res.json();
            setPosts(data);
        };
        if (searchText === '') {
            fetchPosts();
        }
    }, [searchText]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
