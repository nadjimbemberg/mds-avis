const ChangePassword = async (data, token) => {
    try {
        const response = await fetch("http://localhost:3000/change-password", {
            method: 'POST',
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

export default ChangePassword;
