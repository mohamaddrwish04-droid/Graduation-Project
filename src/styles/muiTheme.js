
import { createTheme } from "@mui/material/styles";

const getTheme = (mode, direction = "ltr") => createTheme({
    direction: direction,

    palette: {
        mode,

        primary: {
            main: "#2F6BFF",
        },

        secondary: {
            main: "#6C63FF",
        },

        background:
            mode === "dark"
                ? {
                    default: "#0F111A",
                    paper: "#1A1D2E",
                }
                : {
                    default: "#F5F7FB",
                    paper: "#FFFFFF",
                },

        text:
            mode === "dark"
                ? {
                    primary: "#FFFFFF",
                    secondary: "#A0A3BD",
                }
                : {
                    primary: "#111827",
                    secondary: "#6B7280",
                },

        divider:
            mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",

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

    },

    typography: {
        fontFamily: 'Cairo, sans-serif',

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
                    backgroundColor:
                        mode === "dark"
                            ? "#0F111A"
                            : "#F5F7FB",
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
                    background: mode === "dark"
                        ? "#0F111A"
                        : "#F5F7FB",
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: mode === "dark"
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 0 20px rgba(47,107,255,0.08)",
                },
            },
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: mode === "dark"
                        ? "1px solid rgba(255,255,255,0.05)"
                        : "1px solid rgba(0,0,0,0.08)",
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
                    background: "linear-gradient(135deg, #2F6BFF 0%, #5A8CFF 100%)",
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: mode === "dark"
                            ? "#141726"
                            : "#FFFFFF",

                        "& fieldset": {
                            borderColor: mode === "dark"
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(0,0,0,0.15)",
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
                    backgroundColor: mode === "dark"
                        ? "#12141F"
                        : "#FFFFFF",
                    borderLeft: "1px solid rgba(255,255,255,0.05)",
                },
            },
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: mode === "dark"
                        ? "#12141F"
                        : "#FFFFFF",
                    boxShadow: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                },
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    transition: "all .25s ease",

                    "&:hover": {
                        backgroundColor:
                            mode === "dark"
                                ? "rgba(47,107,255,0.08)"
                                : "rgba(47,107,255,0.06)",

                        transform: "scale(1.002)",
                    },
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor:
                        mode === "dark"
                            ? "#141726"
                            : "#FFFFFF",

                    borderBottom:
                        mode === "dark"
                            ? "1px solid rgba(255,255,255,0.05)"
                            : "1px solid rgba(0,0,0,0.06)",

                    transition: "all .25s ease",

                    fontWeight: 500,
                },

                head: {
                    background:
                        mode === "dark"
                            ? "#111827"
                            : "#F8FAFC",

                    color:
                        mode === "dark"
                            ? "#FFFFFF"
                            : "#111827",

                    fontWeight: 700,

                    fontSize: "0.95rem",

                    borderBottom:
                        mode === "dark"
                            ? "1px solid rgba(255,255,255,0.08)"
                            : "1px solid rgba(0,0,0,0.08)",
                },
            },
        },
    },
});

export default getTheme;