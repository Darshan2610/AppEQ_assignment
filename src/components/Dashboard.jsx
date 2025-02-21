import { useState, useEffect, useMemo } from 'react';
import { Container, Grid, Paper, Title, Select, Group, RangeSlider } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import MetricsOverview from './MetricsOverview';
import UserTable from './UserTable';
import AIInsights from './AIInsights';
import PredictionsList from './PredictionsList';
import { users, getActiveUsers, getRetentionRate, getChurnPredictions, getAIInsights } from '../data/mockData';
import { motion } from 'framer-motion';

// This is our main dashboard component that brings everything together.
// It handles filtering, data processing, and layout of all our metrics and insights.

function Dashboard() {
  // Track user selections for filtering the data
  const [dateRange, setDateRange] = useState([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [engagementRange, setEngagementRange] = useState([0, 100]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [metrics, setMetrics] = useState({
    dailyActiveUsers: getActiveUsers('daily', users),
    weeklyActiveUsers: getActiveUsers('weekly', users),
    monthlyActiveUsers: getActiveUsers('monthly', users),
    retentionRate: getRetentionRate(users)
  });

  // Memoize filteredUsers to prevent unnecessary recalculations
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      if (!user) return false;

      const matchesSearch = (user.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      
      const matchesEngagement = typeof user.engagementScore === 'number' && 
        user.engagementScore >= engagementRange[0] && 
        user.engagementScore <= engagementRange[1];
      
      const matchesCategory = selectedCategory === 'all' || 
        (user.retentionCategory && user.retentionCategory.toLowerCase() === selectedCategory.toLowerCase());

      const matchesDateRange = !dateRange[0] || !dateRange[1] || (
        user.lastLogin && (() => {
          const loginDate = parseISO(user.lastLogin);
          return isWithinInterval(loginDate, {
            start: startOfDay(dateRange[0]),
            end: endOfDay(dateRange[1])
          });
        })()
      );

      return matchesSearch && matchesEngagement && matchesCategory && matchesDateRange;
    });
  }, [searchQuery, engagementRange, selectedCategory, dateRange]);

  // Updating metrics only when filteredUsers changes
  useEffect(() => {
    if (filteredUsers.length === 0) {
      setMetrics({
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        retentionRate: 0
      });
    } else {
      setMetrics({
        dailyActiveUsers: getActiveUsers('daily', filteredUsers),
        weeklyActiveUsers: getActiveUsers('weekly', filteredUsers),
        monthlyActiveUsers: getActiveUsers('monthly', filteredUsers),
        retentionRate: getRetentionRate(filteredUsers)
      });
    }
  }, [filteredUsers]);

  return (
    <Container size="xl" p="md" className="dashboard-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title order={1} mb="lg" 
          style={{ 
            background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem'
          }}
        >
          Customer Engagement Dashboard
        </Title>
      </motion.div>
      
      <Paper p="md" radius="lg" mb="lg" shadow="sm"
        style={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        <Group>
          <DatePickerInput
            type="range"
            label="Date Range"
            placeholder="Pick date range"
            value={dateRange}
            onChange={setDateRange}
            clearable
            style={{ flex: 1 }}
          />
          <Select
            label="Retention Category"
            placeholder="Select category"
            value={selectedCategory}
            onChange={setSelectedCategory}
            data={[
              { value: 'all', label: 'All Categories' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]}
            style={{ flex: 1 }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ marginBottom: '8px', fontSize: '14px' }}>Engagement Score Range</p>
            <RangeSlider
              value={engagementRange}
              onChange={setEngagementRange}
              min={0}
              max={100}
              label={(value) => value}
              marks={[
                { value: 0, label: '0' },
                { value: 50, label: '50' },
                { value: 100, label: '100' }
              ]}
            />
          </div>
        </Group>
      </Paper>

      <Grid>
        <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
          <Paper p="md" radius="md">
            <MetricsOverview 
              metrics={metrics} 
              filteredUsers={filteredUsers}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8, lg: 8 }}>
          <Paper p="md" radius="md">
            <UserTable 
              users={filteredUsers}
              onSearch={setSearchQuery}
              searchQuery={searchQuery}
            />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4, lg: 4 }}>
          <Paper p="md" radius="md" mb="lg">
            <AIInsights insights={getAIInsights()} />
          </Paper>
          <Paper p="md" radius="md">
            <PredictionsList predictions={getChurnPredictions()} />
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default Dashboard;