const Login = async (data) => {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        return result
    } catch (error) {
        return true
    }
}

export default Login
