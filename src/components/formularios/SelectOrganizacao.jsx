import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const API_URL = `${API_BASE_URL}/registro/organizacao/get-organizacao-all`;

const SelectOrganizacao = ({ value, onChange }) => {
    const [organizacoes, setOrganizacoes] = useState([]);

    useEffect(() => {
        const fetchOrganizacoes = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/registro/organizacao/get-organizacao-all`);

                if (response.data.isSuccess && Array.isArray(response.data.return)) {
                    setOrganizacoes(response.data.return);
                } else {
                    setOrganizacoes([]);
                }
            } catch (error) {
                console.error("Erro ao buscar organizações:", error);
                setOrganizacoes([]);
            }
        };

        fetchOrganizacoes();
    }, []);

    return (
        <FormControl fullWidth size="small">
            <InputLabel>Organização</InputLabel>
            <Select value={value} onChange={onChange} label="Organização">
                <MenuItem value="">
                    <em>Selecione uma organização</em>
                </MenuItem>
                {organizacoes.map((organizacao) => (
                    <MenuItem key={organizacao.cnpj} value={organizacao.cnpj}>
                        {organizacao.nome}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectOrganizacao;
