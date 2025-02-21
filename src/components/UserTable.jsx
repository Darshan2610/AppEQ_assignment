import { Table, TextInput, Text, Badge, Tooltip } from '@mantine/core';
import { format } from 'date-fns';

function UserTable({ users, onSearch, searchQuery }) {
  const getBadgeColor = (category) => {
    switch (category.toLowerCase()) {
      case 'high':
        return 'red';
      case 'medium':
        return 'yellow';
      case 'low':
        return 'green';
      default:
        return 'gray';
    }
  };

  return (
    <>
      <TextInput
        placeholder="Search users..."
        value={searchQuery}
        onChange={(event) => onSearch(event.currentTarget.value)}
        mb="md"
      />
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Last Login</Table.Th>
            <Table.Th>Engagement Score</Table.Th>
            <Table.Th>Retention Risk</Table.Th>
            <Table.Th>Recent Activity</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{format(new Date(user.lastLogin), 'MMM dd, yyyy')}</Table.Td>
              <Table.Td>
                <Tooltip label={`Based on login frequency and feature usage`}>
                  <Text weight={500} color={user.engagementScore >= 70 ? 'green' : 'red'}>
                    {user.engagementScore}
                  </Text>
                </Tooltip>
              </Table.Td>
              <Table.Td>
                <Tooltip label={`${user.retentionCategory} risk of churning`}>
                  <Badge color={getBadgeColor(user.retentionCategory)}>
                    {user.retentionCategory}
                  </Badge>
                </Tooltip>
              </Table.Td>
              <Table.Td>
                <Text size="sm" color="dimmed">
                  {user.activities?.slice(-2).map(activity => 
                    activity.type === 'feature_usage' ? activity.feature : activity.type
                  ).join(', ')}
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export default UserTable;