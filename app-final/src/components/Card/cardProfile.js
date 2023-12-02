import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apicrud from '../../services/apicrud';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileCard = ({ data, onDelete }) => {
  const { id, name, island, hemisphere, fruit, flower } = data;
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      // Utiliza o método delete do apicrud para excluir o perfil
      await apicrud.delete(`profiles/${id}`);

      // Chama a função de exclusão passada como prop para atualizar a lista após a exclusão
      onDelete(id);
    } catch (error) {
      console.error('Erro ao excluir perfil:', error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.cardText}>{`Ilha: ${island}`}</Text>
        <Text style={styles.cardText}>{`Hemisfério: ${hemisphere}`}</Text>
        <Text style={styles.cardText}>{`Fruta: ${fruit}`}</Text>
        <Text style={styles.cardText}>{`Flor: ${flower}`}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleDelete} style={styles.buttonExcluir}>
          <MaterialCommunityIcons name="close-thick" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 30,
    marginVertical: 8,
    backgroundColor: '#F1FFFC',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  buttonExcluir: {
    marginLeft: 10,
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
  },
});

export default ProfileCard;
