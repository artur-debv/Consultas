import React, { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";
import { SketchPicker } from "react-color";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Alert,
  Popover,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const Configuracao = () => {
  const [open, setOpen] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState({});
  const [colors, setColors] = useState({});
  const [logos, setLogos] = useState({ large: null, small: null });
  const [proprietarios, setProprietarios] = useState([]);
  const [selectedProprietario, setSelectedProprietario] = useState("");
  const [sidebarColor, setSidebarColor] = useState("");
  const [ButtonColor, SetButtonColor] = useState("")
  const handleColorChange = (color, key) => {
    setColors((prev) => ({ ...prev, [key]: color.hex }));
    setFormData((prev) => ({
      ...prev,
      corPrimaria: key === "page" ? color.hex : prev.corPrimaria,
      corSecundaria: key === "button" ? color.hex : prev.corSecundaria,
    }));
  };

  const toggleColorPicker = (event, key) => setColorPickerOpen({ [key]: !colorPickerOpen[key], anchor: event.currentTarget });
  const handleClosePopover = () => setColorPickerOpen({});
  const handleLogoChange = (event, key) => {
    const file = event.target.files[0];

    if (!file) {
      console.error("Nenhum arquivo foi selecionado.");
      return;
    }

    setLogos((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    logo: "",
    logoMinizada: "",
    corPrimaria: "",
    corSecundaria: ""
  });

  useEffect(() => {
    const fetchProprietarios = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/registro/proprietario/get-proprietario-all`);
        console.log("Resposta da API:", response.data);

        if (response.data.isSuccess && Array.isArray(response.data.return)) {
          setProprietarios(response.data.return);
        } else {
          setProprietarios([]);
        }
        if (response.data.corPrimaria) {
          setSidebarColor(response.data.corPrimaria);
        }
        if(response.data.corSecundaria){
          SetButtonColor(response.data.corSecundaria)
        }
      } catch (error) {
        console.error("Erro ao buscar proprietários:", error);
        setProprietarios([]);
      }
    };

    fetchProprietarios();
  }, []);

  const handleProprietarioChange = (e) => {
    setSelectedProprietario(e.target.value);
  };

  const handleReset = async () => {
    setSidebarColor("#121212");
  };

  const handleSave = async () => {
  setErrorMessage("");
  setSuccessMessage("");

  const formattedData = {
    proprietarioId: selectedProprietario,
    logo: "string",
    logoMinizada: "string",
    corPrimaria: formData.corPrimaria,
    corSecundaria: formData.corSecundaria
  };

  try {
    const response = await axios.post(
      `${API_BASE_URL}/Configuracao/new-configuracao`,
      formattedData
    );

    if (response.status === 200) {
      setSuccessMessage("Dados salvos com sucesso!");

      // Atualizar a cor da sidebar sem recarregar a página
      setSidebarColor(formData.corPrimaria); // Atualiza a cor da sidebar
      SetButtonColor(formData.corSecundaria)
    } else {
      setErrorMessage("Ocorreu um erro ao salvar os dados.");
    }
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    setErrorMessage("Ocorreu um erro ao salvar os dados.");
  }
};

  const isLight = (hex) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return (r * 299 + g * 587 + b * 114) / 1000 > 100;
  };

  const renderColorPicker = (label, key) => (
    <Box key={key} sx={{ width: "100%" }}>
      {isLight(colors[key] || "#000000") && <Typography color="error" variant="body2">Essa cor é muito clara!</Typography>}
      <TextField
        onChange={handleColorChange}
        label={label}
        value={colors[key] || ""}
        fullWidth
        margin="normal"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <ButtonStyled onClick={(event) => toggleColorPicker(event, key)}>
                  Selecionar Cor
                </ButtonStyled>
              </InputAdornment>
            ),
          },
        }}
      />
      <Popover open={colorPickerOpen[key]} anchorEl={colorPickerOpen.anchor} onClose={handleClosePopover} anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <SketchPicker color={colors[key]} onChangeComplete={(color) => handleColorChange(color, key)} />
        </Box>
      </Popover>
    </Box>
  );

  const renderLogoUploader = (label, key) => (
    <Box key={key} sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6">{label}</Typography>
      <label htmlFor={`upload-${key}-logo`}>
        <input id={`upload-${key}-logo`} type="file" accept="image/*" style={{ display: "none" }} onChange={(event) => handleLogoChange(event, key)} />
        <ButtonStyled component="span">Escolher Logo</ButtonStyled>
      </label>
      {logos[key] && <img src={logos[key]} alt={`Logo ${label}`} width="100%" style={{ marginTop: 8, maxWidth: "200px" }} />}
    </Box>
  );

  return (
    <MainLayout open={open} toggleDrawer={() => setOpen(!open)} sidebarColor={sidebarColor}> {/* Passando a cor da sidebar para o layout */}
      <Box sx={{ padding: 3, display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography variant="h6">Configurações</Typography>
        <Box>
          <FormControl fullWidth size="small">
            <InputLabel>Proprietário</InputLabel>
            <Select
              value={selectedProprietario}
              onChange={handleProprietarioChange}
              label="Proprietário"
            >
              <MenuItem value="">
                <em>Selecione um proprietário</em>
              </MenuItem>
              {Array.isArray(proprietarios) && proprietarios.map((proprietario) => (
                <MenuItem key={proprietario.id} value={proprietario.id}>
                  {proprietario.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", flexDirection: { xs: "column" }, gap: 2 }}>
          {renderColorPicker("Page", "page")}
          {renderColorPicker("Button", "button")}
        </Box>

        <Box sx={{ display: "flex", flexDirection: { xs: "column" }, gap: 2 }}>
          {renderLogoUploader("Logo Grande", "large")}
          {renderLogoUploader("Logo Pequena", "small")}
        </Box>

        <Box sx={{ mx: { xs: 2, sm: 3 } }}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Box>

        <Box sx={{
          display: "flex", justifyContent: "end", gap: 2, flexWrap: "wrap",
          flexDirection: { xs: "column" },
          "@media (min-width:600px)": { flexDirection: "row" }
        }}>
          <ButtonStyled onClick={handleSave} ButtonColor={ButtonColor}>Salvar configurações</ButtonStyled>
          <ButtonStyled variant="outlined" color="secondary" onClick={handleReset}>Resetar</ButtonStyled>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default Configuracao;
