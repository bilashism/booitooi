import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  <div role="alert">
    <p>Something went wrong:</p>
    <h2 className="">{error?.message}</h2>
    <button
      type="button"
      className="border px-4 py-3"
      onClick={resetErrorBoundary}
    >
      retry
    </button>
  </div>
);
