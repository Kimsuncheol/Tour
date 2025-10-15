interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const isError = type === 'error';

  return (
    <div className={`mb-4 p-3 border rounded-lg text-sm ${
      isError
        ? 'bg-red-50 border-red-200 text-red-600'
        : 'bg-green-50 border-green-200 text-green-600'
    }`}>
      {message}
    </div>
  );
}
