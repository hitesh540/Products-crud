import * as React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddProduct from '../pages/AddProduct';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddProductDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="light" onClick={handleClickOpen}>
        + Add
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth='sm'
        height='auto'
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogTitle>Products</DialogTitle>
        <DialogContent>
          <AddProduct handleClose={handleClose} />
        </DialogContent>

      </Dialog>
    </React.Fragment>
  );
}
