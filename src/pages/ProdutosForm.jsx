import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    Breadcrumbs,
    Link,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";
import DialogoConfirmacaoSaida from "../components/formularios/DialogoConfirmacaoSaida";
import SelectOrganizacao from "../components/formularios/SelectOrganizacao";
import axios from "axios";

const ProdutosForm = () => {
    const [open, setOpen] = useState(false);
    const [selectedOrganizacao, setSelectedOrganizacao] = useState("");
    const [formData, setFormData] = useState({
        codOriginalProduto: "",
        descricao: "",
        unidadeMedida: "",
        classe: "",
        ph: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        const formattedData = {
            CpfCnpj: selectedOrganizacao,
            CodOriginalProduto: formData.codOriginalProduto,
            Descricao: formData.descricao,
            UnidadeMedida: formData.unidadeMedida,
            Classe: formData.classe,
            Ph: parseInt(formData.ph) || 0,
        };

        try {
            const response = await axios.post(
                `${API_BASE_URL}/registro/produto/new-produto`,
                formattedData
            );

            if (response.status === 200) {
                setSuccessMessage("Produto salvo com sucesso!");
                setTimeout(() => {
                    navigate("/produtos");
                }, 1000);
            } else {
                setErrorMessage("Ocorreu um erro ao salvar o produto.");
            }
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            setErrorMessage("Ocorreu um erro ao salvar o produto.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOrganizacaoChange = (e) => {
        setSelectedOrganizacao(e.target.value);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleExit = () => {
        console.log("Usuário confirmou a saída");
        setOpenDialog(false);
        navigate("/produtos");
    };

    return (
        <MainLayout open={open} toggleDrawer={() => setOpen(!open)}>
            <Box sx={{ mb: 3, marginTop: { xs: '20px', md: '0px' } }}>
                <Breadcrumbs>
                    <Link underline="none" color="inherit" sx={{ cursor: "default" }} >Início</Link>
                    <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }} onClick={() => setOpenDialog(true)}>Produtos</Link>
                    <Typography color="text.primary">Novo Produto</Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mx: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }}>
                    Dados do Produto
                </Typography>
            </Box>

            <Box sx={{ mx: 3, mt: 3 }}>
                <SelectOrganizacao value={selectedOrganizacao} onChange={handleOrganizacaoChange} />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    m: { xs: 2, sm: 3 },
                }}
            >
                <TextField
                    fullWidth
                    label="Código Original"
                    variant="outlined"
                    size="small"
                    name="codOriginalProduto"
                    value={formData.codOriginalProduto}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)" } }}
                />
                <TextField
                    fullWidth
                    label="Descrição"
                    variant="outlined"
                    size="small"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)" } }}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    m: { xs: 2, sm: 3 },
                }}
            >
                <TextField
                    fullWidth
                    label="Unidade de Medida"
                    variant="outlined"
                    size="small"
                    name="unidadeMedida"
                    value={formData.unidadeMedida}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)" } }}
                />
                <TextField
                    fullWidth
                    label="Classe"
                    variant="outlined"
                    size="small"
                    name="classe"
                    value={formData.classe}
                    onChange={handleChange}
                    type="number"
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)" } }}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    m: { xs: 2, sm: 3 },
                }}
            >
                <TextField
                    fullWidth
                    label="pH"
                    variant="outlined"
                    size="small"
                    name="ph"
                    value={formData.ph}
                    onChange={handleChange}
                    type="number"
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(50% - 16px)" } }}
                />
            </Box>

            <Box sx={{ mx: { xs: 2, sm: 3 } }}>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4, mr: { xs: 2, sm: 3 } }}>
                <ButtonStyled variant="outlined" color="secondary" onClick={() => setOpenDialog(true)}>
                    Cancelar
                </ButtonStyled>
                <ButtonStyled onClick={handleSave}>Salvar</ButtonStyled>
            </Box>

            <DialogoConfirmacaoSaida
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={handleExit}
            />
        </MainLayout>
    );
};

export default ProdutosForm;
