import { CircleX } from 'lucide-react';

export const AuthError = ({ message } : { message: string}) => {
    if (!message) return null;
    return (
        <div className="flex items-center gap-3 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg mt-6">
            <CircleX size={24} className="text-red-600" />
            <span className="text-sm font-medium">{message}</span>
        </div>
    )
}
