import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Provide a fallback UI and handle the case where errorInfo might be null
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            <summary>Click for details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {/* Ensure errorInfo is not null before accessing componentStack */}
            {this.state.errorInfo ? this.state.errorInfo.componentStack : "No component stack available"}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;