import React from "react";

import "./error-boundary.scss";

interface IErrorBoundaryProps {
  readonly children: JSX.Element | JSX.Element[];
}

interface IErrorBoundaryState {
  readonly error: any;
  readonly errorInfo: any;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  readonly state: IErrorBoundaryState = {error: undefined, errorInfo: undefined};

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    const {error, errorInfo} = this.state;
    if (errorInfo) {
      const errorDetails =
        process.env.NODE_ENV === "development" ? (
          <details className="preserve-space">
            {error && error.toString()}
            <br/>
            {errorInfo.componentStack}
          </details>
        ) : undefined;
      return (
        <section className="rts-main__section flex-size">
          <header className="container box">
            <h2 className="color-error">An unexpected error has occurred.</h2>
          </header>
          <div className="container box">
            {errorDetails}
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
