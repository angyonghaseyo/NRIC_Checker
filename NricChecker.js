// NRICChecker.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NRICChecker = () => {
  const [nric, setNric] = useState('');
  const [result, setResult] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const checkSpecialNum = (x) => {
    const dict1 = { 0: 'J', 1: 'Z', 2: 'I', 3: 'H', 4: 'G', 5: 'F', 6: 'E', 7: 'D', 8: 'C', 9: 'B', 10: 'A' };
    const dict2 = { 0: 'X', 1: 'W', 2: 'U', 3: 'T', 4: 'R', 5: 'Q', 6: 'P', 7: 'N', 8: 'M', 9: 'L', 10: 'K' };
    
    const weights = [2, 7, 6, 5, 4, 3, 2];
    const sum = x.slice(1, 8)
                  .split('')
                  .reduce((acc, digit, index) => acc + parseInt(digit) * weights[index], 0);

    const specialNum = sum % 11;
    const lastChar = x[8];

    if (['S', 'T'].includes(x[0])) {
      return lastChar === (x[0] === 'S' ? dict1[specialNum] : dict1[(specialNum + 4) % 11]);
    } else if (['F', 'G'].includes(x[0])) {
      return lastChar === (x[0] === 'F' ? dict2[specialNum] : dict2[(specialNum + 4) % 11]);
    }
    return false;
  };

  const nricChecker = (nricValue) => {
    if (nricValue.length !== 9) {
      return "Invalid Length"; // Check Length of String First
    }
    nricValue = nricValue.toUpperCase();
    if (!['T', 'G', 'F', 'S'].includes(nricValue[0])) {
      return "Invalid First Letter"; // Check First Letter Next
    } else if (checkSpecialNum(nricValue)) {
      return "Valid NRIC"; // Check Special Num 
    } else {
      return "Invalid NRIC";
    }
  };

  const handleCheck = () => {
    const message = nricChecker(nric);
    setResult(message);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/snack-icon.png')} // Adjust the path based on your project structure
        style={styles.logo}
      />
      <Text style={styles.title}>NRIC Verification</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setNric(text)}
        value={nric}
        placeholder="Enter NRIC (e.g., S1234567D)"
        autoCapitalize="characters"
        maxLength={9}
      />
      <TouchableOpacity onPress={handleCheck} style={styles.button}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      {modalVisible && (
        <View style={styles.modal}>
          <Text style={styles.result}>{result}</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 5,
    borderColor: 'gray',
    fontSize: 9,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#841584',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modal: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  result: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NRICChecker;
