import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
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
import {ITruckProps} from '../screens/types';
import {globalColors} from '../Utils/global-colors';

const Dropdown: FC<IProps> = ({label, data, onSelect}) => {
  const chevron_down = require('../Assets/Icons/chevron-down.png');
  const chevron_up = require('../Assets/Icons/chevron-up.png');
  const DropdownButton = useRef<TouchableOpacity>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<any>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [chevronToggle, setChevronToggle] = useState(chevron_down);

  useEffect(() => {
    if (visible) {
      setChevronToggle(chevron_up);
    } else {
      setChevronToggle(chevron_down);
    }
  }, [visible]);

  const toggleDropdown = (): void => {
    if (visible) {
      setVisible(false);
    } else {
      openDropdown();
    }
  };

  const openDropdown = (): void => {
    //calculating the position of the DropDownButton
    DropdownButton.current?.measure((x, y, width, height, pageX, pageY) => {
      setDropdownTop(pageY + height);
    });
    setVisible(true);
  };

  const onItemPress = (item: ITruckProps): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem: ListRenderItem<ITruckProps> = ({item}) => (
    <TouchableOpacity
      style={[
        styles.item,
        selected?.name === item.name ? styles.selectedItem : null,
      ]}
      onPress={() => onItemPress(item)}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={styles.modal_container}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setVisible(false)}>
            <View style={[styles.dropDownItemsContainer, {top: dropdownTop}]}>
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
      style={styles.DropDownButton}
      onPress={toggleDropdown}>
      {renderDropdown()}
      <Text
        style={[
          styles.DropDownButtonText,
          selected
            ? {color: globalColors.black}
            : {color: globalColors.PLACEHOLDER},
        ]}>
        {selected?.name || label}
      </Text>
      <Image style={styles.icon} source={chevronToggle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  DropDownButton: {
    flexDirection: 'row',
    borderColor: '#DCDDDF',
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginRight: 3,
    height: 50,
    zIndex: 1,
  },
  DropDownButtonText: {
    flex: 1,
    textAlign: 'left',
    marginHorizontal: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  icon: {
    marginRight: 10,
    height: 40,
  },
  dropDownItemsContainer: {
    position: 'absolute',
    width: '100%',
    maxHeight: 292,
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: {height: 4, width: 0},
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
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
    borderColor: 'rgba(220, 221, 223, 0.3)',
  },
  itemText: {
    fontSize: 15,
  },
  selectedItem: {
    backgroundColor: '#5897FB',
  },
});

export default Dropdown;
