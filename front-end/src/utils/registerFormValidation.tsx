export const validateRegisterFormField = (name: string, value: string): string => {
    switch (name) {
        case 'name':
            return value.trim() === '' ? 'Name is required' : '';
        case 'email':
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            return emailRegex.test(value) ? '' : 'Invalid email address';
        case 'password':
            return value.length < 6 ? 'Password must be at least 6 characters long' : '';
        default:
            return '';
    }
};
