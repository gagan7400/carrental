import { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, } from '@mui/material';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let { data } = await axios.post("/api/users/register", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (data.success) {
                console.log(data)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh', display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f7fb',
                px: 2,
                py: 4,
            }}
        >
            <Paper elevation={4} sx={{ width: '100%', maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                    Create an Account
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    Fill in your details to register
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="User Name"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
                        Register
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}

export default Register;