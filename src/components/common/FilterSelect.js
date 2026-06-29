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