export const fetchAllPrompts = async () => {
    const response = await fetch('/api/prompt');
    return await response.json();
};
