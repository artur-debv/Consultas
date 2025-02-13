import React, { useState } from "react";
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
  Box,
  Typography,
} from "@mui/material";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";

const Movimentos = () => {
  const [open, setOpen] = useState(false);
  const [selectedInscricao, setSelectedInscricao] = useState("");
  const [movimentos, setMovimentos] = useState([
    { codigo: "001", descricao: "Compra de Mercadorias", valor: 300 },
    { codigo: "002", descricao: "Venda de Produtos", valor: 800 },
    { codigo: "003", descricao: "Devolução de Mercadorias", valor: -100 },
  ]);

  const inscricoesEstaduais = ["Inscrição 1", "Inscrição 2", "Inscrição 3"];

  const handleInscricaoChange = (event) => {
    setSelectedInscricao(event.target.value);
  };

  const handleConsulta = () => {
    console.log("Consulta realizada para:", selectedInscricao);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <MainLayout open={open} toggleDrawer={toggleDrawer}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ mt: 3 }}>
          Consulta de Movimentos - {selectedInscricao || "Nenhuma inscrição selecionada"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", mb: 3 }}>
        <FormControl sx={{ minWidth: 200, mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }} size="small">
          <InputLabel id="inscricao-select-label">Inscrição Estadual</InputLabel>
          <Select
            labelId="inscricao-select-label"
            value={selectedInscricao}
            onChange={handleInscricaoChange}
          >
            {inscricoesEstaduais.map((inscricao, index) => (
              <MenuItem key={index} value={inscricao}>
                {inscricao}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <ButtonStyled onClick={handleConsulta}>Consultar</ButtonStyled>
      </Box>

      <Box sx={{ overflowX: "auto" }}>
        <TableContainer sx={{ maxWidth: "100%" }}>
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
                  Código do Movimento
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
                  Valor
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movimentos.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.codigo}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>{item.valor}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </MainLayout>
  );
};

export default Movimentos;
