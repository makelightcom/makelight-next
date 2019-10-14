class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, errorMessage: error.message });
    console.error(error)
    // You can also log the error to an error reporting service
    if(typeof(Raven) !== 'undefined') {
      Raven.captureException(error, { extra: info });
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="max-w-m rounded overflow-hidden shadow-lg no-underline">
        <div className="p-4">
          <h3>Oops! Something can't be displayed</h3>
          <p>{this.state.errorMessage}.</p>
        </div>
      </div>
    }
    return this.props.children;
  }
}

export default ErrorBoundary