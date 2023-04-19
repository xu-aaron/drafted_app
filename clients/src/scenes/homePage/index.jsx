import { Box, useMediaQuery } from "@mui/material";
import TrendingReel from "components/TrendingReel";
import { useSelector } from "react-redux";
import Header from "scenes/header";
import Navbar from "scenes/navbar";
import BuzzCircles from "scenes/widgets/BuzzCircles";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Header />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined}>
          <Navbar />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "46%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <TrendingReel />
          <MyPostWidget />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <FriendListWidget userId={_id} />
            <BuzzCircles />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
