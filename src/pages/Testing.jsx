import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { TestTube } from 'lucide-react';
import { toast } from 'sonner';
import { testFunctions } from '../components/testing/testFunctions';
import { Label } from '../components/ui/label';

const Testing = () => {
  const [activeTab, setActiveTab] = useState('api-tests');
  const [testInput, setTestInput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const testCategories = [
    { id: 'api-tests', label: 'API Tests' },
    { id: 'database-tests', label: 'Database Tests' },
    { id: 'ui-tests', label: 'UI Tests' },
    { id: 'integration-tests', label: 'Integration Tests' },
    { id: 'performance-tests', label: 'Performance Tests' },
  ];

  const handleRunTest = async testId => {
    setIsLoading(true);

    // Find the test in our test functions
    const testToRun = testFunctions.find(test => test.id === testId);

    if (!testToRun) {
      toast.error('Test not found');
      setIsLoading(false);
      return;
    }

    // Add a pending result
    setTestResults(prev => [
      ...prev,
      {
        name: testToRun.name,
        status: 'pending',
        message: 'Running test...',
      },
    ]);

    try {
      // Wait for a simulated test completion
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Run the test function
      const result = await testToRun.testFn(testInput);

      // Update the test results
      setTestResults(prev =>
        prev.map(item =>
          item.name === testToRun.name ? { name: testToRun.name, status: 'success', message: result } : item
        )
      );

      toast.success(`Test "${testToRun.name}" completed successfully`);
    } catch (error) {
      // Update the test results with error
      setTestResults(prev =>
        prev.map(item =>
          item.name === testToRun.name
            ? { name: testToRun.name, status: 'error', message: error.message || 'Unknown error' }
            : item
        )
      );

      toast.error(`Test "${testToRun.name}" failed`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunAllTests = async () => {
    setIsLoading(true);
    setTestResults([]);

    // Filter tests by category
    const categoryTests = testFunctions.filter(test => test.category === activeTab);

    for (const test of categoryTests) {
      // Add a pending result
      setTestResults(prev => [
        ...prev,
        {
          name: test.name,
          status: 'pending',
          message: 'Running test...',
        },
      ]);

      try {
        // Wait for a simulated test completion
        await new Promise(resolve => setTimeout(resolve, 800));

        // Run the test function
        const result = await test.testFn(testInput);

        // Update the test results
        setTestResults(prev =>
          prev.map(item => (item.name === test.name ? { name: test.name, status: 'success', message: result } : item))
        );
      } catch (error) {
        // Update the test results with error
        setTestResults(prev =>
          prev.map(item =>
            item.name === test.name
              ? { name: test.name, status: 'error', message: error.message || 'Unknown error' }
              : item
          )
        );
      }
    }

    setIsLoading(false);
    toast.success('All tests completed');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Filter tests by current active tab
  const filteredTests = testFunctions.filter(test => test.category === activeTab);

  return (
    <PageLayout>
      <div className='mb-6 flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold text-garage-primary mb-2'>Testing Center</h1>
          <p className='text-gray-500'>Run tests to verify the functionality of your garage management system</p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={clearResults} disabled={isLoading || testResults.length === 0}>
            Clear Results
          </Button>
          <Button
            onClick={handleRunAllTests}
            disabled={isLoading}
            className='bg-garage-primary hover:bg-garage-primary/90'
          >
            <TestTube className='h-4 w-4 mr-2' />
            Run All Tests
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>Select and run tests to verify system functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue='api-tests' value={activeTab} onValueChange={setActiveTab}>
                <TabsList className='mb-4 overflow-x-auto flex w-full'>
                  {testCategories.map(category => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {testCategories.map(category => (
                  <TabsContent key={category.id} value={category.id} className='space-y-4'>
                    <div className='mb-4'>
                      <Label htmlFor='testInput'>Test Input (Optional)</Label>
                      <Input
                        id='testInput'
                        placeholder='Enter test input if required'
                        value={testInput}
                        onChange={e => setTestInput(e.target.value)}
                      />
                    </div>

                    {filteredTests.length > 0 ? (
                      <div className='space-y-3'>
                        {filteredTests.map(test => (
                          <div key={test.id} className='border rounded-md p-3 hover:bg-gray-50 transition-colors'>
                            <div className='flex justify-between items-center'>
                              <div>
                                <h3 className='font-medium'>{test.name}</h3>
                                <p className='text-sm text-gray-500'>{test.description}</p>
                              </div>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleRunTest(test.id)}
                                disabled={isLoading}
                              >
                                Run Test
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8'>
                        <p className='text-gray-500'>No tests available for this category</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className='h-full'>
            <CardHeader className='pb-3'>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>Results from the last test run</CardDescription>
            </CardHeader>
            <CardContent className='h-[calc(100%-4rem)] overflow-auto'>
              {testResults.length > 0 ? (
                <div className='space-y-3'>
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`border rounded-md p-3 ${
                        result.status === 'success'
                          ? 'border-green-200 bg-green-50'
                          : result.status === 'error'
                          ? 'border-red-200 bg-red-50'
                          : 'border-yellow-200 bg-yellow-50'
                      }`}
                    >
                      <h4
                        className={`font-medium ${
                          result.status === 'success'
                            ? 'text-green-700'
                            : result.status === 'error'
                            ? 'text-red-700'
                            : 'text-yellow-700'
                        }`}
                      >
                        {result.name}
                      </h4>
                      <p className='text-sm mt-1'>
                        {result.status === 'pending' ? (
                          <span className='text-yellow-700'>Running...</span>
                        ) : result.status === 'success' ? (
                          <span className='text-green-700'>✓ {result.message}</span>
                        ) : (
                          <span className='text-red-700'>✗ {result.message}</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='text-center py-8'>
                  <p className='text-gray-500'>No test results yet</p>
                  <p className='text-sm text-gray-400'>Run a test to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Testing;
