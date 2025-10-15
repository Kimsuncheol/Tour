interface AuthMethodSelectorProps {
  method: 'email-link' | 'google';
  onMethodChange: (method: 'email-link' | 'google') => void;
}

export default function AuthMethodSelector({ method, onMethodChange }: AuthMethodSelectorProps) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onMethodChange('email-link')}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
          method === 'email-link'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Email Link
      </button>
      <button
        onClick={() => onMethodChange('google')}
        className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
          method === 'google'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        Google
      </button>
    </div>
  );
}
