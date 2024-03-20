import FastfoodIcon from '@mui/icons-material/Fastfood';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  borderRadius: 2
};
const SingleHistory: React.FC<{
  open: boolean;
  handleClose: () => void;
}> = ({ open, handleClose }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <Box sx={{ position: 'relative' }}>
            <HistoryTimeLine />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SingleHistory;

function HistoryTimeLine() {
  return (
    <Timeline position="right">
      <HistoryItem
        date="9:30 am"
        status="Requested"
        text="User A Request a blood of a+"
      />
      <HistoryItem
        date="9:35 am"
        status="Verified"
        text="User b Verify a blood of a+"
      />
      <HistoryItem
        date="9:35 am"
        status="Verified"
        text="User b Verify a blood of a+"
      />
      <HistoryItem
        date="9:35 am"
        status="Verified"
        text="User b Verify a blood of a+"
      />
    </Timeline>
  );
}

const HistoryItem: React.FC<{
  date: string;
  status: string;
  text: string;
}> = (props) => {
  const { date, status, text } = props;
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: 'auto 0' }}
        align="right"
        variant="body2"
        color="text.secondary"
      >
        {date}
      </TimelineOppositeContent>
      <TimelineSeparator sx={{ position: 'relative' }}>
        <TimelineConnector />
        <TimelineDot sx={{ top: '-15px', left: '-17px' }} color="primary">
          <FastfoodIcon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '20px', px: 2 }}>
        <Typography variant="h6" component="span">
          {status}
        </Typography>
        <Typography>{text}</Typography>
      </TimelineContent>
    </TimelineItem>
  );
};
