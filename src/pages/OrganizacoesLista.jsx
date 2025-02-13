import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography,
    Breadcrumbs,
    Link,
    Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";

const OrganizacoesLista = () => {
    const navigate = useNavigate();
    const [organizacoes, setOrganizacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchOrganizacoes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/registro/organizacao/get-organizacao-all`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar organizações");
                }
                const data = await response.json();
                setOrganizacoes(Array.isArray(data.return) ? data.return : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizacoes();
    }, []);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <MainLayout open={open} toggleDrawer={() => setOpen(!open)}>
            <Box sx={{
                mb: 3,
                px: { xs: '20px', md: '0px' },
                marginTop: { xs: '20px', md: '0px' }
            }}>

                <Breadcrumbs>
                    <Link
                        underline="hover"
                        color="inherit"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/dashboard")}
                    >
                        Início
                    </Link>
                    <Typography color="text.primary">Organizações</Typography>
                </Breadcrumbs>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: { xs: 2, md: 3 },
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 2,
                }}
            >
                <Typography variant="h5" sx={{ mt: 1 }}>
                    Lista de Organizações
                </Typography>
                <ButtonStyled onClick={() => navigate("/organizacoes/nova-organizacao")}>
                    Adicionar Organização
                </ButtonStyled>
            </Box>

            <Box sx={{ px: { xs: 2, md: 3 } }}>
                {loading && <Typography>Carregando organizações...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
            </Box>

            {!loading && !error && (
                <Box sx={{ px: { xs: 2, md: 3 }, overflowX: "auto" }}>
                    <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        Nome
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        CNPJ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        Cidade
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        Estado
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {organizacoes.length > 0 ? (
                                    organizacoes.map((org, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontSize: { xs: '9px', md: '0.875rem' } }}>{org.nome}</TableCell>
                                            <TableCell sx={{ fontSize: { xs: '9px', md: '0.875rem' } }}>{org.cnpj}</TableCell>
                                            <TableCell sx={{ fontSize: { xs: '9px', md: '0.875rem' } }}>{org.cidade}</TableCell>
                                            <TableCell sx={{ fontSize: { xs: '9px', md: '0.875rem' } }}>{org.estado}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Typography>Nenhuma organização encontrada.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </MainLayout >
    );
};

export default OrganizacoesLista;
