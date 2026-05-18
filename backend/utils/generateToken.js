import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const expiresIn = process.env.JWT_EXPIRE || '7d';
    
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });
};

export default generateToken;