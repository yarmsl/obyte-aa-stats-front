import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: 'calc(100% - 31px)',
    position: 'relative',
    '& .rs-table': {
      border: 'none',
      borderRadius: 1,
      pr: '15px',
    },
    '& .rs-table-cell-group-fixed-left': {
      background: 'none',
      bgcolor: 'background.default',
    },
    '& .rs-table-row-header': {
      background: 'none',
      bgcolor: 'background.paper',
      '& .rs-table-cell': {
        background: 'none',
      },
      '& .rs-table-cell-group': {
        bgcolor: 'background.paper',
      },
    },
    '& .rs-table-hover': {
      '& .rs-table-row': {
        transition: 'background-color 250ms ease-in-out',
        '&:hover': {
          background: 'none',
          bgcolor: 'background.paper',
          '& .rs-table-cell': {
            background: 'none',
          },
          '& .rs-table-cell-group': {
            background: 'none',
            bgcolor: 'background.default',
          },
        },
      },
    },
    '& .rs-table-cell': {
      background: 'none',
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    mb: '5px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
};
