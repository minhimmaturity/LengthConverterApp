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

// Define the unit conversion values in an object
const units = [
  { label: 'Metre', value: 1 },
  { label: 'Millimetre', value: 1000 },
  { label: 'Mile', value: 0.000621371 },
  { label: 'Foot', value: 3.28084 },
];

// Define the main App component
const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // Input value should be a string since it's taken from TextInput
  const [fromUnit, setFromUnit] = useState<number>(1); // Selected 'from' unit (using number value)
  const [toUnit, setToUnit] = useState<number>(1); // Selected 'to' unit (using number value)
  const [result, setResult] = useState<string>(''); // Result of conversion
  const [openFrom, setOpenFrom] = useState(false); // Control dropdown open state for 'from' unit
  const [openTo, setOpenTo] = useState(false); // Control dropdown open state for 'to' unit

  // Function to handle conversion
  const handleConversion = (): void => {
    const value = parseFloat(inputValue); // Convert input string to a float
    if (isNaN(value)) {
      setResult('Invalid input'); // Show an error if input is not a valid number
      return;
    }
    const convertedValue = (value * fromUnit) / toUnit;
    setResult(`${convertedValue.toFixed(4)}`); // Update the result with the converted value (to 4 decimal places)
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Length Unit Converter</Text>

          {/* Input field for entering the value to convert */}
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
            {/* Dropdown for selecting the 'from' unit */}
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>From:</Text>
              <DropDownPicker
                open={openFrom} // Use open state to control dropdown visibility
                value={fromUnit} // Use value instead of defaultValue
                items={units}
                setOpen={setOpenFrom}
                setValue={setFromUnit}
                setItems={() => {}} // This can be an empty function or handled if you want to manage items
                containerStyle={{ height: 40 }}
                style={styles.dropdown}
                dropDownDirection="TOP" // Make dropdown expand upwards
              />
            </View>

            {/* Dropdown for selecting the 'to' unit */}
            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>To:</Text>
              <DropDownPicker
                open={openTo} // Use open state to control dropdown visibility
                value={toUnit} // Use value instead of defaultValue
                items={units}
                setOpen={setOpenTo}
                setValue={setToUnit}
                setItems={() => {}} // This can be an empty function or handled if you want to manage items
                containerStyle={{ height: 40 }}
                style={styles.dropdown}
                dropDownDirection="TOP" // Make dropdown expand upwards
              />
            </View>
          </View>

          {/* Button to trigger the conversion */}
          <View style={styles.buttonContainer}>
            <Button title="Convert" onPress={handleConversion} color="#007BFF" />
          </View>

          {/* Display the conversion result */}
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
