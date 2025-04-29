import React, { Component, ErrorInfo, ReactNode } from "react";

// Define props interface
interface ErrorBoundaryProps {
  children: ReactNode;
}

// Define state interface
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // Initialize state with types
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Type the return value
  static getDerivedStateFromError(_: Error): Partial<ErrorBoundaryState> {
    // Return update to state
    return { hasError: true };
  }

  // Type the arguments
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  // Type the return value
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error?.toString()} {/* Use optional chaining */}
            <br />
            {this.state.errorInfo?.componentStack} {/* Use optional chaining */}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
