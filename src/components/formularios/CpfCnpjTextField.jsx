import React, { useState } from "react";
import { TextField } from "@mui/material";

const CpfCnpjTextField = ({ value, onChange }) => {
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        let input = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

        if (input.length > 14) {
            return;
        }

        let formattedValue = input;
        if (input.length <= 11) {
            // CPF: 000.000.000-00
            formattedValue = input
                .replace(/^(\d{3})(\d)/, "$1.$2")
                .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1-$2");
        } else {
            // CNPJ: 00.000.000/0000-00
            formattedValue = input
                .replace(/^(\d{2})(\d)/, "$1.$2")
                .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
                .replace(/\.(\d{3})(\d)/, ".$1/$2")
                .replace(/(\d{4})(\d)/, "$1-$2");
        }

        onChange(formattedValue);

        // Validação
        if (input.length < 11) {
            setError("CPF incompleto");
        } else if (input.length > 11 && input.length < 14) {
            setError("CNPJ incompleto");
        } else {
            setError("");
        }
    };

    return (
        <TextField
            fullWidth
            label="CPF/CNPJ"
            variant="outlined"
            size="small"
            value={value}
            onChange={handleInputChange}
            error={!!error}
            helperText={error}
        />
    );
};

export default CpfCnpjTextField;
