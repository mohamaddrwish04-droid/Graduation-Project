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
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="primary" />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}

export default SearchInput;