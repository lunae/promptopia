'use client';

import { useState, useEffect } from 'react';
import PromptCardList from './PromptCardList';

const Feed = () => {
    const [prompts, setPrompts] = useState([]);
    const [filteredPrompts, setFilteredPrompts] = useState([]);
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
    };

    const handleTagClick = (tag) => {
        setSearchText(tag);
    };

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch('/api/prompt');
            const allPrompts = await response.json();
            setPrompts(allPrompts);
            setFilteredPrompts(allPrompts);
        };

        fetchPrompts();
    }, []);

    useEffect(() => {
        const matchingPrompts = prompts.filter(
            (p) =>
                p.prompt.includes(searchText) ||
                p.tag.includes(searchText) ||
                p.creator.username.includes(searchText),
        );
        console.log(matchingPrompts)
        setFilteredPrompts(matchingPrompts);
    }, [searchText]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList data={filteredPrompts} handleTagClick={handleTagClick} />
        </section>
    );
};

export default Feed;
