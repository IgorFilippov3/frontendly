import { AlertTriangle, RefreshCw, WifiOff } from "lucide-react";

interface InitErrorProps {
  error: string;
  onRetry: () => void;
}

export const InitError = ({ error, onRetry }: InitErrorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <WifiOff className="w-24 h-24 text-gray-300 mx-auto" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Connection Failed
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Unable to Initialize App
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We couldn't connect to our servers to load your data. Please check
            your internet connection and try again.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700 font-medium">Error Details:</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={onRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Still having issues?</strong>
          </p>
          <p className="text-sm text-gray-500">
            Try refreshing the page, checking your internet connection, or
            contact support if the problem persists.
          </p>
        </div>
      </div>
    </div>
  );
};
