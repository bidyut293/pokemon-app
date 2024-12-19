interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
  }
  
  export function Input({ label, className, ...props }: InputProps) {
    return (
      <div className="flex flex-col gap-2">
      {label && (
        <label className="text-lg font-medium text-gray-800 dark:text-gray-100">
          {label}
        </label>
      )}
      <input
        className={`px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${className}`}
        {...props}
      />
    </div>
    );
  }