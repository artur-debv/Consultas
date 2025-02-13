import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import axios from "axios";

const ButtonStyled = ({ onClick, children, variant = "contained", color = "primary", ...props }) => {
    const [corSecundaria, setCorSecundaria] = useState("#121212");
    const [newColor, setNewColor] = useState(corSecundaria);

    useEffect(() => {
        const FetchColorButton = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/configuracao/get-configuracao`
                );
                if (response.data.isSuccess && Array.isArray(response.data.return) && response.data.return.length > 0) {
                    const cor = response.data.return[0].corSecundaria || "#121212";
                    setCorSecundaria(cor);
                    setNewColor(cor); // Atualizando diretamente a cor
                }
            } catch (error) {
                console.error("Ocorreu um erro ao pegar a cor salva no banco", error);
            }
        };
        FetchColorButton();
    }, []);

    return (
        <Button
            onClick={onClick}
            variant={variant}
            color={color}
            sx={{
                textTransform: "none",
                borderRadius: "4px",
                px: 4,
                backgroundColor: variant === "contained" ? newColor : "transparent", // Use newColor
                color: variant === "contained" ? "#fff" : color === "secondary" ? "#333333" : "#1976d2",
                borderColor: color === "secondary" ? "#333333" : undefined,
                "&:hover": {
                    backgroundColor: variant === "contained" ? "#121212" : "rgba(0, 0, 0, 0.04)",
                },
            }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ButtonStyled;
