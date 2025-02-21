import { Stack, Paper, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';

// This component displays AI-generated insights about user behavior.
// It helps identify potential issues and opportunities for improvement.

function AIInsights({ insights }) {

  const getImpactColor = (impact) => {
    switch(impact.toLowerCase()) {
      case 'high': // Red for urgent attention needed
        return 'red';
      case 'medium': // Orange for moderate concern
        return 'orange';
      case 'low': // Yellow for minor issues
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <>
      <Title order={2} mb="md">AI Insights</Title>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        {insights.map((insight) => (
          <motion.div key={insight.id} variants={item}>
            <Paper 
              p="md" 
              withBorder 
              mb="sm"
              className={`insights-card ${insight.type}`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Text size="sm" color="dimmed" mb="xs">{insight.category}</Text>
              <Text>{insight.message}</Text>
              <Text size="sm" color={getImpactColor(insight.impact)} mt="xs">
                Impact: {insight.impact}
              </Text>
            </Paper>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default AIInsights