import { Component } from 'react';
import { Paper, Text, Button } from '@mantine/core';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper p="xl" style={{ textAlign: 'center' }}>
          <Text size="xl" mb="md">Something went wrong</Text>
          <Button onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 