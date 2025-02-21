import { Title, Table, Text, Badge } from '@mantine/core';

function PredictionsList({ predictions }) {
  return (
    <>
      <Title order={2} mb="md">Churn Predictions</Title>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Risk</Table.Th>
            <Table.Th>Reason</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {predictions.map((prediction) => (
            <Table.Tr key={prediction.id}>
              <Table.Td>
                <Text size="sm" weight={500}>{prediction.name}</Text>
                <Text size="xs" color="dimmed">{prediction.email}</Text>
              </Table.Td>
              <Table.Td>
                <Badge color="red">{prediction.churnRisk}</Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{prediction.reason}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}

export default PredictionsList;