import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export default function StepsScreen({ route, navigation }) {
const { receitaCompleta } = route.params || {};
const [mostrarVideo, setMostrarVideo] = useState(false);

// Agora passos é um objeto. Se for um array antigo, evitamos erro com o || {}
const passosObjeto = receitaCompleta?.passos || {};

return (
<View style={styles.outerContainer}>
<ScrollView
style={styles.scrollView}
contentContainerStyle={styles.scrollContent}
scrollEnabled={true}
alwaysBounceVertical={true}
showsVerticalScrollIndicator={true}
>
<Text style={styles.title}>Preparando {receitaCompleta?.nome}</Text>

{receitaCompleta?.videoUrl && (
<TouchableOpacity style={styles.videoButton} onPress={() => setMostrarVideo(!mostrarVideo)}>
<Text style={styles.buttonText}>
{mostrarVideo ? "🔼 Fechar Vídeo" : "🎥 Assistir Modo de Preparo"}
</Text>
</TouchableOpacity>
)}

{mostrarVideo && (
<View style={styles.videoWrapper}>
<Video
source={{ uri: receitaCompleta.videoUrl }}
style={styles.video}
videoStyle={{ width: '100%', height: '100%' }}
useNativeControls
resizeMode={ResizeMode.CONTAIN}
isMuted={false}
shouldPlay={false}
/>
</View>
)}

{/* Lógica para mapear as categorias de passos (Massa, Recheio, etc) */}
{Object.entries(passosObjeto).map(([categoria, listaDePassos]) => (
<View key={categoria} style={styles.sectionContainer}>
{/* Título da Categoria do Passo (ex: MODO DE PREPARO: MASSA) */}
<View style={styles.categoryBadge}>
<Text style={styles.categoryBadgeText}>{categoria}</Text>
</View>

{listaDePassos.map((passo, index) => (
<View key={`${categoria}-${index}`} style={styles.stepCard}>
<Text style={styles.stepNum}>PASSO {index + 1}</Text>
<Text style={styles.stepText}>{passo}</Text>
</View>
))}
</View>
))}

<TouchableOpacity style={styles.homeButton} onPress={() => navigation.popToTop()}>
<Text style={styles.buttonText}>Finalizar e Voltar ✨</Text>
</TouchableOpacity>
</ScrollView>
</View>
);
}

const styles = StyleSheet.create({
outerContainer: {
flex: 1,
backgroundColor: '#fff',
height: Platform.OS === 'web' ? '100vh' : '100%',
overflow: 'hidden',
},
scrollView: {
flex: 1,
overflowY: Platform.OS === 'web' ? 'auto' : 'scroll',
WebkitOverflowScrolling: 'touch',
},
scrollContent: {
padding: 20,
flexGrow: 1,
paddingBottom: 80,
minHeight: '100%',
},
title: { fontSize: 24, fontWeight: 'bold', color: '#f4511e', marginBottom: 20 },
videoButton: { backgroundColor: '#326696', padding: 15, borderRadius: 12, marginBottom: 20 },
videoWrapper: { width: '100%', aspectRatio: 16 / 9, backgroundColor: '#000', borderRadius: 15, overflow: 'hidden', marginBottom: 25 },
video: { flex: 1 },

// Estilos para as categorias de passos
sectionContainer: { marginBottom: 30 },
categoryBadge: {
backgroundColor: '#326696', // Verde para diferenciar dos ingredientes
paddingVertical: 6,
paddingHorizontal: 15,
borderRadius: 8,
marginBottom: 15,
alignSelf: 'flex-start'
},
categoryBadgeText: { color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 14 },

stepCard: {
padding: 18,
backgroundColor: '#D0DBF5',
borderRadius: 12,
marginBottom: 15,
borderLeftWidth: 6,
borderLeftColor: '#326696'
},
stepNum: { fontSize: 12, fontWeight: 'bold', color: '#f4511e', marginBottom: 4 },
stepText: { fontSize: 17, color: '#333', lineHeight: 24 },

homeButton: { backgroundColor: '#326696', padding: 20, borderRadius: 15, marginTop: 20, marginBottom: 40 },
buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }
});