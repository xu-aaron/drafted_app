import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  HexGrid,
  Layout,
  Hexagon,
  Text,
  Pattern,
  Path,
  Hex,
} from "react-hexgrid";

const BuzzCircles = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Messages
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Friend
          key={1}
          friendId={1}
          name={`A10 Coaches`}
          subtitle={"Buzz Circle"}
          userPicturePath={"/a10.png"}
          message={true}
        />
        <Friend
          key={2}
          friendId={2}
          name={`SEC Coaches`}
          subtitle={"Buzz Circle"}
          userPicturePath={"sec.png"}
          message={true}
        />
        <Friend
          key={3}
          friendId={3}
          name={`College Coach`}
          subtitle={"Direct Message"}
          userPicturePath={"hometeamcoach.jpeg"}
          message={true}
        />
      </Box>
    </WidgetWrapper>
  );
};

export default BuzzCircles;
