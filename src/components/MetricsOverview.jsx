import { Grid, Paper, Text, Title, Tooltip } from '@mantine/core';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

// This component visualizes our key metrics in a nice chart and summary cards.
// It helps stakeholders quickly understand user engagement trends.

function MetricsOverview({ metrics, filteredUsers }) {
  // Prepare our data for the bar chart
  const chartData = [
    { name: 'Daily', users: metrics.dailyActiveUsers },
    { name: 'Weekly', users: metrics.weeklyActiveUsers },
    { name: 'Monthly', users: metrics.monthlyActiveUsers },
  ];

  return (
    <>
      <Title order={2} mb="md">Metrics Overview</Title>
      <Grid>
        <Grid.Col span={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}
                style={{ 
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.9) 100%)'
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="users" fill="var(--primary-color)">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(${240 + index * 20}, 84%, 65%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </Grid.Col>
        <Grid.Col span={4}>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper p="xl" radius="md" className="metric-card">
              <Tooltip label="Percentage of users active in the last 7 days">
                <div>
                  <Text size="lg" weight={500}>Retention Rate</Text>
                  <Text 
                    size="xl" 
                    weight={700} 
                    color={metrics.retentionRate > 70 ? 'green' : metrics.retentionRate > 40 ? 'yellow' : 'red'}
                    style={{ transition: 'color 0.3s ease' }}
                  >
                    {metrics.retentionRate.toFixed(1)}%
                  </Text>
                  <Text size="sm" color="dimmed" mt="xs">
                    Based on {metrics.weeklyActiveUsers} active users out of {filteredUsers.length} total users
                  </Text>
                </div>
              </Tooltip>
            </Paper>
          </motion.div>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default MetricsOverview;