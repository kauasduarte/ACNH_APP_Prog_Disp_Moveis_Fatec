import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import Card from '../../components/Card/cardFish';
import { useNavigation } from '@react-navigation/native';

export default function Fish() {
  const [fish, setFish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/nh/fish');
        setFish(response.data);
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
          data={fish}
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
    backgroundColor: 'white', // #D7EEFF
  },
});
