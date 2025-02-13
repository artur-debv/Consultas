import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import MainLayout from "../components/MainLayout";
import ButtonStyled from "../components/ButtonStyled";

const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const portfolioBalance = 17643.41;

    const assets = [
        { name: "BTC", value: 2948.04, amount: "1.25 BTC", change: "+0.14%", color: "#E6D4FF" },
        { name: "LTC", value: 2948.04, amount: "0.32 LTC", change: "+0.31%", color: "#D4FFE6" },
        { name: "ETH", value: 2948.04, amount: "1.25 ETH", change: "+0.27%", color: "#FFF5D4" },
    ];

    const marketData = [
        { name: "Band Protocol", symbol: "BAND", price: "$2.42", change: "+13.83%", marketCap: "$399.8M" },
        { name: "VeChain", symbol: "VET", price: "$7.48", change: "+11.9%", marketCap: "$152.5M" },
        { name: "Aave", symbol: "AAVE", price: "$80.184", change: "+7.57%", marketCap: "$1.2B" },
    ];

    return (
        <MainLayout open={open} toggleDrawer={toggleDrawer}>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" fontWeight="bold" mb={3}>
                    Overview
                </Typography>

                {/* Portfolio Section */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3, flexDirection: isMobile ? "column" : "row" }}>
                    <Box sx={{ flex: 1, minWidth: "250px" }}>
                        <Card sx={{ backgroundColor: "#E8F0FF" }}>
                            <CardContent>
                                <Typography variant="h5" fontWeight="bold">
                                    ${portfolioBalance.toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Portfolio balance
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    <Box sx={{ flex: 1, minWidth: "250px" }}>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                            {assets.map((asset, index) => (
                                <Box key={index} sx={{ flex: 1, minWidth: "150px" }}>
                                    <Card sx={{ backgroundColor: asset.color }}>
                                        <CardContent>
                                            <Typography variant="h6">{asset.amount}</Typography>
                                            <Typography variant="body2">${asset.value.toFixed(2)}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {asset.change}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Market Data Section */}
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, flexDirection: isMobile ? "column" : "row" }}>
                    {/* Market Data Table */}
                    <Box sx={{ flex: 2, minWidth: isMobile ? "100%" : "500px" }}>
                        <Typography variant="h6" fontWeight="bold" mb={2}>
                            Market is down 0.80%
                        </Typography>
                        <TableContainer component={Paper} sx={{ maxHeight: { xs: '200px', md: 'none' } }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>Name</TableCell>
                                        <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>Price</TableCell>
                                        <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>Change</TableCell>
                                        <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>Market Cap</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {marketData.map((coin, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>{coin.name} ({coin.symbol})</TableCell>
                                            <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>{coin.price}</TableCell>
                                            <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }} style={{ color: coin.change.includes("+") ? "green" : "red" }}>
                                                {coin.change}
                                            </TableCell>
                                            <TableCell sx={{ fontSize: { xs: '7px', md: '0.875rem' } }}>{coin.marketCap}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>

                    {/* Promotional Banner */}
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: "250px",
                            textAlign: "center",
                            padding: 3,
                            backgroundColor: "#121212",
                            color: "white",
                            borderRadius: 2,
                            mb: isMobile ? 3 : 0,  // Add margin bottom on mobile to space out sections
                        }}
                    >
                        <Typography variant="h6">
                            Earn <span style={{ color: "#FFD700" }}>free</span> crypto with Coinview Earn!
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            Learn about different cryptocurrencies and earn them for free!
                        </Typography>
                        <ButtonStyled sx={{ mt: 2 }}>Earn Now</ButtonStyled>
                    </Box>
                </Box>
            </Box>
        </MainLayout>
    );
};

export default Dashboard;
