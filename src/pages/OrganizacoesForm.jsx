import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    Breadcrumbs,
    Link,
    Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";
import DialogoConfirmacaoSaida from "../components/formularios/DialogoConfirmacaoSaida";
import SelectProprietario from "../components/formularios/SelectProprietario";
import CpfCnpjTextField from "../components/formularios/CpfCnpjTextField"; 

import axios from "axios";

const OrganizacoesForm = () => {
    const [open, setOpen] = useState(false);
    const [selectedProprietario, setSelectedProprietario] = useState("");
    const [formData, setFormData] = useState({
        nome: "",
        cnpj: "",
        inscricaoEstadual: "",
        cep: "",
        estado: "",
        municipio: "",
        cidade: "",
        endereco: "",
        numero: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleSave = async () => {
        setErrorMessage("");
        setSuccessMessage("");

        const formattedData = {
            proprietarioId: selectedProprietario,
            nome: formData.nome,
            cnpj: formData.cnpj,
            inscricaoEstadual: formData.inscricaoEstadual,
            cep: parseInt(formData.cep) || 0,
            cidade: formData.cidade,
            estado: formData.estado,
            municipio: formData.municipio,
            endereco: formData.endereco,
            numero: parseInt(formData.numero) || 0,
        };

        try {
            const response = await axios.post(
                `${API_BASE_URL}/registro/organizacao/new-organizacao`,
                formattedData
            );
            if (response.status === 200) {
                setSuccessMessage("Dados salvos com sucesso!");
                setTimeout(() => {
                    navigate("/organizacoes");
                }, 1000);
            } else {
                setErrorMessage("Ocorreu um erro ao salvar os dados.");
            }
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            setErrorMessage("Ocorreu um erro ao salvar os dados.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProprietarioChange = (e) => {
        setSelectedProprietario(e.target.value);
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleExit = () => {
        console.log("Usuário confirmou a saída");
        setOpenDialog(false);
        navigate("/organizacoes");
    };

    return (
        <MainLayout open={open} toggleDrawer={() => setOpen(!open)}>
            <Box sx={{ mb: 3, marginTop: { xs: '20px', md: '0px' } }}>
                <Breadcrumbs>
                    <Link underline="none" color="inherit" sx={{ cursor: "default" }} >Início</Link>
                    <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }} onClick={() => setOpenDialog(true)}>Organizações</Link>
                    <Typography color="text.primary">Nova Organização</Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mx: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }}>
                    Dados da Organização
                </Typography>
            </Box>

            <Box sx={{ mx: 3, mt: 3 }}>
                <SelectProprietario value={selectedProprietario} onChange={handleProprietarioChange} />
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
                    label="Nome"
                    variant="outlined"
                    size="small"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
                />
                <CpfCnpjTextField
                    value={formData.cnpj}
                    onChange={(formattedValue) => setFormData({ ...formData, cnpj: formattedValue })}
                />
                <TextField
                    fullWidth
                    label="Inscrição Estadual"
                    variant="outlined"
                    size="small"
                    name="inscricaoEstadual"
                    value={formData.inscricaoEstadual}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
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
                    label="CEP"
                    variant="outlined"
                    size="small"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
                />
                <TextField
                    fullWidth
                    label="Estado"
                    variant="outlined"
                    size="small"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
                />
                <TextField
                    fullWidth
                    label="Municipio"
                    variant="outlined"
                    size="small"
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
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
                    label="Cidade"
                    variant="outlined"
                    size="small"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
                />
                <TextField
                    fullWidth
                    label="Endereço"
                    variant="outlined"
                    size="small"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
                />
                <TextField
                    fullWidth
                    label="Número"
                    variant="outlined"
                    size="small"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                    sx={{ flex: { xs: "1 1 100%", sm: "1 1 calc(33% - 16px)" } }}
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

export default OrganizacoesForm;