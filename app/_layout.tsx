import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const units = [
  { label: 'Metre', value: 1 },
  { label: 'Millimetre', value: 1000 },
  { label: 'Mile', value: 0.000621371 },
  { label: 'Foot', value: 3.28084 },
];

// Define the main App component
const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<number>(1); 
  const [toUnit, setToUnit] = useState<number>(1); 
  const [result, setResult] = useState<string>('');
  const [openFrom, setOpenFrom] = useState(false); 
  const [openTo, setOpenTo] = useState(false); 

  
  const handleConversion = (): void => {
    const value = parseFloat(inputValue); 
    if (isNaN(value)) { 
      return;
    }
    const convertedValue = (value * fromUnit) / toUnit;
    setResult(`${convertedValue.toFixed(4)}`); 
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Length Unit Converter</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter value"
            value={inputValue}
            onChangeText={setInputValue}
            blurOnSubmit={true}
            returnKeyType="done"
          />

          <View style={styles.pickerContainer}>
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>From:</Text>
              <DropDownPicker
                open={openFrom}
                value={fromUnit}
                items={units}
                setOpen={setOpenFrom}
                setValue={setFromUnit}
                setItems={() => {}}
                containerStyle={{ height: 40 }}
                style={styles.dropdown}
                dropDownDirection="TOP"
              />
            </View>

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>To:</Text>
              <DropDownPicker
                open={openTo}
                value={toUnit}
                items={units}
                setOpen={setOpenTo}
                setValue={setToUnit}
                setItems={() => {}}
                containerStyle={{ height: 40 }}
                style={styles.dropdown}
                dropDownDirection="TOP"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Convert" onPress={handleConversion} color="#007BFF" />
          </View>

          {result ? <Text style={styles.result}>Result: {result}</Text> : null}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

// Define the styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 30,
    color: '#007BFF',
  },
  input: {
    height: 45,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 18,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    textAlign: 'center',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#007BFF',
  },
});

export default App;
