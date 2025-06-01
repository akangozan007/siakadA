import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import { jwtDecode } from 'jwt-decode';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  const [datapengguna, setDatapengguna] = React.useState(null);
  const token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("fitur_pengguna"));
  // console.log(user);
  React.useEffect(() => {
    if (token && typeof token === "string") {
      try {
        const decoded = jwtDecode(token);
        setDatapengguna(decoded);

        // console.log("Decoded token:", decoded);
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    } else {
      console.warn("Token tidak tersedia atau bukan string");
    }
  }, [token]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        {/* <SelectContent /> */}
        <img src='https://k.top4top.io/p_34328chkg0.png' className="w-75" />
      </Box>
      <Divider />
      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MenuContent />
        {/* <CardAlert /> */}
      </Box>
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="User Avatar"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {/* {datapengguna?.nama_lengkap || "Pengguna"} */}
            {user?.nama_lengkap || "nama pengguna"}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {datapengguna?.email || "email@domain.com"}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
