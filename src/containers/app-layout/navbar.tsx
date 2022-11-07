import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha("#FF8E3C", 0.10),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop: 4,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: "black"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    color: "black",
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  '@media all': {
    minHeight: 32,
  },
}));

const NavLink = ({children, href}: {children: string, href: string}): JSX.Element => {
  const router = useRouter();
  // const theme = useTheme();
  const isCurrentPage = router.pathname === href
  const className = isCurrentPage ? "p-3 px-8 text-black border-solid border-0 border-b-4" : "p-3 px-8 text-black"

  //TODO: Navbar can't currently read the theme used by components, hard coded color is used instead
  return (
    <Link href={href}>
      <a className={className} style={{borderColor: '#FF8E3C'}}>{children}</a>
    </Link>
  );
}

const Navbar = (): JSX.Element => {
  return (
    <Box sx={{ flexGrow: 1 }} className="mb-10">
      <AppBar position="static" sx={{ backgroundColor:"white" }}>
        <StyledToolbar>
          {/* Logo */}
          <Image src="/logo.png" width={121} height={51} className="pl-10"/>
          <Box sx={{ flexGrow: 1 }} />
          {/* Search bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm kiếm…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </StyledToolbar>
        <StyledToolbar>
          {/* Links (TODO: change to final URLs) */}
          <NavLink href="/">Trang chủ</NavLink>
          <NavLink href="/post">Bài viết</NavLink>
          <NavLink href="/topic">Đề xuất Chủ đề</NavLink>
          <NavLink href="/post/new">Tạo bài viết</NavLink>

          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large">
              {/* <Badge badgeContent={4} color="error"> */}
              <MailIcon />
              {/* </Badge> */}
          </IconButton>
          <IconButton size="large" >
              {/* <Badge badgeContent={17} color="error"> */}
              <NotificationsIcon />
              {/* </Badge> */}
          </IconButton>
          <IconButton size="large" >
            <Avatar sx={{width: 24, height: 24}} className="col-span-1 self-center justify-self-center text-xs">Q</Avatar>
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar
