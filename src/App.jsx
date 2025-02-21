import { MantineProvider } from '@mantine/core';
import Dashboard from './components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  return (
    <MantineProvider>
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default App;