// src/components/cards/StatCard.jsx

import { Card, Box, Typography } from "@mui/material";
import "./cards.css";
function StatCard({ title, value, icon }) {
    return (
        <Card id="stat-card">
            <Box id="stat-card-content"
                sx={{px: 3}}
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
                <Box id ="icon-container"
                    sx={{
                        color: "primary.main",
                    }}
                >
                    {icon}
                </Box>
            </Box>
        </Card>
    );
}

export default StatCard;