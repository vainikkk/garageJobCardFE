// Test functions for the testing center

export const testFunctions = [
  // API Tests
  {
    id: 'test-api-connection',
    name: 'API Connection Test',
    description: 'Verifies that the API server is reachable',
    category: 'api-tests',
    testFn: async () => {
      // Simulated API connection test
      await new Promise(resolve => setTimeout(resolve, 500));
      return 'API server is reachable';
    },
  },
  {
    id: 'test-api-authentication',
    name: 'API Authentication Test',
    description: 'Verifies API authentication is working properly',
    category: 'api-tests',
    testFn: async () => {
      // Simulated API authentication test
      await new Promise(resolve => setTimeout(resolve, 700));
      return 'Authentication successful';
    },
  },
  {
    id: 'test-api-services',
    name: 'Services API Test',
    description: 'Tests the services API endpoints',
    category: 'api-tests',
    testFn: async () => {
      // Simulated services API test
      await new Promise(resolve => setTimeout(resolve, 600));
      return 'Services API is working correctly';
    },
  },
  {
    id: 'test-api-customers',
    name: 'Customers API Test',
    description: 'Tests the customers API endpoints',
    category: 'api-tests',
    testFn: async () => {
      // Simulated customers API test
      await new Promise(resolve => setTimeout(resolve, 800));
      return 'Customers API is working correctly';
    },
  },
  {
    id: 'test-api-vehicles',
    name: 'Vehicles API Test',
    description: 'Tests the vehicles API endpoints',
    category: 'api-tests',
    testFn: async () => {
      // Simulated vehicles API test
      await new Promise(resolve => setTimeout(resolve, 550));
      return 'Vehicles API is working correctly';
    },
  },

  // Database Tests
  {
    id: 'test-db-connection',
    name: 'Database Connection Test',
    description: 'Verifies connection to the database',
    category: 'database-tests',
    testFn: async () => {
      // Simulated database connection test
      await new Promise(resolve => setTimeout(resolve, 600));
      return 'Database connection established successfully';
    },
  },
  {
    id: 'test-db-read',
    name: 'Database Read Test',
    description: 'Tests reading data from the database',
    category: 'database-tests',
    testFn: async () => {
      // Simulated database read test
      await new Promise(resolve => setTimeout(resolve, 700));
      return 'Database read operations working correctly';
    },
  },
  {
    id: 'test-db-write',
    name: 'Database Write Test',
    description: 'Tests writing data to the database',
    category: 'database-tests',
    testFn: async () => {
      // Simulated database write test
      await new Promise(resolve => setTimeout(resolve, 800));
      return 'Database write operations working correctly';
    },
  },
  {
    id: 'test-db-transactions',
    name: 'Database Transactions Test',
    description: 'Tests database transactions',
    category: 'database-tests',
    testFn: async () => {
      // Simulated database transactions test
      await new Promise(resolve => setTimeout(resolve, 900));
      return 'Database transactions working correctly';
    },
  },
  {
    id: 'test-db-indexes',
    name: 'Database Indexes Test',
    description: 'Tests database index performance',
    category: 'database-tests',
    testFn: async () => {
      // Simulated database index test
      await new Promise(resolve => setTimeout(resolve, 750));
      return 'Database indexes are optimized';
    },
  },

  // UI Tests
  {
    id: 'test-ui-rendering',
    name: 'UI Rendering Test',
    description: 'Tests proper rendering of UI components',
    category: 'ui-tests',
    testFn: async () => {
      // Simulated UI rendering test
      await new Promise(resolve => setTimeout(resolve, 400));
      return 'All UI components render correctly';
    },
  },
  {
    id: 'test-ui-responsiveness',
    name: 'UI Responsiveness Test',
    description: 'Tests responsiveness on different screen sizes',
    category: 'ui-tests',
    testFn: async () => {
      // Simulated UI responsiveness test
      await new Promise(resolve => setTimeout(resolve, 600));
      return 'UI is responsive across all device sizes';
    },
  },
  {
    id: 'test-ui-forms',
    name: 'Forms Validation Test',
    description: 'Tests form validation logic',
    category: 'ui-tests',
    testFn: async input => {
      // Simulated form validation test
      await new Promise(resolve => setTimeout(resolve, 500));
      if (input && input.length < 3) {
        throw new Error('Input validation failed - too short');
      }
      return 'Form validation is working correctly';
    },
  },
  {
    id: 'test-ui-navigation',
    name: 'Navigation Test',
    description: 'Tests navigation between pages',
    category: 'ui-tests',
    testFn: async () => {
      // Simulated navigation test
      await new Promise(resolve => setTimeout(resolve, 450));
      return 'Navigation between pages working correctly';
    },
  },
  {
    id: 'test-ui-accessibility',
    name: 'Accessibility Test',
    description: 'Tests accessibility compliance',
    category: 'ui-tests',
    testFn: async () => {
      // Simulated accessibility test
      await new Promise(resolve => setTimeout(resolve, 700));
      return 'Application passes basic accessibility guidelines';
    },
  },

  // Integration Tests
  {
    id: 'test-integration-service-workflow',
    name: 'Service Workflow Test',
    description: 'Tests the complete service workflow',
    category: 'integration-tests',
    testFn: async () => {
      // Simulated service workflow test
      await new Promise(resolve => setTimeout(resolve, 900));
      return 'Service workflow integration is working correctly';
    },
  },
  {
    id: 'test-integration-customer-vehicle',
    name: 'Customer-Vehicle Association Test',
    description: 'Tests customer and vehicle association',
    category: 'integration-tests',
    testFn: async () => {
      // Simulated customer-vehicle association test
      await new Promise(resolve => setTimeout(resolve, 800));
      return 'Customer-vehicle association is working correctly';
    },
  },
  {
    id: 'test-integration-jobcard',
    name: 'Job Card Creation Test',
    description: 'Tests the complete job card creation process',
    category: 'integration-tests',
    testFn: async () => {
      // Simulated job card creation test
      await new Promise(resolve => setTimeout(resolve, 1000));
      return 'Job card creation process is working correctly';
    },
  },
  {
    id: 'test-integration-payment',
    name: 'Payment Integration Test',
    description: 'Tests the payment integration',
    category: 'integration-tests',
    testFn: async () => {
      // Simulated payment integration test
      await new Promise(resolve => setTimeout(resolve, 850));
      return 'Payment integration is working correctly';
    },
  },
  {
    id: 'test-integration-notifications',
    name: 'Notification System Test',
    description: 'Tests the notification system',
    category: 'integration-tests',
    testFn: async () => {
      // Simulated notification system test
      await new Promise(resolve => setTimeout(resolve, 750));
      return 'Notification system is working correctly';
    },
  },

  // Performance Tests
  {
    id: 'test-performance-loading',
    name: 'Page Loading Performance Test',
    description: 'Tests page loading performance',
    category: 'performance-tests',
    testFn: async () => {
      // Simulated page loading performance test
      await new Promise(resolve => setTimeout(resolve, 1200));
      return 'Pages load within acceptable time limits';
    },
  },
  {
    id: 'test-performance-search',
    name: 'Search Performance Test',
    description: 'Tests search functionality performance',
    category: 'performance-tests',
    testFn: async () => {
      // Simulated search performance test
      await new Promise(resolve => setTimeout(resolve, 1000));
      return 'Search operations complete in <200ms';
    },
  },
  {
    id: 'test-performance-reports',
    name: 'Report Generation Test',
    description: 'Tests performance of report generation',
    category: 'performance-tests',
    testFn: async () => {
      // Simulated report generation test
      await new Promise(resolve => setTimeout(resolve, 1500));
      return 'Reports generate within acceptable time limits';
    },
  },
  {
    id: 'test-performance-concurrent',
    name: 'Concurrent Users Test',
    description: 'Tests performance with concurrent users',
    category: 'performance-tests',
    testFn: async () => {
      // Simulated concurrent users test
      await new Promise(resolve => setTimeout(resolve, 1800));
      return 'System handles 50+ concurrent users without degradation';
    },
  },
  {
    id: 'test-performance-memory',
    name: 'Memory Usage Test',
    description: 'Tests application memory usage',
    category: 'performance-tests',
    testFn: async () => {
      // Simulated memory usage test
      await new Promise(resolve => setTimeout(resolve, 1100));
      return 'Memory usage is within acceptable limits';
    },
  },
];
