import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Card = ({ data }) => {
  const [isHomeIconFilled, setHomeIconFilled] = useState(null);
  const [isHeartIconFilled, setHeartIconFilled] = useState(null);

  useEffect(() => {
    const loadIconStatus = async () => {
      try {
        const homeIconStatus = await AsyncStorage.getItem(`homeIcon_${data.id}`);
        const heartIconStatus = await AsyncStorage.getItem(`heartIcon_${data.id}`);

        setHomeIconFilled(homeIconStatus === 'filled');
        setHeartIconFilled(heartIconStatus === 'filled');
      } catch (error) {
        console.error('Error loading icon status from AsyncStorage:', error);
      }
    };

    loadIconStatus();
  }, [data.id]);

  useEffect(() => {
    const saveIconStatus = async () => {
      try {
        await AsyncStorage.setItem(`homeIcon_${data.id}`, isHomeIconFilled ? 'filled' : 'outline');
        await AsyncStorage.setItem(`heartIcon_${data.id}`, isHeartIconFilled ? 'filled' : 'outline');
      } catch (error) {
        console.error('Error saving icon status to AsyncStorage:', error);
      }
    };

    if (isHomeIconFilled !== null && isHeartIconFilled !== null) {
      saveIconStatus();
    }
  }, [isHomeIconFilled, isHeartIconFilled, data.id]);

  const toggleHomeIcon = () => {
    setHomeIconFilled((prev) => !prev);
  };

  const toggleHeartIcon = () => {
    setHeartIconFilled((prev) => !prev);
  };

  if (isHomeIconFilled === null || isHeartIconFilled === null) {
    // Wait for the state to load before rendering
    return null;
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: data.image_url }} style={styles.cardImage} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{data.name}</Text>
        <Text style={styles.cardText}>{`Espécie: ${data.species || 'Sem informação'}`}</Text>
        <Text style={styles.cardText}>{`Personalidade: ${data.personality}`}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleHomeIcon}>
          <MaterialCommunityIcons
            name={isHomeIconFilled ? 'home' : 'home-outline'}
            size={30}
            color="#7EF0D8"
            style={styles.singleIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleHeartIcon}>
          <MaterialCommunityIcons
            name={isHeartIconFilled ? 'heart' : 'heart-outline'}
            size={30}
            color="#7EF0D8"
            style={styles.singleIcon}
          />
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
    margin: 10,
    marginBottom: 2,
    backgroundColor: '#F1FFFC',
  },
  imageContainer: {
    marginRight: 16,
  },
  cardImage: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 5,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleIcon: {
    marginVertical: 2,
  },
});

export default Card;
