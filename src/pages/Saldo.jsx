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
} from "@mui/material";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";

const Saldo = () => {
  const [open, setOpen] = useState(false);
  const [selectedInscricao, setSelectedInscricao] = useState("");
  const [saldos, setSaldos] = useState([
    { codigo: "001", saldo: 1000 },
    { codigo: "002", saldo: 500 },
    { codigo: "003", saldo: 200 },
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
      <h2>Consulta de Saldo - {selectedInscricao || "Nenhuma inscrição selecionada"}</h2>

      <Box display="flex" alignItems="center" marginBottom={2} flexDirection={{ xs: "column", sm: "row" }}>
        <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }} size="small">
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
        <Box sx={{ marginLeft: { sm: 2 }, marginTop: { xs: 2, sm: 0 } }}>
          <ButtonStyled onClick={handleConsulta}>
            Consultar
          </ButtonStyled>
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}
              >
                Código do Tipo do Produto
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#121212", color: "white", fontWeight: "bold" }}
              >
                Saldo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saldos.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.saldo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default Saldo;
