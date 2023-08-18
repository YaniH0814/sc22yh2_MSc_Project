import React, { useState } from 'react';
import { motion } from 'framer-motion';
import spring from './spring';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Edge = ({ startX, startY, endX, endY, color, weight, onDelete }) => {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  

  
  const handleDoubleClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setConfirmDeleteOpen(false);
  };
  
  const handleCloseDialog = () => {
    setConfirmDeleteOpen(false);
  };

  // Calculate the length and angle of the edge
  const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  return (
    <div>
      <motion.div
        initial={false}
        animate={{
          width: length,
          rotate: angle,
        }}
        transition={spring}
        style={{
          position: 'absolute',
          left: startX,
          top: startY,
          height: '2px',
          background: color,
          transformOrigin: '0 0',
        }}
        onDoubleClick={handleDoubleClick}
      >
        <div
          style={{
            position: 'absolute',
            left: '38%',
            top: '-10px', // Adjust the position of the weight text
            transform: `translateX(-50%) rotate(${angle >= 90 ? '180deg' : '0deg'})`, // Rotate by 180 degrees if angle is >= 90 degrees
            backgroundColor: '#F0F0F1',
            background: '#F0F0F1',
            fontSize: '13px',
            borderRadius: '4px',
            padding: '2px 2px',
            color: '#000',
          }}
        >
          {weight}
        </div>
      </motion.div>
      <Dialog open={confirmDeleteOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this edge?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Edge;
