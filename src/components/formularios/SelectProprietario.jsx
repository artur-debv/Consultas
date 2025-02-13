import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const SelectProprietario = ({ value, onChange }) => {
    const [proprietarios, setProprietarios] = useState([]);

    useEffect(() => {
        const fetchProprietarios = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/registro/proprietario/get-proprietario-all`);
                
                if (response.data.isSuccess && Array.isArray(response.data.return)) {
                    setProprietarios(response.data.return);
                } else {
                    setProprietarios([]);
                }
            } catch (error) {
                console.error("Erro ao buscar proprietários:", error);
                setProprietarios([]);
            }
        };

        fetchProprietarios();
    }, []);

    return (
        <FormControl fullWidth size="small">
            <InputLabel>Proprietário</InputLabel>
            <Select value={value} onChange={onChange} label="Proprietário">
                <MenuItem value="">
                    <em>Selecione um proprietário</em>
                </MenuItem>
                {proprietarios.map((proprietario) => (
                    <MenuItem key={proprietario.id} value={proprietario.id}>
                        {proprietario.nome}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectProprietario;
