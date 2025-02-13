import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const SelectProdutor = ({ value, onChange }) => {
    const [produtores, setProdutores] = useState([]);

    useEffect(() => {
        const fetchProdutores = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/registro/produtor/get-produtor-all`);

                if (response.data.isSuccess && Array.isArray(response.data.return)) {
                    setProdutores(response.data.return);
                } else {
                    setProdutores([]);
                }
            } catch (error) {
                console.error("Erro ao buscar produtores:", error);
                setProdutores([]);
            }
        };

        fetchProdutores();
    }, []);

    return (
        <FormControl fullWidth size="small">
            <InputLabel>Produtor</InputLabel>
            <Select value={value} onChange={onChange} label="Produtor">
                <MenuItem value="">
                    <em>Selecione um produtor</em>
                </MenuItem>
                {produtores.map((produtor) => (
                    <MenuItem key={produtor.id} value={produtor.id}>
                        {produtor.nome}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectProdutor;
