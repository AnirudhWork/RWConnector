import React, {useState} from 'react';
import {StyleSheet, Button, Text, View} from 'react-native';
import Dropdown from '../Components/DropDown';

const Jobs: React.FC = () => {
  const [selected, setSelected] = useState<
    {label: string; value: string} | undefined
  >(undefined);
  const data = [
    {label: 'Truck 72', value: '1'},
    {label: 'Truck 73', value: '2'},
    {label: 'Truck 101', value: '3'},
    {label: 'Truck 102', value: '4'},
    {label: 'Truck 201', value: '5'},
  ];

  return (
    <View style={styles.container}>
      <Dropdown label="Select Truck" data={data} onSelect={setSelected} />
      {selected && (
        <Text style={{marginHorizontal: 10}}>Selected: {selected.label}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Jobs;
