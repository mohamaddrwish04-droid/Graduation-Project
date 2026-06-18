import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

function FilterSelect({
    label,
    value,
    onChange,
    options,
}) {
    return (
        <FormControl
            fullWidth
            sx={{
                minWidth: 180,
            }}
        >
            <InputLabel>{label}</InputLabel>

            <Select
                value={value}
                label={label}
                onChange={onChange}
                sx={{
                    borderRadius: "12px",
                    backgroundColor: "#1A1D2E",

                    "& fieldset": {
                        borderColor: "rgba(255,255,255,0.08)",
                    },

                    "&:hover fieldset": {
                        borderColor: "#2F6BFF",
                    },

                    "&.Mui-focused fieldset": {
                        borderColor: "#2F6BFF",
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default FilterSelect;