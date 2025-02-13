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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProdutoresLista = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [produtores, setProdutores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchProdutores = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/registro/produtor/get-produtor-all`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtores");
                }
                const data = await response.json();

                setProdutores(Array.isArray(data.return) ? data.return : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProdutores();
    }, []);


    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este produtor?")) return;
    
        try {
            const response = await fetch(`${API_BASE_URL}/registro/produtor/delete-produtor/${id}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                throw new Error("Erro ao deletar produtor.");
            }
    
            setProdutores((prevProdutores) => prevProdutores.filter((produtor) => produtor.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <MainLayout open={open} toggleDrawer={() => setOpen(!open)}>
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
                    <Typography color="text.primary">Produtores</Typography>
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
                    Lista de Produtores
                </Typography>
                <ButtonStyled onClick={() => navigate("/produtores/novo-produtor")}>
                    Adicionar Produtor
                </ButtonStyled>
            </Box>

            <Box sx={{ px: { xs: 2, md: 3 } }}>
                {loading && <Typography>Carregando produtores...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
            </Box>

            {!loading && !error && (
                <Box sx={{ px: { xs: 2, md: 3 }, overflowX: "auto" }}>
                    <TableContainer
                        component={Paper}
                        sx={{
                            maxWidth: "100%",
                            maxHeight: isMobile ? "400px" : "none",
                            overflow: isMobile ? "auto" : "visible"
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: "8px", md: "0.875rem" },
                                        }}
                                    >
                                        Nome
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: "8px", md: "0.875rem" },
                                        }}
                                    >
                                        CPF/CNPJ
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: "8px", md: "0.875rem" },
                                        }}
                                    >
                                        E-mail
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: "8px", md: "0.875rem" },
                                        }}
                                    >
                                        inscrição Estadual
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#121212",
                                            color: "white",
                                            fontWeight: "bold",
                                            fontSize: { xs: "8px", md: "0.875rem" },
                                        }}
                                    >
                                        Edição
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {produtores.length > 0 ? (
                                    produtores.map((produtor, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontSize: { xs: '8px', md: '0.875rem' } }}>
                                                {produtor.nome || "Não informado"}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: '8px', md: '0.875rem' } }}>
                                                {produtor.cpfCnpj || "Não informado"}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    fontSize: { xs: "10px", md: "0.875rem" },
                                                    maxWidth: { xs: "120px", sm: "180px", md: "250px" },
                                                    wordBreak: { xs: "break-word", md: "normal" },
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {produtor.email || "Não informado"}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: '8px', md: '0.875rem' } }}>
                                                <ButtonStyled onClick={() => navigate("/inscricoes")}>
                                                    Verificar Inscrições
                                                </ButtonStyled>
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: '8px', md: '0.875rem' } }}>
                                                <ButtonStyled>
                                                    Editar
                                                </ButtonStyled>
                                                <ButtonStyled onClick={() => handleDelete(produtor.id)}>
                                                    Deletar
                                                </ButtonStyled>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            <Typography>Nenhum produtor encontrado.</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </MainLayout>
    );
};

export default ProdutoresLista;
