import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function PasswordItem({ data, removePassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLongPress = () => {
        togglePasswordVisibility();
        if (!showPassword) {
            // Navegar para a página de detalhes ao ocultar a senha
            navigation.navigate('PasswordDetails', { password: data });
        }
    };

    return (
        <Pressable onLongPress={handleLongPress} style={styles.container}>
            <Text style={styles.text}>
                {showPassword ? data : '••••••••'} {/* Mostrar senha ou pontos se oculta */}
            </Text>
            <View style={styles.iconsContainer}>
                <FontAwesome
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={20}
                    color="#FFF"
                    onPress={togglePasswordVisibility}
                    style={styles.icon}
                />
                <FontAwesome
                    name="trash"
                    size={20}
                    color="red"
                    onPress={() => removePassword(data)}
                />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0e0e0e",
        padding: 14,
        width: "100%",
        marginRight: 10, // Ajuste o valor conforme necessário
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        color: "#FFF",
        flex: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10, // Ajuste o valor conforme necessário
    },
    iconSpacing: {
        width: 10, // Ajuste o valor conforme necessário
        marginRight: 10, // Ajuste o valor conforme necessário
    },
});
