import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({
    value,
    onChange,
    placeholder = "بحث..."
}) {
    return (
        <TextField
            fullWidth
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            variant="outlined"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color="primary" />
                    </InputAdornment>
                ),
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1D2E",
                    borderRadius: "12px",

                    "& fieldset": {
                        borderColor: "rgba(255,255,255,0.08)",
                    },

                    "&:hover fieldset": {
                        borderColor: "#2F6BFF",
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: "#2F6BFF",
                    },
                },
            }}
        />
    );
}

export default SearchInput;