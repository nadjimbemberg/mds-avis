

const Register = async (data) => {
    try {
        const response = await fetch("http://localhost:5000/api/register", {
            method: 'POST',
            body: JSON.stringify(data), 
            headers: {  
                'Content-Type': 'application/json',
            },

        });
        const result = await response.json();
        return result;
    } catch (error) {
        return true
    }
}

module .exports = Register;
        
