import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Breadcrumbs,
    Link,
    Box,
    Typography,
    Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";
import SelectProdutor from "../components/formularios/SelectProdutor";

const InscricoesLista = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [produtorId, setProdutorId] = useState("");
    const [inscricoes, setInscricoes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!produtorId) return;

        const fetchInscricoes = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/registro/produtor/get-inscricaoEstadual-produtorId/${produtorId}`
                );

                if (response.data.isSuccess && Array.isArray(response.data.return)) {
                    setInscricoes(response.data.return);
                } else {
                    setInscricoes([]);
                }
            } catch (err) {
                setError("Erro ao buscar inscrições estaduais");
                setInscricoes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInscricoes();
    }, [produtorId]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <MainLayout open={open} toggleDrawer={toggleDrawer}>
            <Box
                sx={{
                    mb: 3,
                    px: { xs: '20px', md: '0px' },
                    marginTop: { xs: '20px', md: '0px' }
                }}
            >
                <Breadcrumbs>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/dashboard")}
                    >
                        Início
                    </Link>
                    <Typography color="text.primary">Inscrições Estaduais</Typography>
                </Breadcrumbs>
            </Box>

            <Typography variant="h5" sx={{ mb: 2 }}>
                Inscrições Estaduais
            </Typography>

            <Box display="flex" alignItems="center" mb={2} flexDirection={{ xs: "column", sm: "row" }}>
                <SelectProdutor value={produtorId} onChange={(e) => setProdutorId(e.target.value)} />
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                Inscrição Estadual
                            </TableCell>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                Endereço
                            </TableCell>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                Número
                            </TableCell>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                Cidade
                            </TableCell>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                Municipio
                            </TableCell>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                Estado
                            </TableCell>
                            <TableCell sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}>
                                CEP
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={1} align="center">
                                    Carregando...
                                </TableCell>
                            </TableRow>
                        )}
                        {error && (
                            <TableRow>
                                <TableCell colSpan={1} align="center" color="error">
                                    {error}
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && !error && inscricoes.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={1} align="center">
                                    Nenhuma inscrição encontrada.
                                </TableCell>
                            </TableRow>
                        )}
                        {inscricoes.map((inscricao, index) => (
                            <TableRow key={index}>
                                <TableCell>{inscricao.numeroIe}</TableCell>
                                <TableCell>{inscricao.endereco}</TableCell>
                                <TableCell>{inscricao.numero}</TableCell>
                                <TableCell>{inscricao.cidade}</TableCell>
                                <TableCell>{inscricao.municipio}</TableCell>
                                <TableCell>{inscricao.estado}</TableCell>
                                <TableCell>{inscricao.cep}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainLayout>
    );
};

export default InscricoesLista;
