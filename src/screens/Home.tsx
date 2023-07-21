import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Dropdown from '../Components/DropDown';

const Home: React.FC = () => {
  const [selected, setSelected] = useState<{ label: string; value: string } | undefined>(undefined);
  const data = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ];

  return (
    <View style={styles.container}>
      {selected && (
        <Text>
          Selected: label = {selected.label} and value = {selected.value}
        </Text>
      )}
      <Dropdown label="Select Truck" data={data} onSelect={setSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
