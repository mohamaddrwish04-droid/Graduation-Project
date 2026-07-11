
import { Box, Typography } from "@mui/material";

function PageHeader({ title, subtitle }) {
  return (
    <Box
      sx={{
        mb: 4,
        pb: 2,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems:"center"
      }}
    >
      <Typography
        variant="h5"
        fontWeight="500"
        sx={{
          mb: 1,
          color: "text.primary",
          letterSpacing: "0.5px",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          maxWidth: "700px",
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default PageHeader;