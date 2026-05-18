import { LogIn } from 'lucide-react';

const GoogleOAuthButton = () => {
    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <button 
            onClick={handleGoogleLogin}
            type="button" 
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-700 rounded-md bg-slate-900 hover:bg-slate-800 transition-colors text-sm font-medium"
        >
            <LogIn className="w-4 h-4" />
            Continue with Google
        </button>
    );
};

export default GoogleOAuthButton;