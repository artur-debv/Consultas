import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'


const MainLayout = ({ open, toggleDrawer, children, sidebarColor }) => {
  const [corPrimaria, setCorPrimaria] = useState("#121212");

  useEffect(() => {
    const FetchColorFundo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/configuracao/get-configuracao`);
        if (response.data.isSuccess && Array.isArray(response.data.return) && response.data.return.length > 0) {
          setCorPrimaria(response.data.return[0].corPrimaria || "#121212");
        }
      } catch (error) {
        console.error("Ocorreu um erro ao pegar a cor salva no banco", error);
      }
    };
    FetchColorFundo();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: sidebarColor || corPrimaria, // Aqui, se sidebarColor for fornecida, usa ela; caso contrário, usa a cor de fundo padrão
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar open={open} toggleDrawer={toggleDrawer} sidebarColor={sidebarColor} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: open ? "0px" : "0px", // Ajusta margem quando o Sidebar está aberto
          transition: (theme) =>
            theme.transitions.create("margin-left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f3f3f3",
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.91)",
            p: 4,
            color: "#000000",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;

