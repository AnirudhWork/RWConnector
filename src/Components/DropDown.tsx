import React, {FC, ReactElement, useRef, useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {IProps} from './types';

const Dropdown: FC<IProps> = ({label, data, onSelect}) => {
  const DropdownButton = useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const chevron_down = require('../Icons/chevron-down.png');

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    //calculating the position of the button
    DropdownButton.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownTop(pageY + height);
    });
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem: ListRenderItem<{label: string; value: string}> = ({
    item,
  }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selected?.value === item.value ? styles.selectedItem : null,
      ]}
      onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={styles.modal_container}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <View style={[styles.dropdown, {top: dropdownTop}]}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
      activeOpacity={0.8}>
      {renderDropdown()}
      <Text style={styles.buttonText}>{selected?.label || label}</Text>
      <Image style={styles.icon} source={chevron_down} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    borderColor: 'rgba(51, 51, 51, 0.50)',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#efefef',
    margin: 10,
    height: 50,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    color: 'rgba(51, 51, 51, 0.50)',
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    borderColor: 'rgba(51, 51, 51, 0.50)',
    borderWidth: 1,
  },
  modal_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  selectedItem: {
    backgroundColor: '#5897FB',
  },
});

export default Dropdown;
