import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../hooks/useStorage';
import { PasswordItem } from './components/passworditem';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem("@pass");
      setListPasswords(passwords);
    }

    loadPasswords();
  }, [focused]);

  async function handleDeletePassword(item) {
    const passwords = await removeItem("@pass", item);
    setListPasswords(passwords);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Senhas </Text>
      </View>

      <View style={styles.content}>
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <View style={styles.passwordItemContainer}>
              <PasswordItem data={item} removePassword={() => handleDeletePassword(item)} />
              <TouchableOpacity onPress={() => handleDeletePassword(item)}>
                <FontAwesomeIcon icon={faTrash} style={styles.trashIcon} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF0000",
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14
  },
  passwordItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  trashIcon: {
    color: 'red',
    fontSize: 20,
    marginLeft: 10,
  },
});
