import { useEffect, useState } from "react";
import { Home, People, VideoLibrary, Scoreboard } from "@mui/icons-material";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "components/WidgetWrapper";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const { _id, picturePath, firstName, lastName } = useSelector(
    (state) => state.user
  );

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  return (
    <WidgetWrapper style={{ position: "fixed" }}>
      <FlexBetween>
        <IconButton
          sx={{ borderRadius: "10px" }}
          onClick={() => {
            navigate(`/profile/${_id}`);
            navigate(0);
          }}
        >
          <UserImage image={picturePath} size="40px" sx={{ mr: "10px" }} />
          <Typography variant="h5" fontFamily={'Fugaz One'} sx={{ ml: "1.0rem", fontSize: 18 }}>
            Profile
          </Typography>
        </IconButton>
      </FlexBetween>
      <FlexBetween>
        <IconButton sx={{ borderRadius: "10px" }} onClick={() => navigate("/home")}>
          <Home color="primary" sx={{ fontSize: "40px" }} />
          <Typography variant="h5" fontFamily={'Fugaz One'} sx={{ ml: "1.0rem", fontSize: 18 }}>
            Home
          </Typography>
        </IconButton>
      </FlexBetween>
      <FlexBetween>
        <IconButton sx={{ borderRadius: "10px" }}>
          <VideoLibrary color="primary" sx={{ fontSize: "40px" }} />
          <Typography variant="h5" fontFamily={'Fugaz One'} sx={{ ml: "1.0rem", fontSize: 18 }}>
            Explore
          </Typography>
        </IconButton>
      </FlexBetween>
      <FlexBetween>
        <IconButton sx={{ borderRadius: "10px" }}>
          <People color="primary" sx={{ fontSize: "40px" }} />
          <Typography variant="h5" fontFamily={'Fugaz One'} sx={{ ml: "1.0rem", fontSize: 18 }}>
            Friends
          </Typography>
        </IconButton>
      </FlexBetween>
      <FlexBetween>
        <IconButton sx={{ borderRadius: "10px" }}>
          <Scoreboard color="primary" sx={{ fontSize: "40px" }} />
          <Typography variant="h5" fontFamily={'Fugaz One'} sx={{ ml: "1.0rem", fontSize: 18 }}>
            Teams
          </Typography>
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default Navbar;
