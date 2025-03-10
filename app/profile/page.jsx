'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`,
            );
            const userPrompts = await response.json();
            setPosts(userPrompts);
        };

        if (session?.user.id) {
            fetchPosts();
        }
    }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            'Are you sure you want to delete this prompt?',
        );
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE',
                });

                const remainingPrompts = posts.filter((p) => p._id !== post._id);
                setPosts(remainingPrompts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name="My"
            desc="Welcome to your personal profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ProfilePage;
