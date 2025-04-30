import React, { useState } from "react";
import { Button, TextInput, View } from 'react-native';

interface CarroFormularioProps extends ParamListBase {
    onGravar: (ano: number, placa: string, modelo: string) => void
}

const CarroFormulario = (props: CarroFormularioProps) => {
    const [ano, setAno] = useState<string>("2025");
    const [placa, setPlaca] = useState<string>("");
    const [modelo, setModelo] = useState<string>("");
    return (
        <View style={{ flex: 1 }}>
            <TextInput value={ano} onChangeText={setAno} placeholder="Ano" />
            <TextInput value={placa} onChangeText={setPlaca} placeholder="Placa" />
            <TextInput value={modelo} onChangeText={setModelo} placeholder="Modelo" />
            <Button title="GRAVAR" onPress={() => {
                props.onGravar(parseInt(ano), placa, modelo);
            }} />
        </View>
    )
}

export { CarroFormulario };
