import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      {}
      <Image 
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0097AB', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 230, 
    height: 230, 
    resizeMode: 'contain',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#c6f2f7',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  buttonPrimary: {
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  linkText: {
    color: '#00796b',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});