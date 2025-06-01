import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

// Utility untuk mengubah segment ke label (optional)
const segmentToLabel = (segment) =>
  segment.charAt(0).toUpperCase() + segment.slice(1);

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  // Contoh location.pathname: "/user/akun/detail"
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Membangun array breadcrumb items
  const breadcrumbs = pathSegments.map((segment, idx) => {
    const to = '/' + pathSegments.slice(0, idx + 1).join('/');
    const isLast = idx === pathSegments.length - 1;
    const label = segmentToLabel(segment);

    return isLast ? (
      <Typography
        key={to}
        variant="body1"
        sx={{ color: 'text.primary', fontWeight: 600 }}
      >
        {label}
      </Typography>
    ) : (
      <Typography
        key={to}
        component={RouterLink}
        to={to}
        variant="body1"
        color="inherit"
        sx={{ textDecoration: 'none' }}
      >
        {label}
      </Typography>
    );
  });

  // Jika path kosong, tampilkan “Home”
  if (breadcrumbs.length === 0) {
    breadcrumbs.push(
      <Typography key="home" variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
        Home
      </Typography>
    );
  }

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {/* Bisa juga menambahkan link ke Dashboard */}
      <Typography
        component={RouterLink}
        to="/"
        variant="body1"
        color="inherit"
        sx={{ textDecoration: 'none' }}
      >
        Dashboard
      </Typography>
      {breadcrumbs}
    </StyledBreadcrumbs>
  );
}
