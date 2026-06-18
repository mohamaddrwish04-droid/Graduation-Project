import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
} from "@mui/material";

import CancelIcon from "@mui/icons-material/Cancel";

function RejectDialog({
    open,
    onClose,
    adminNote,
    setAdminNote,
    onSubmit,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                رفض طلب الاشتراك
            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} sx={{ mt: 1 }}>

                    <TextField
                        label="سبب الرفض (اختياري)"
                        multiline
                        rows={4}
                        value={adminNote}
                        onChange={(e) =>
                            setAdminNote(
                                e.target.value
                            )
                        }
                    />

                </Stack>

            </DialogContent>

            <DialogActions sx={{ p: 2 }}>

                <Button
                    color="inherit"
                    onClick={onClose}
                >
                    إلغاء
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={onSubmit}
                    sx={{
                        textTransform: "none",
                        borderRadius: "12px",
                        boxShadow:
                            "0 8px 20px rgba(239,68,68,.25)"
                    }}
                >
                    رفض الطلب
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default RejectDialog;