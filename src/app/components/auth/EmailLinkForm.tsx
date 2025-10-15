interface EmailLinkFormProps {
  email: string;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  buttonText: string;
  loadingText: string;
}

export default function EmailLinkForm({
  email,
  onEmailChange,
  onSubmit,
  loading,
  buttonText,
  loadingText
}: EmailLinkFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          placeholder="you@example.com"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? loadingText : buttonText}
      </button>
    </form>
  );
}
