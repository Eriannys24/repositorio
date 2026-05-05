import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function ToolsScreen({ route, navigation }) {
// 1. Recebemos o objeto completo vindo da IngredientsScreen
const { receitaCompleta } = route.params || {};

// 2. Extraímos a lista de utensílios.
// Caso a receita não tenha (segurança), exibimos uma lista vazia.
const listaUtensilios = receitaCompleta?.utensilios || [];

return (
<View style={styles.container}>
<Text style={styles.title}>Utensílios necessários</Text>
<Text style={styles.subtitle}>Para o seu {receitaCompleta?.nome || "prato"}:</Text>

{/* 3. Renderizamos a lista dinamicamente */}
<FlatList
data={listaUtensilios}
keyExtractor={(item, index) => index.toString()}
renderItem={({ item }) => (
<View style={styles.toolCard}>
{/* Usamos um ícone padrão, mas os alunos podem personalizar no JSON depois */}
<Text style={styles.toolIcon}>🛠️</Text>
<Text style={styles.toolName}>{item}</Text>
</View>
)}
ListEmptyComponent={
<Text style={styles.emptyText}>Nenhum utensílio específico listado.</Text>
}
/>

<TouchableOpacity
style={styles.button}
onPress={() => navigation.navigate('Passo a Passo', { receitaCompleta })}>
<Text style={styles.buttonText}>Ir para o Passo a Passo 👨‍🍳</Text>
</TouchableOpacity>
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, padding: 20, backgroundColor: '#fff' },
title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
toolCard: {
flexDirection: 'row',
alignItems: 'center',
padding: 15,
backgroundColor: '#f5f5f5',
borderRadius: 12,
marginBottom: 10,
borderWidth: 1,
borderColor: '#eee'
},
toolIcon: { fontSize: 24, marginRight: 15 },
toolName: { fontSize: 18, color: '#444' },
emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
button: {
backgroundColor: '#f4511e',
padding: 18,
borderRadius: 12,
marginTop: 20,
elevation: 3
},
buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});