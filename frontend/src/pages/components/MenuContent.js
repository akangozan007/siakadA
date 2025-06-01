import * as React from 'react';
import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SummarizeIcon from '@mui/icons-material/Summarize';
import StorageIcon from '@mui/icons-material/Storage';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

// admin icons
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { color } from '@mui/system';
// icon dosen
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import NoteAltSharpIcon from '@mui/icons-material/NoteAltSharp';
import PermContactCalendarSharpIcon from '@mui/icons-material/PermContactCalendarSharp';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// icon admin

import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PaidIcon from '@mui/icons-material/Paid';
import ClassIcon from '@mui/icons-material/Class';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';

export default function MenuContent() {
  const [fitur, setFitur] = useState(null);
  const [openAbsen, setOpenAbsen] = useState(false);
  const [openBimbingan, setOpenBimbingan] = useState(false);
  const [openInfoakademik, setOpenInfoAkademik] = useState(false);
  const [openJadwal, setOpenJadwal] = useState(false);
  const [openKHS, setOpenKHS] = useState(false);
  const [openKRS, setOpenKRS] = useState(false);
  const [openTAGIHAN, setOpenTagihan] = useState(false);
  const [openPengajuan, setOpenPengajuan] = useState(false);
// event superadmin
  const [openSuperAdminMenus, setOpenSuperAdminMenus] = useState({});
// event dosen
  const [openAdminMenus, setOpenAdminMenus] = useState({});
  // event dosen
  const [openDosenMenus, setOpenDosenMenus] = useState({});


  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("fitur_pengguna") || "{}");
      setFitur(stored);
    }
  }, []);

  // jika mahasiswa
  if (!fitur || fitur.role === "mahasiswa"){
    
  const mainListItems = [
    { text: 'AKUN', icon: <HomeRoundedIcon /> },
    { text: 'TRANSKIP AKADEMIK', icon: <HomeRoundedIcon /> },
    { text: 'FORUM', icon: <HomeRoundedIcon /> },
    { text: 'BIMBINGAN', icon: <AnalyticsRoundedIcon />, isDropdown: true },
    { text: 'ABSEN', icon: <HomeRoundedIcon />, isDropdown: true },
    { text: 'INFO AKADEMIK', icon: <AnalyticsRoundedIcon />, isDropdown: true },
    { text: 'JADWAL', icon: <AnalyticsRoundedIcon />, isDropdown: true },
    { text: 'KHS', icon: <PeopleRoundedIcon />, isDropdown: true }, 
    { text: 'KRS', icon: <AssignmentRoundedIcon />, isDropdown: true  },
    { text: 'PEMBAYARAN/TAGIHAN', icon: <AssignmentRoundedIcon />, isDropdown: true },
    { text: 'PENGAJUAN', icon: <AssignmentRoundedIcon />, isDropdown: true },
  ];

  const absensi = [
    { text: 'Rekap Kehadiran', icon: <HomeRoundedIcon /> },
    { text: 'Notifikasi Kehadiran', icon: <HomeRoundedIcon /> },
  ];

  const bimbinganMenu = Array.isArray(fitur?.fitur?.bimbingan)
    ? fitur.fitur.bimbingan.map((item) => ({
        text: item,
        icon: <AnalyticsRoundedIcon />,
      }))
    : [];

  const infoakademikMenu = [
    { text: 'Pengumuman', icon: <AnalyticsRoundedIcon /> },
    { text: 'Tagihan', icon: <AnalyticsRoundedIcon /> },
    { text: 'Verifikasi', icon: <AnalyticsRoundedIcon /> },
  ];

  const jadwalMenu = [
    { text: 'Jadwal Mata kuliah', icon: <AnalyticsRoundedIcon /> },
    { text: 'Ujian Tengah Semester', icon: <AnalyticsRoundedIcon /> },
    { text: 'Ujian Akhir Semester', icon: <AnalyticsRoundedIcon /> },
  ];

  const khsMenu = [
    { text: 'Nilai', icon: <AnalyticsRoundedIcon /> },
    { text: 'IPK', icon: <AnalyticsRoundedIcon /> },
    { text: 'IPS', icon: <AnalyticsRoundedIcon /> },
  ];

  const krsMenu = [
    { text: 'Nilai', icon: <AnalyticsRoundedIcon /> },
    { text: 'IPK', icon: <AnalyticsRoundedIcon /> },
    { text: 'IPS', icon: <AnalyticsRoundedIcon /> },
  ];

  const tagihanMenu = [
    { text: 'Tagihan', icon: <AnalyticsRoundedIcon /> },
    { text: 'Status', icon: <AnalyticsRoundedIcon /> },
  ];

  const pengajuanMenu = [
    { text: 'cuti', icon: <AnalyticsRoundedIcon /> },
    { text: 'izin', icon: <AnalyticsRoundedIcon /> },
    { text: 'pindah', icon: <AnalyticsRoundedIcon /> },
  ];

  const handleClick = (itemText) => {
    switch (itemText) {
      case "ABSEN":
        setOpenAbsen((prev) => !prev);
        break;
      case "BIMBINGAN":
        setOpenBimbingan((prev) => !prev);
        break;
      case "INFO AKADEMIK":
        setOpenInfoAkademik((prev) => !prev);
        break;
      case "JADWAL":
        setOpenJadwal((prev) => !prev);
        break;
      case "KHS":
        setOpenKHS((prev) => !prev);
        break;
      case "KRS":
        setOpenKRS((prev) => !prev);
        break;
      case "PEMBAYARAN/TAGIHAN":
        setOpenTagihan((prev) => !prev);
        break;
      case "PENGAJUAN":
        setOpenPengajuan((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={item.isDropdown ? () => handleClick(item.text) : undefined}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.isDropdown &&
                  ((item.text === "ABSEN" && openAbsen) ||
                  (item.text === "BIMBINGAN" && openBimbingan) ||
                  (item.text === "INFO AKADEMIK" && openInfoakademik) ||
                  (item.text === "JADWAL" && openJadwal) ||
                  (item.text === "KHS" && openKHS) ||
                  (item.text === "KRS" && openKRS) ||
                  (item.text === "PEMBAYARAN/TAGIHAN" && openTAGIHAN)) ? (
                    <ExpandLess />
                  ) : (
                    item.isDropdown && <ExpandMore />
                  )}
              </ListItemButton>
            </ListItem>

            {item.text === "ABSEN" && openAbsen && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {absensi.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "BIMBINGAN" && openBimbingan && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {bimbinganMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "INFO AKADEMIK" && openInfoakademik && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {infoakademikMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "JADWAL" && openJadwal && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {jadwalMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "KHS" && openKHS && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {khsMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "KRS" && openKRS && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {krsMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "PEMBAYARAN/TAGIHAN" && openTAGIHAN && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {tagihanMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

            {item.text === "PENGAJUAN" && openPengajuan && (
              <Collapse in timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {pengajuanMenu.map((subItem, subIndex) => (
                    <ListItem key={subIndex} disablePadding sx={{ pl: 4 }}>
                      <ListItemButton>
                        <ListItemIcon>{subItem.icon}</ListItemIcon>
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}

          </React.Fragment>
        ))}
      </List>
    </Stack>
  );

  }
  // jika admin
 else if (!fitur || fitur.role === "admin") {
    console.log("admin account!");
    // console.log(fitur.fitur);
    let fitur_fitur = fitur.fitur;
    let fiturAdmin = JSON.stringify(fitur_fitur, null, 4);
    // console.log(fiturAdmin);

   const iconMapping = {
         "Manajemen Data Mahasiswa" : <SchoolSharpIcon />,
         "Manajemen KRS": <ChecklistIcon />,
         "Manajemen Nilai & KHS": <ChecklistIcon />,
         "Manajemen Pembayaran": <PaidIcon />,
         "Pengajuan Administrasi": <ClassIcon />,
         "Manajemen Absensi & Kehadiran": <PermContactCalendarSharpIcon />,
         "Komunikasi & Notifikasi": <RecordVoiceOverIcon />,
         "Laporan": <ReportProblemIcon />,
   };
    // ambil mainmenu item
    let mainMenus = Object.entries(fitur_fitur).map(([mainMenu, subMenuItems]) => ({
      text: mainMenu,
      isDropdown: true,
      icon: iconMapping[mainMenu] || null, // Tambahkan mapping icon jika ada
      subMenu: subMenuItems.map(item => ({
        label: item[0].labelmenu,
        link: item[1].link
      })),
    }));

    // event click
    const handleClick = (menuName) => {
         setOpenAdminMenus((prev) => ({
                ...prev,
                [menuName]: !prev[menuName],
         }));
     };

       // tampilan
       return(
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
          <List dense>
          {mainMenus.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton onClick={() => handleClick(item.text)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openAdminMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>

              {/* Submenu */}
              <Collapse in={openAdminMenus[item.text]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subMenu.map((subItem, subIndex) => (
                             <ListItemButton
                             sx={{ pl: 4 }}
                             key={subIndex}
                             component="a"
                             href={subItem.link}
                           >
                              <ListItemText primary={subItem.label} />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
            </React.Fragment>
          ))}
        </List>
        </Stack>
      );

  }
  // jika dosen
  else if (!fitur || fitur.role === "dosen"){
            console.log("dosen account!");
              // console.log(fitur.fitur);
            let fitur_fitur = fitur.fitur;
            console.log(JSON.stringify(fitur_fitur, null, 4));
            // icon 
           
            const iconMapping = {
              "Manajemen Perkuliahan": <SchoolSharpIcon />,
              "Manajemen Nilai": <NoteAltSharpIcon />,
              "Absensi Mahasiswa": <PermContactCalendarSharpIcon />,
              "Bimbingan Skripsi/Tugas Akhir":<Diversity3SharpIcon  />,
              "Notifikasi & Komunikasi":<CircleNotificationsIcon />,
              "Laporan Akademik":<AssessmentOutlinedIcon />,
            };

             // ambil mainmenu item
              let mainMenus = Object.entries(fitur_fitur).map(([mainMenu, subMenuItems]) => ({
                text: mainMenu,
                isDropdown: true,
                icon: iconMapping[mainMenu] || null, // Tambahkan mapping icon jika ada
                subMenu: subMenuItems.map(item => ({
                  label: item[0].labelmenu,
                  link: item[1].link
                })),
              }));

            // event click
            const handleClick = (menuName) => {
              setOpenDosenMenus((prev) => ({
                ...prev,
                [menuName]: !prev[menuName],
              }));
            };

            
              // tampilan
              return(
                <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
                  <List dense>
                  {mainMenus.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItemButton onClick={() => handleClick(item.text)}>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.text} />
                          {openDosenMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                      </ListItem>

                      {/* Submenu */}
                      <Collapse in={openDosenMenus[item.text]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subMenu.map((subItem, subIndex) => (
                             <ListItemButton
                             sx={{ pl: 4 }}
                             key={subIndex}
                             component="a"
                             href={subItem.link}
                           >
                              <ListItemText primary={subItem.label} />
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  ))}
                </List>
                </Stack>
              );

  }
  // jika superadmin
  else if (!fitur || fitur.role === "superadmin") {
    console.log("superadmin account!!");
    // console.log(fitur.fitur);
   let fitur_fitur = fitur.fitur;
    console.log(JSON.stringify(fitur_fitur, null, 4));
    // icon 
    const iconMapping = {
      "Manajemen User": <PeopleRoundedIcon />,
      "Kontrol Sistem": <SettingsSuggestIcon />,
      "Monitoring & Laporan": <SummarizeIcon />,
      "Manajemen Data Master":<StorageIcon />,
      "Notifikasi & Broadcast":<CircleNotificationsIcon />,
    };
    // ambil mainmenu item
    let mainMenus = Object.entries(fitur_fitur).map(([mainMenu, subMenuItems]) => ({
      text: mainMenu,
      isDropdown: true,
      icon: iconMapping[mainMenu] || null, // Tambahkan mapping icon jika ada
      subMenu: subMenuItems.map(item => ({
        label: item[0].labelmenu,
        link: item[1].link
      })),
    }));
    
    
    // event click
    const handleClick = (menuName) => {
      setOpenSuperAdminMenus((prev) => ({
        ...prev,
        [menuName]: !prev[menuName],
      }));
    };
  
    // tampilan
    return(
      <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
        <List dense>
        {mainMenus.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => handleClick(item.text)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {openSuperAdminMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            {/* Submenu */}
            <Collapse in={openSuperAdminMenus[item.text]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.subMenu.map((subItem, subIndex) => (
                  <ListItemButton
                    sx={{ pl: 4 }}
                    key={subIndex}
                    component="a"
                    href={subItem.link}
                  >
                    <ListItemText primary={subItem.label}  />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>


          </React.Fragment>
        ))}
      </List>
      </Stack>
    );

  } 
}
