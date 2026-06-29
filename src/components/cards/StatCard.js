// src/components/cards/StatCard.jsx

import { Card, Box, Typography } from "@mui/material";

function StatCard({ title, value, icon }) {
    return (
        <Card
            sx={{
                height: 120,
                background:"MuiCard.styleOverrides",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 8px 25px rgba(47,107,255,0.12)",
                transition: "all 0.3s ease",
                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-4px) scale(1.03)",
                    boxShadow: "0 15px 35px rgba(47,107,255,0.25)",
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    px: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Text Section */}
                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mb: 1,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h4"
                        fontWeight="bold"
                    >
                        {value}
                    </Typography>
                </Box>

                {/* Icon Section */}
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: "16px",
                        background:"rgba(47,107,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.main",
                        "& svg": {
                            fontSize: 32,
                        },
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </Card>
    );
}

export default StatCard;