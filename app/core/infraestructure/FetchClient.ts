export const postRequest = async (url: string, body: string) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Client-ID': `${process.env.IGDB_API_CLIENT_ID}`,
            Authorization: `Bearer ${process.env.IGDB_API_TOKEN}`,
        },
        body: body,
    });

    return response.json();
};
