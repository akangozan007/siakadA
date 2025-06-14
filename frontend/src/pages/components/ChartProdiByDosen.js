import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react'; 
import Button from '@mui/material/Button';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../user/internals/components/CustomIcons';


// Ambil semua data dosen
let semuadataDosen = JSON.parse(localStorage.getItem('dosenAllData'));
semuadataDosen = semuadataDosen[1]['dosen'];
// console.log("Semua data Dosen:", semuadataDosen);

const totalDosen = semuadataDosen.length;
// console.log(`Total dosen: ${totalDosen}`);

// Hitung jumlah dosen per prodi
const countByProdi = {};
semuadataDosen.forEach(entry => {
  const prodi = entry.nama_prodi;
  countByProdi[prodi] = (countByProdi[prodi] || 0) + 1;
});

// Ambil semua prodi
let semuadataProdi = JSON.parse(localStorage.getItem('prodiData'));
semuadataProdi = semuadataProdi.message[0].data_prodi;
let jumlahdataProdi = semuadataProdi.length; 
console.log("Semua data prodi:", semuadataProdi);

const data = [];
const countries = [];

semuadataProdi.forEach(entry => {
  const namaProdi = entry.nama_prodi;
  const jumlah = countByProdi[namaProdi] || 0;
  const persentase = totalDosen > 0 ? ((jumlah / totalDosen) * 100).toFixed(2) : 0;

  // console.log(`${namaProdi}: ${jumlah} dosen (${persentase}%)`);

  data.push({ label: namaProdi, value: jumlah });
  countries.push({
    name: namaProdi,
    value: parseFloat(persentase),
    flag: <IndiaFlag />,
    color: 'hsl(220,25%,65%)'
  });
});



const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  variants: [
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontSize: theme.typography.h5.fontSize,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontSize: theme.typography.body2.fontSize,
      },
    },
    {
      props: {
        variant: 'primary',
      },
      style: {
        fontWeight: theme.typography.h5.fontWeight,
      },
    },
    {
      props: ({ variant }) => variant !== 'primary',
      style: {
        fontWeight: theme.typography.body2.fontWeight,
      },
    },
  ],
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  'hsl(220, 20%, 65%)',
  'hsl(220, 20%, 42%)',
  'hsl(220, 20%, 35%)',
  'hsl(220, 20%, 25%)',
];

export default function ChartProdiByDosen({ totalData }) {
  const [expanded, setExpanded] = useState(false);
  const visibleCount = expanded ? countries.length : 5;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Jumlah dosen berdasarkan prodi
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText={jumlahdataProdi} secondaryText="Total Dosen berdasarkan prodi" />
          </PieChart>
        </Box>

        {/* Tampilkan hanya sebagian jika belum di-expand */}
        {countries.slice(0, visibleCount).map((country, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            {country.flag}
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {country.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}

        {/* Tombol Expand/Collapse */}
        {countries.length > 5 && (
          <Box textAlign="center">
            <Button onClick={handleToggle}>
              {expanded ? 'Tutup' : 'Selengkapnya'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
