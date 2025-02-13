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

const ProdutosLista = () => {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/registro/produto/get-produto-all`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }
                const data = await response.json();
                setProdutos(Array.isArray(data.return) ? data.return : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutos();
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
                    <Typography color="text.primary">Produtos</Typography>
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
                    Lista de Produtos
                </Typography>
                <ButtonStyled onClick={() => navigate("/produtos/novo-produto")}>
                    Adicionar Produto
                </ButtonStyled>
            </Box>

            <Box sx={{ px: { xs: 2, md: 3 } }}>
                {loading && <Typography>Carregando produtos...</Typography>}
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
                                        Código Original
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        Descrição
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        Unidade de Medida
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        Classe
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: '9px', md: '0.875rem' }
                                        }}
                                    >
                                        pH
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {produtos.length > 0 ? (
                                    produtos.map((produto, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{produto.codOriginalProduto}</TableCell>
                                            <TableCell>{produto.descricao}</TableCell>
                                            <TableCell>{produto.unidadeMedida}</TableCell>
                                            <TableCell>{produto.classe}</TableCell>
                                            <TableCell>{produto.ph}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            <Typography>Nenhum produto encontrado.</Typography>
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

export default ProdutosLista;
