import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    InputAdornment,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function SubscriptionDialog({
    open,
    onClose,
    mode,
    formData,
    setFormData,
    onSubmit,
    loading,
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
                {isEdit
                    ? "تعديل الخطة"
                    : "إضافة خطة جديدة"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        label="اسم الخطة"
                        fullWidth
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />

                    <TextField
                        label="السعر"
                        type="number"
                        fullWidth
                        value={formData.price}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                price: e.target.value,
                            })
                        }
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        label="مدة الاشتراك بالأيام"
                        type="number"
                        fullWidth
                        value={
                            formData.durationInDays
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                durationInDays:
                                    e.target.value,
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
                >
                    {loading
                        ? "جاري الحفظ..."
                        : isEdit
                            ? "حفظ التعديلات"
                            : "إضافة"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SubscriptionDialog;