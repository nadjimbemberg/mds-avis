const API_URL = process.env.API_URL || 'http://localhost:3000';

const apiFetch = async (path, options = {}) => {
    const url = `${API_URL}${path}`;
    const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
    const res = await fetch(url, { ...options, headers });
    if (res.status === 204) return { ok: true };
    return res.json();
};

module.exports = { apiFetch };
