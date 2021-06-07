import React from 'react';
import {TouchableOpacity, ImageBackground, StyleSheet,Text} from 'react-native';

export default (ChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(index)}>
      <ImageBackground
        style={[styles.image, style, {height: height}]}
        source={{uri: item.image}} 
      >
      {/* <Text style={{position:'absolute',bottom:4,padding:8,color:'white'}}>{item.title}</Text> */}
      </ImageBackground>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
});
