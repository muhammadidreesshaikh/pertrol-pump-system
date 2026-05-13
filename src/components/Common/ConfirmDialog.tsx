import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  loading?: boolean;
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  loading = false,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>{title}</DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <DialogContentText sx={{ color: "text.secondary" }}>
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
        <Button onClick={onCancel} disabled={loading} variant="outlined">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={isDangerous ? "error" : "primary"}
          disabled={loading}
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
