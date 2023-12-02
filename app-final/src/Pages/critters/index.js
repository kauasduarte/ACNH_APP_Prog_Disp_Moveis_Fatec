import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import Card from '../../components/Card/cardCritter';
import { useNavigation } from '@react-navigation/native';

export default function Critters() {
  const [critter, setCritter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/nh/sea');
        setCritter(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator color="#09A6FF" size={40} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={critter}
          keyExtractor={(item) => item.number.toString()}
          renderItem={({ item }) => <Card data={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
});
