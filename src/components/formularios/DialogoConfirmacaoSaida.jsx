import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import ButtonStyled from "../ButtonStyled";

const DialogoConfirmacaoSaida = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogContent>
                Tem certeza de que deseja sair? As alterações não salvas serão perdidas.
            </DialogContent>
            <DialogActions>
                <ButtonStyled onClick={onClose} variant="outlined" color="secondary">
                    Cancelar
                </ButtonStyled>
                <ButtonStyled onClick={onConfirm} variant="contained" color="primary">
                    Sair
                </ButtonStyled>
            </DialogActions>
        </Dialog>
    );
};

export default DialogoConfirmacaoSaida;
