export const addAvis = async (data, token) => {
    try {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const response = await fetch("http://localhost:3000/add/avis", {
            method: 'POST',
            body: JSON.stringify(data),
            headers,
        });
        return await response.json();
    } catch {
        return true;
    }
}

export const editAvis = async (id, data, token) => {
    try {
        const response = await fetch(`http://localhost:3000/avis/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return await response.json();
    } catch {
        return true;
    }
}

export const deleteAvis = async (id, token) => {
    try {
        const response = await fetch(`http://localhost:3000/avis/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return await response.json();
    } catch {
        return true;
    }
}
