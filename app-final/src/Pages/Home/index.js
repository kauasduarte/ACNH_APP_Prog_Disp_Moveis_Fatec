import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import apicrud from '../../services/apicrud';
import ProfileCard from '../../components/Card/cardProfile';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apicrud.get('/profiles');
      setProfiles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (deletedProfileId) => {
    try {
      await apicrud.delete(`profiles/${deletedProfileId}`);
      setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== deletedProfileId));
    } catch (error) {
      console.error('Erro ao excluir perfil:', error);
    }
  };

  const handleCreateProfile = () => {
    navigation.navigate('ProfileForm', { profiles, setProfiles });
  };

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color="#09A6FF" size={40} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfis</Text>
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProfileCard
              data={item}
              onDelete={handleDeleteProfile}
            />
          )}
        />
        <TouchableOpacity style={styles.plusIcon} onPress={handleCreateProfile}>
          <MaterialCommunityIcons name="plus-circle" size={50} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  plusIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16
  },
});
