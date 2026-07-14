import { useEffect, useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddUsers } from './redux/toolkitStore';

const genderOptions = ['Male', 'Female', 'Other'];

export default function Userprofile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        age: '',
        address: '',
        phoneNumber: '',
        gender: '',
        profileImage: ''
    });
    const [message, setMessage] = useState({ type: 'info', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        setFormData({
            age: user.age ?? '',
            address: user.address ?? '',
            phoneNumber: user.phoneNumber ?? '',
            gender: user.gender ?? '',
            profileImage: user.photoUrl ?? ''
        });
    }, [user, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setMessage({ type: 'error', text: 'Please log in first.' });
            return;
        }

        setLoading(true);
        setMessage({ type: 'info', text: 'Updating your profile...' });


        try {
            const { data } = await axios.patch('/api/users/updateprofile', { ...formData }, {
                withCredentials: true,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (data.success) {
                // dispatch(AddUsers({ user: data.data, error: null }));
                setMessage({ type: 'success', text: data.message || 'Profile updated successfully.' });
            } else {
                setMessage({ type: 'error', text: data.message || 'Profile update failed.' });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || error.message || 'Profile update failed.',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 420, width: '100%', textAlign: 'center' }}>
                    <Typography variant='h5' gutterBottom>
                        Please log in to edit your profile
                    </Typography>
                    <Button variant='contained' onClick={() => navigate('/login')}>
                        Go to Login
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fb', py: 4, px: 2 }}>
            <Paper elevation={3} sx={{ maxWidth: 760, mx: 'auto', p: { xs: 3, sm: 4 }, borderRadius: 3 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems='flex-start'>
                    <Stack alignItems='center' spacing={1.5} sx={{ minWidth: { xs: '100%', sm: 220 } }}>
                        <Avatar
                            src={user.photoUrl || '/default-avatar.png'}
                            alt={user.userName || 'Profile'}
                            sx={{ width: 120, height: 120, border: '3px solid #1976d2' }}
                        />
                        <Typography variant='h6'>{user.userName || 'User'}</Typography>
                        <Typography variant='body2' color='text.secondary' align='center'>
                            Update your details below without changing email, username, or password.
                        </Typography>

                    </Stack>

                    <Box component='form' onSubmit={handleSubmit} sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Edit Profile</Typography>
                        {message.text ? <Alert severity={message.type}>{message.text}</Alert> : null}

                        <TextField
                            label='Age'
                            name='age'
                            type='number'
                            value={formData.age}
                            onChange={handleChange}
                            inputProps={{ min: 18, max: 100 }}
                            fullWidth
                        />

                        <TextField
                            label='Phone Number'
                            name='phoneNumber'
                            type='tel'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label='profile Image'
                            name='profileImage'
                            type='url'
                            value={formData.profileImage}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            select
                            label='Gender'
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value=''>Select gender</MenuItem>
                            {genderOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label='Address'
                            name='address'
                            value={formData.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />

                        <Button type='submit' variant='contained' size='large' disabled={loading}>
                            {loading ? 'Updating...' : 'Save Profile'}
                        </Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
