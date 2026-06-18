import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

function SpecializationDialog({
    open,
    onClose,
    mode,
    formData,
    setFormData,
    onSubmit,
    loading
}) {
    const isEdit = mode === "edit";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                {isEdit ? "تعديل التخصص": "إضافة تخصص جديد"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        label="اسم التخصص"
                        fullWidth
                        required
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <TextField
                        label="الوصف"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                    />
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    إلغاء
                </Button>

                <Button
                    variant="contained"
                    onClick={onSubmit}
                    disabled={loading}
                    startIcon={
                        isEdit
                            ? <SaveIcon />
                            : <AddIcon />
                    }
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        background: isEdit
                            ? "linear-gradient(135deg,#2F6BFF,#4D7CFE)"
                            : "linear-gradient(135deg,#16a34a,#22c55e)",
                    }}
                >
                    {
                        loading
                            ? "جاري الحفظ..."
                            : isEdit
                                ? "حفظ التعديلات"
                                : "إضافة"
                    }
                </Button>


            </DialogActions>
        </Dialog>
    );
}

export default SpecializationDialog;        