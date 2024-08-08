import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const ProfileCover: React.FC<{
  name: string;
  coverImg: string;
  avatar: string;
  description: string;
  blood: string;
}> = (props) => {
  const navigate = useNavigate();

  const { name, coverImg, avatar, description, blood } = props;
  return (
    <>
      <Box display="flex" mb={3} alignItems={'center'}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ p: 2, mr: 2 }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {name}
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={coverImg} />
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant="rounded"
          alt={name}
          src={avatar || `https://ui-avatars.com/api/?name=${name}&size=200`}
        />
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {name}
        </Typography>
        <Typography sx={{ pb: 2 }} variant="subtitle2">
          {description}
        </Typography>

        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ display: 'initial' }}>
            <Button size="small" variant="contained" color="error">
              {blood
                .replaceAll('_POSITIVE', '+')
                .replaceAll('_NEGATIVE', '-') || 'Unknown'}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
