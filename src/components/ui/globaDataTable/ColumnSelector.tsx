import { FC } from 'react';
import { IconColumns } from '@tabler/icons-react';
import { Button, Checkbox, Menu, Stack, Text, ScrollArea, Group } from '@mantine/core';

export interface ColumnOption {
  value: string;
  label: string;
}

interface ColumnSelectorProps {
  /** The list of all available columns */
  columns: ColumnOption[];
  /** The array of currently visible column IDs */
  value: string[];
  /** Callback when selection changes */
  onChange?: (values: string[]) => void;
  /** Button label */
  title?: string;
  /** Minimum number of columns that must remain selected */
  minSelected?: number;
}

const ColumnSelector: FC<ColumnSelectorProps> = ({
  columns,
  value,
  onChange,
  title = 'Columns',
  minSelected = 1,
}) => {
  
  // Logic to handle toggling a specific column
  const handleToggle = (colValue: string) => {
    const isSelected = value.includes(colValue);

    if (isSelected) {
      // Don't allow deselecting if we reached the minimum limit
      if (value.length <= minSelected) {
        return;
      }
      
      // Remove from list
      onChange?.(value.filter((v) => v !== colValue));
    } else {
      // Add to list
      onChange?.([...value, colValue]);
    }
  };

  return (
    <Menu shadow="md"  closeOnItemClick={false} trigger="hover" position="bottom-end">
      <Menu.Target>
        <Button 
          variant="subtle" 
          color="gray" 
          size="sm" 
          leftSection={<IconColumns size={16} />}
        >
          {title}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Group justify="space-between">
            <Text size="xs">Toggle Visibility</Text>
            <Text size="xs" c="dimmed">{value.length} / {columns.length}</Text>
          </Group>
        </Menu.Label>
        
        <ScrollArea.Autosize mah={300} type="scroll">
          <Stack gap="xs" p="xs">
            {columns.map((col) => {
              const isChecked = value.includes(col.value);
              // Disable unchecking if it's the last one remaining
              const isDisabled = isChecked && value.length <= minSelected;

              return (
                <Checkbox
                  key={col.value}
                  label={<Text size="sm">{col.label}</Text>}
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => handleToggle(col.value)}
                  style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                />
              );
            })}
          </Stack>
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ColumnSelector;