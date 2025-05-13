import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function DashboardScreen({ navigation }) {
  const [peso, setPeso] = useState('70');
  const [meta, setMeta] = useState('2450');
  const [novoPeso, setNovoPeso] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [alarmes, setAlarmes] = useState([]);

  const atualizarPeso = () => {
    if (novoPeso) {
      setPeso(novoPeso);
      setMeta((Number(novoPeso) * 35).toFixed(0)); // 35 ml por kg
      setNovoPeso('');
    }
  };

  const adicionarAlarme = () => {
    if (frequencia && quantidade) {
      const novoAlarme = {
        id: Date.now().toString(),
        frequencia,
        quantidade,
      };
      setAlarmes([...alarmes, novoAlarme]);
      setFrequencia('');
      setQuantidade('');
    }
  };

  const removerAlarme = (id) => {
    setAlarmes(alarmes.filter(alarme => alarme.id !== id));
  };

  const confirmarIngestao = (quantidade) => {
    Alert.alert('Confirmação', `Você bebeu ${quantidade} ml de água?`, [
      { text: 'Sim', onPress: () => {} },
      { text: 'Não' },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a)!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meta diária</Text>
        <Text><Text style={styles.bold}>Peso:</Text> {peso} kg</Text>
        <Text><Text style={styles.bold}>Meta:</Text> {meta} ml</Text>

        <TextInput
          style={styles.input}
          placeholder="Atualizar peso (kg)"
          keyboardType="numeric"
          value={novoPeso}
          onChangeText={setNovoPeso}
        />
        <TouchableOpacity style={styles.buttonPrimary} onPress={atualizarPeso}>
          <Text style={styles.buttonText}>Atualizar Peso</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Novo Alarme</Text>
        <TextInput
          style={styles.input}
          placeholder="Frequência (min)"
          keyboardType="numeric"
          value={frequencia}
          onChangeText={setFrequencia}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantidade (ml)"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <TouchableOpacity style={styles.buttonSuccess} onPress={adicionarAlarme}>
          <Text style={styles.buttonText}>Adicionar Alarme</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Alarmes ativos</Text>
        <FlatList
          data={alarmes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.alarmeContainer}>
              <TouchableOpacity onPress={() => confirmarIngestao(item.quantidade)}>
                <Text style={styles.alarmeItem}>
                  A cada {item.frequencia} min: {item.quantidade} ml
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removerAlarme(item.id)} style={styles.removeButton}>
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText1}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0097AB',
    padding: 16,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  buttonPrimary: {
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: '#43a047',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#c6f2f7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  alarmeItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  alarmeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#e53935',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
