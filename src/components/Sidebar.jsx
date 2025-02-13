import React, { useState } from "react";
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box } from "@mui/material";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from "react-router-dom";
import logoJcsx from "../assets/logoJcsx.svg";
import jcsx from "../assets/jcsx.svg";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
const drawerWidth = 200;
const minimizedWidth = 90;

const Sidebar = ({ open, toggleDrawer, sidebarColor }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const [corPrimaria, setCorPrimaria] = useState("#121212")

  useEffect(() => {
    const fetchColorSidebar = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/configuracao/get-configuracao`
        );
        if (response.data.isSuccess && Array.isArray(response.data.return) && response.data.return.length > 0) {
          setCorPrimaria(response.data.return[0].corPrimaria || "#121212");
        }
      } catch (error) {
        console.error("Ocorreu um erro ao pegar a cor salva no banco", error);
      }
    };

    fetchColorSidebar();
  }, []);

  const backgroundColor = sidebarColor || corPrimaria;

  return (
    <>
      {open && (
        // Overlay para bloquear a interação com a UI quando a sidebar estiver aberta
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // cor do fundo do overlay
            zIndex: 1100, // Deve ser menor que o da sidebar
            pointerEvents: "auto", // Permite interagir com o overlay
          }}
          onClick={toggleDrawer} // Fechar a sidebar ao clicar no overlay
        />
      )}

      {isMobile ? (
        <>
          <nav
            style={{
              backgroundColor: backgroundColor,
              color: "#d9d9d9",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1000,
            }}
          >
            <img src={logoJcsx} alt="Logo" style={{ width: 100 }} />
            <IconButton onClick={handleMobileMenu} sx={{ color: "#fff" }}>
              <MenuIcon />
            </IconButton>
          </nav>
          {mobileOpen && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: 0,
                width: "100%",
                backgroundColor: backgroundColor,
                padding: "20px 0",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
            >
              <List>
                <ListItem button component={Link} to="/dashboard">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/organizacoes">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <SupervisedUserCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Organizações" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/produtores">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Produtores" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/inscricoes">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Incrições Estaduais" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/produtos">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <WalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Produtos" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/saldo">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saldo" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/movimentos">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <WalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Movimentos" sx={{ color: "#f3f3f3" }} />
                </ListItem>

                <ListItem button component={Link} to="/configuracoes">
                  <ListItemIcon sx={{ color: "#f3f3f3" }}>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Configurações" sx={{ color: "#f3f3f3" }} />
                </ListItem>

              </List>
            </div>
          )}
        </>
      ) : (
        <Drawer
          variant="permanent"
          open={open}
          sx={{

            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : minimizedWidth,  // Ainda controla a largura do drawer, mas a animação é feita via transform
              boxSizing: "border-box",
              transition: (theme) =>
                theme.transitions.create(["transform"], {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.standard,
                }),
              backgroundColor: backgroundColor,
              color: "#d9d9d9",
              border : "none",
              position: "relative",
              pt: 7,
            },
          }}
        >
          <Toolbar
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: 1,
            }}
          >
            <IconButton onClick={toggleDrawer} sx={{ color: "#f9f9f9" }}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Toolbar>

          {open ? (
            <img
              src={logoJcsx}
              alt="Logo"
              style={{ display: "block", width: 150, margin: "20px auto" }}
              onClick={toggleDrawer}
            />
          ) : (
            <img
              src={jcsx}
              alt="Logo"
              style={{ display: "block", width: 40, margin: "20px auto" }}
              onClick={toggleDrawer}
            />
          )}

          <List
            sx={{
              paddingLeft: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: open ? "flex-start" : "center",
              justifyContent: "flex-start",
            }}
          >
            <ListItem button component={Link} to="/dashboard">
              <ListItemIcon sx={{ color: "#f3f3f3" }}>
                <DashboardIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>

            <ListItem button component={Link} to="/organizacoes">
              <ListItemIcon sx={{ color: "#f3f3f3f3" }}>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Organizações" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>

            <ListItem button component={Link} to="/produtores">
              <ListItemIcon sx={{ color: "#f3f3f3" }}>
                <AccountCircleIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Produtores" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>

            <ListItem button component={Link} to="/inscricoes">
              <ListItemIcon sx={{ color: "#f3f3f3" }}>
                <ArticleIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Inscricões Estaduais" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>

            <ListItem button component={Link} to="/produtos">
              <ListItemIcon sx={{ color: "#f3f3f3f3" }}>
                <InventoryIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Produtos" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>
            
            <ListItem button component={Link} to="/saldo">
              <ListItemIcon sx={{ color: "#f3f3f3f3" }}>
                <AttachMoneyIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Saldo" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>

            <ListItem button component={Link} to="/movimentos">
              <ListItemIcon sx={{ color: "#f3f3f3f3" }}>
                <WalletIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Movimentos" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>

            <ListItem button component={Link} to="/configuracoes">
              <ListItemIcon sx={{ color: "#f3f3f3f3" }}>
                <SettingsIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Configurações" sx={{ color: "#f3f3f3f3" }} />}
            </ListItem>
          </List>
        </Drawer>
      )}
    </>
  );
};
export default Sidebar;