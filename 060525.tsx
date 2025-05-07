import axios, { AxiosResponse } from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

interface Contato {
    nome: string
    telefone: string
    email: string
}

export default function App() {
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const [lista, setLista] = useState<Contato[]>([]);
    return (
        <View style={styles.container}>
            <Text>Contatos</Text>
            <StatusBar style="auto" />
            <TextInput value={nome} onChangeText={setNome} placeholder="Nome" />
            <TextInput value={telefone} onChangeText={setTelefone} placeholder="Telefone" />
            <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
            <Button title="Gravar" onPress={() => {
                axios.post("https://tdsr-92053-default-rtdb.firebaseio.com/contatos.json",
                    {
                        nome,
                        telefone,
                        email
                    }
                )
                    .then(() => {
                        Alert.alert("Gravação", "Contato gravado com sucesso");
                    })
                    .catch((erro: any) => {
                        Alert.alert("Gravação", "Erro ao gravar o contato " + erro);
                    })
            }} />

            <Button title="Carregar" onPress={() => {
                axios.get("https://tdsr-92053-default-rtdb.firebaseio.com/contatos.json")
                    .then((info: AxiosResponse<any, any>) => {
                        const listaTemp: Contato[] = [];
                        for (const chave in info.data) {
                            const contato = info.data[chave];
                            listaTemp.push(contato);
                        }
                        setLista(listaTemp);
                        Alert.alert("Contatos", `Foram lidos ${listaTemp.length} contatos`);
                    })
                    .catch((erro: any) => {
                        Alert.alert("Gravação", "Erro ao ler os contatos da base " + erro)
                    })
            }} />

            <FlatList data={lista} renderItem={(itemProps: any) => {
                return (
                    <View style={{
                        backgroundColor: "lightyellow", margin: 20, padding: 10,
                        borderColor: "red", borderWidth: 1, borderRadius: 16
                    }}>
                        <Text>Nome: {itemProps.item.nome}</Text>
                        <Text>Telefone: {itemProps.item.nome}</Text>
                        <Text>Email: {itemProps.item.nome}</Text>
                    </View>
                )
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
