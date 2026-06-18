
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    direction: "rtl",

    palette: {
        mode: "dark",

        primary: {
            main: "#2F6BFF",
        },

        secondary: {
            main: "#6C63FF",
        },

        background: {
            default: "#0F111A",
            paper: "#1A1D2E",
        },

        text: {
            primary: "#FFFFFF",
            secondary: "#A0A3BD",
        },

        success: {
            main: "#22C55E",
        },

        warning: {
            main: "#F59E0B",
        },

        error: {
            main: "#EF4444",
        },

        info: {
            main: "#38BDF8",
        },

        divider: "rgba(255,255,255,0.08)",
    },

    typography: {
        fontFamily: "'Cairo', sans-serif",

        h1: {
            fontWeight: 700,
        },

        h2: {
            fontWeight: 700,
        },

        h3: {
            fontWeight: 700,
        },

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 600,
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 14,
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#0F111A",
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box",
                },

                "*": {
                    boxSizing: "border-box",
                },

                "::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },

                "::-webkit-scrollbar-thumb": {
                    background: "#2F6BFF",
                    borderRadius: "10px",
                },

                "::-webkit-scrollbar-track": {
                    background: "#161925",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 0 20px rgba(47,107,255,0.08)",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 0 20px rgba(47,107,255,0.08)",
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    padding: "10px 18px",
                    transition: "0.3s",

                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 0 15px rgba(47,107,255,0.35)",
                    },
                },

                containedPrimary: {
                    background:
                        "linear-gradient(135deg, #2F6BFF 0%, #5A8CFF 100%)",
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "#141726",

                        "& fieldset": {
                            borderColor: "rgba(255,255,255,0.08)",
                        },

                        "&:hover fieldset": {
                            borderColor: "#2F6BFF",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#2F6BFF",
                            boxShadow: "0 0 10px rgba(47,107,255,0.25)",
                        },
                    },
                },
            },
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#12141F",
                    borderLeft: "1px solid rgba(255,255,255,0.05)",
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "#12141F",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                },

                head: {
                    color: "#FFFFFF",
                    fontWeight: 700,
                },
            },
        },
    },
});

export default theme;