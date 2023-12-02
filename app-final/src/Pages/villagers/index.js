import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'; 
import {Picker} from '@react-native-picker/picker'
import api from '../../services/api';
import Card from '../../components/Card/cardVillager';
import { useNavigation } from '@react-navigation/native';

export default function Villager() {
  const [villager, setVillager] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '/villagers';

        if (selectedSpecies && selectedSpecies !== 'all') {
          endpoint = `/villagers?species=${selectedSpecies}`;
        }

        const response = await api.get(endpoint);
        setVillager(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSpecies]);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSpecies}
        onValueChange={(itemValue) => setSelectedSpecies(itemValue)}
      >
        <Picker.Item label="Todas as espécies" value="all" />
          <Picker.Item label="Alligator" value="alligator" />
          <Picker.Item label="Anteater" value="anteater" />
          <Picker.Item label="Bear" value="bear" />
          <Picker.Item label="Bear Cub" value="bear cub" />
          <Picker.Item label="Bird" value="bird" />
          <Picker.Item label="Bull" value="bull" />
          <Picker.Item label="Cat" value="cat" />
          <Picker.Item label="Cub" value="cub" />
          <Picker.Item label="Chicken" value="chicken" />
          <Picker.Item label="Cow" value="cow" />
          <Picker.Item label="Deer" value="deer" />
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Duck" value="duck" />
          <Picker.Item label="Eagle" value="eagle" />
          <Picker.Item label="Elephant" value="elephant" />
          <Picker.Item label="Frog" value="frog" />
          <Picker.Item label="Goat" value="goat" />
          <Picker.Item label="Gorilla" value="gorilla" />
          <Picker.Item label="Hamster" value="hamster" />
          <Picker.Item label="Hippo" value="hippo" />
          <Picker.Item label="Horse" value="horse" />
          <Picker.Item label="Koala" value="koala" />
          <Picker.Item label="Kangaroo" value="kangaroo" />
          <Picker.Item label="Lion" value="lion" />
          <Picker.Item label="Monkey" value="monkey" />
          <Picker.Item label="Mouse" value="mouse" />
          <Picker.Item label="Octopus" value="octopus" />
          <Picker.Item label="Ostrich" value="ostrich" />
          <Picker.Item label="Penguin" value="penguin" />
          <Picker.Item label="Pig" value="pig" />
          <Picker.Item label="Rabbit" value="rabbit" />
          <Picker.Item label="Rhino" value="rhino" />
          <Picker.Item label="Rhinoceros" value="rhinoceros" />
          <Picker.Item label="Sheep" value="sheep" />
          <Picker.Item label="Squirrel" value="squirrel" />
          <Picker.Item label="Tiger" value="tiger" />
          <Picker.Item label="Wolf" value="wolf" />
      </Picker>

      {loading ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator color="#09A6FF" size={40} />
        </View>
      ) : (
        <FlatList
          data={villager}
          keyExtractor={(item) => item.number}
          renderItem={({ item }) => item ? <Card data={item} /> : null}
          extraData={selectedSpecies}
          ListEmptyComponent={() => (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text>Nenhum animal encontrado.</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
