import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Suggested Connections
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {/* {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={"Athlete"}
            userPicturePath={friend.picturePath}
          />
        ))} */}
        <Friend
            key={1}
            friendId={1}
            name={`Nick Zielonka`}
            subtitle={"Athlete - Soccer (NJ)"}
            userPicturePath={"/nickz.jpeg"}
          />
          <Friend
            key={2}
            friendId={2}
            name={`Amherst College`}
            subtitle={"University - D3"}
            userPicturePath={"amherstcollege.png"}
          />
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
