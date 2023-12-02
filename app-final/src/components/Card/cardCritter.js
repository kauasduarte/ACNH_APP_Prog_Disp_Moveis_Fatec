import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ data }) => {
  const [isChecked, setChecked] = useState(null);

  useEffect(() => {
    const loadCheckedState = async () => {
      try {
        const storedCheckedState = await AsyncStorage.getItem(`isChecked_${data.number}`);
        if (storedCheckedState !== null) {
          setChecked(JSON.parse(storedCheckedState));
        } else {
          setChecked(false);
        }
      } catch (error) {
        console.error('Error loading checked state:', error);
      }
    };

    loadCheckedState();
  }, [data.number]);

  useEffect(() => {
    const saveCheckedState = async () => {
      try {
        await AsyncStorage.setItem(`isChecked_${data.number}`, JSON.stringify(isChecked));
      } catch (error) {
        console.error('Error saving checked state:', error);
      }
    };

    if (isChecked !== null) {
      saveCheckedState();
    }
  }, [isChecked, data.number]);

  const toggleCheck = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  if (isChecked === null) {
    // Aguarde o carregamento do estado antes de renderizar
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.image_url }} style={styles.cardImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.cardText}>{`Tamanho: ${data.shadow_size}`}</Text>
        <Text style={styles.cardText}>{`Movimento: ${data.shadow_movement}`}</Text>
      </View>
      <TouchableOpacity onPress={toggleCheck}>
        <MaterialCommunityIcons
          name={isChecked ? 'check-circle' : 'check-circle-outline'}
          size={50}
          color="#7EF0D8"
        />
      </TouchableOpacity>
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
    margin: 10,
    marginBottom: 2,
    backgroundColor: '#F1FFFC',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 10,
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  cardText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default Card;
