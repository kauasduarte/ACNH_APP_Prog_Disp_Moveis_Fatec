import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native';
import apicrud from '../services/apicrud';

const ProfileForm = ({ route }) => {
  const { profiles = [], setProfiles } = route.params || {};
  const [name, setName] = useState('');
  const [island, setIsland] = useState('');
  const [hemisphere, setHemisphere] = useState('Norte');
  const [fruit, setFruit] = useState('');
  const [flower, setFlower] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const newProfile = {
        id: Math.floor(Math.random() * 1000),
        name,
        island,
        hemisphere,
        fruit,
        flower,
      };

      console.log('Criando novo perfil:', newProfile);
      await apicrud.post('profiles', newProfile);

      // Atualizar a lista após a submissão
      const updatedProfiles = [...profiles, newProfile];
      setProfiles(updatedProfiles);

      // Navegar de volta para a tela anterior após a submissão
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);

      if (error.response && error.response.status === 404) {
        console.error('Perfil não encontrado. Verifique o ID do perfil e a configuração do servidor.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Ilha:</Text>
      <TextInput
        style={styles.input}
        value={island}
        onChangeText={(text) => setIsland(text)}
      />

      <Text style={styles.label}>Hemisfério:</Text>
      <View style={styles.rowContainer}>
        <Switch
          value={hemisphere === 'Norte'}
          onValueChange={(value) => setHemisphere(value ? 'Norte' : 'Sul')}
          trackColor={{ false: '#81b0ff', true: '#81b0ff' }}
          thumbColor={hemisphere === 'Norte' ? '#4CAF50' : '#f4f3f4'}
        />
        <Text style={styles.switchText}>{hemisphere}</Text>
      </View>

      <Text style={styles.label}>Fruta:</Text>
      <Picker
        selectedValue={fruit}
        style={styles.input}
        onValueChange={(itemValue) => setFruit(itemValue)}
      >
        <Picker.Item label="Pêra" value="Pêra" />
        <Picker.Item label="Maçã" value="Maçã" />
        <Picker.Item label="Pêssego" value="Pêssego" />
        <Picker.Item label="Cereja" value="Cereja" />
        <Picker.Item label="Laranja" value="Laranja" />
      </Picker>

      <Text style={styles.label}>Flor:</Text>
      <Picker
        selectedValue={flower}
        style={styles.input}
        onValueChange={(itemValue) => setFlower(itemValue)}
      >
        <Picker.Item label="Jacinto" value="Jacinto" />
        <Picker.Item label="Lírio" value="Lírio" />
        <Picker.Item label="Rosa" value="Rosa" />
        <Picker.Item label="Tulipa" value="Tulipa" />
      </Picker>

      <Button title="Salvar" onPress={handleSubmit} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#D7EEFF', // Tom de verde-água
  },
  label: {
    color: '#4CAF50', // Cor verde-água mais escura
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#81b0ff', // Cor azul suave
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginLeft: 8,
    color: '#4CAF50', // Cor verde-água mais escura
  },
});

export default ProfileForm;
