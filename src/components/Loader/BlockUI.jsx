import { CircularProgress, Box } from '@mui/material';

// eslint-disable-next-line react/prop-types
const BlockUI = ({ blocking, children }) => {
  console.log("blocking",blocking)
  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      {blocking && (
        <Box
          sx={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}
      {children}
    </Box>
  );
};

export default BlockUI;
