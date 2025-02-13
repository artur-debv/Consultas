import React, { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Typography,
    Breadcrumbs,
    Link,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";
import DialogoConfirmacaoSaida from "../components/formularios/DialogoConfirmacaoSaida";
import SelectProprietario from "../components/formularios/SelectProprietario";
import CpfCnpjTextField from "../components/formularios/CpfCnpjTextField";
import axios from "axios";

const ProdutoresForm = () => {
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [inscricoes, setInscricoes] = useState([]);
    const [selectedProprietario, setSelectedProprietario] = useState("");
    const [inscricaoEstadual, setinscricaoEstadual] = useState("");
    const [cepInscricao, setCepInscricao] = useState("");
    const [estadoInscricao, setEstadoInscricao] = useState("");
    const [municipioInscricao, setMunicipioInscricao] = useState("");
    const [cidadeInscricao, setCidadeInscricao] = useState("");
    const [numeroInscricao, setNumeroInscricao] = useState("");
    const [enderecoInscricao, setEnderecoInscricao] = useState("");
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();
    
    const handleSave = async () => {
        console.log("Iniciando cadastro do produtor...");

        const dadosEnvio = {
            ProprietarioId: selectedProprietario,
            Nome: nome,
            CpfCnpj: cnpj,
            Email: email,
            Inscricoes: inscricoes,
        };

        console.log("Dados enviados para criação do produtor:", dadosEnvio);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/registro/produtor/new-produtor`,
                dadosEnvio,
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Resposta da criação do produtor:", response.data);

            if (response.data.isSuccess) {
                console.log("Buscando ID do produtor recém-criado...");

                const getResponse = await axios.get(
                    `${API_BASE_URL}/registro/produtor/get-produtor-all`
                );

                console.log("Resposta da busca de produtores:", getResponse.data);

                if (getResponse.data.isSuccess && Array.isArray(getResponse.data.return)) {
                    const produtorEncontrado = getResponse.data.return.find(produtor => produtor.cpfCnpj === cnpj);

                    if (produtorEncontrado && produtorEncontrado.id) {
                        const produtorId = produtorEncontrado.id;
                        console.log("Produtor encontrado. ID:", produtorId);

                        const promises = inscricoes.map((inscricao, index) => {
                            console.log(`Enviando inscrição estadual ${index + 1}:`, inscricao);
                            return axios.post(
                                `${API_BASE_URL}/registro/produtor/new-inscricaoEstadual`,
                                {
                                    ProdutorId: produtorId,
                                    numeroIe: inscricao.numeroIe,
                                    endereco: inscricao.endereco,
                                    numero: inscricao.numero,
                                    municipio: inscricao.municipio,
                                    cep: inscricao.cep,
                                    cidade: inscricao.cidade,
                                    estado: inscricao.estado,
                                },
                                { headers: { "Content-Type": "application/json" } }
                            ).then(response => {
                                console.log(`Resposta da inscrição estadual ${index + 1}:`, response.data);
                            }).catch(error => {
                                console.error(`Erro ao cadastrar inscrição estadual ${index + 1}:`, error.message, error.response?.data || error);
                            });
                        });

                        await Promise.all(promises);
                        console.log("Todas as inscrições estaduais foram cadastradas com sucesso!");

                        navigate("/produtores");
                    } else {
                        console.error("Erro: Não foi possível encontrar o produtor pelo CPF/CNPJ cadastrado.");
                    }
                } else {
                    console.error("Erro ao buscar produtores cadastrados.", getResponse.data);
                }
            } else {
                console.error("Erro ao criar produtor:", response.data);
            }
        } catch (error) {
            console.error("Erro ao salvar dados:", error.message, error.response?.data || error);
        }
    };


    const handleRemoveInscricao = (index) => {
        setInscricoes(inscricoes.filter((_, i) => i !== index));
    };

    const handleAddInscricao = () => {
        const novaInscricao = {
            numeroIe: inscricaoEstadual,
            endereco: enderecoInscricao,
            numero: numeroInscricao,
            municipio: municipioInscricao,
            cep: cepInscricao,
            cidade: cidadeInscricao,
            estado: estadoInscricao,
        };
        setInscricoes((prevInscricoes) => [...prevInscricoes, novaInscricao]);

        setinscricaoEstadual("");
        setCepInscricao("");
        setEstadoInscricao("");
        setMunicipioInscricao("");
        setCidadeInscricao("");
        setNumeroInscricao("");
        setEnderecoInscricao("");
    };

    const handleProprietarioChange = (e) => {
        setSelectedProprietario(e.target.value);
    };

    const handleExit = () => {
        console.log("Usuário confirmou a saída");
        setOpenDialog(false);
        navigate("/produtores");
    };

    const validarEmail = (email) => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return "O e-mail é obrigatório.";
        } else if (!regexEmail.test(email)) {
            return "Digite um e-mail válido.";
        }
        return "";
    };
    
    return (
        <MainLayout open={open} toggleDrawer={() => setOpen(!open)}>
            <Box sx={{ mb: 3, marginTop: { xs: '20px', md: '0px' } }}>
                <Breadcrumbs>
                    <Link underline="none" color="inherit" sx={{ cursor: "default" }} >
                        Início
                    </Link>
                    <Link underline="hover" color="inherit" sx={{ cursor: "pointer" }} onClick={() => setOpenDialog(true)}>
                        Produtores
                    </Link>
                    <Typography color="text.primary">Novo Produtor</Typography>
                </Breadcrumbs>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mx: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }}>
                    Dados do Produtor
                </Typography>
            </Box>

            <Box sx={{ mx: 3, mt: 3 }}>
                <SelectProprietario value={selectedProprietario} onChange={handleProprietarioChange} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, m: 3 }}>
                <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    size="small"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <CpfCnpjTextField value={cnpj} onChange={setCnpj} />
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    size="small"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(validarEmail(e.target.value)); 
                    }}
                    onBlur={() => setEmailError(validarEmail(email))} 
                    error={!!emailError} 
                    helperText={emailError} 
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mx: 3 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 3 }}>
                    Inscrição Estadual
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, m: 3 }}>
                <TextField fullWidth label="Número da Inscrição" variant="outlined" size="small" value={inscricaoEstadual} onChange={(e) => setinscricaoEstadual(e.target.value)} />
                <TextField fullWidth label="CEP" variant="outlined" size="small" value={cepInscricao} onChange={(e) => setCepInscricao(e.target.value)} />
                <TextField fullWidth label="Estado" variant="outlined" size="small" value={estadoInscricao} onChange={(e) => setEstadoInscricao(e.target.value)} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, m: 3 }}>
                <TextField fullWidth label="Município" variant="outlined" size="small" value={municipioInscricao} onChange={(e) => setMunicipioInscricao(e.target.value)} />
                <TextField fullWidth label="Cidade" variant="outlined" size="small" value={cidadeInscricao} onChange={(e) => setCidadeInscricao(e.target.value)} />
                <TextField fullWidth label="Número" variant="outlined" size="small" value={numeroInscricao} onChange={(e) => setNumeroInscricao(e.target.value)} />
                <TextField fullWidth label="Endereço" variant="outlined" size="small" value={enderecoInscricao} onChange={(e) => setEnderecoInscricao(e.target.value)} />
            </Box>

            <Box sx={{ m: 3 }}>
                <ButtonStyled onClick={handleAddInscricao}>Adicionar Inscrição</ButtonStyled>
            </Box>

            <Box sx={{ m: 3 }}>
                <Typography variant="h6" fontWeight="bold">Inscrições Adicionadas</Typography>
                <List>
                    {inscricoes.map((inscricao, index) => (
                        <ListItem key={index} secondaryAction={
                            <ButtonStyled color="error" onClick={() => handleRemoveInscricao(index)}>
                                Remover
                            </ButtonStyled>
                        }>
                            <ListItemText primary={`IE: ${inscricao.numeroIe} - CEP: ${inscricao.cep} - 
                            Estado: ${inscricao.estado} - Municipio: ${inscricao.municipio} - Cidade: ${inscricao.cidade}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4, mr: 3 }}>
                <ButtonStyled variant="outlined" color="secondary" onClick={() => setOpenDialog(true)}>Cancelar</ButtonStyled>
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

export default ProdutoresForm;