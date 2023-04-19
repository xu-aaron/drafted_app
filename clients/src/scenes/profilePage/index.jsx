import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "scenes/header";
import Navbar from "scenes/navbar";

import { Card, CardContent, CardMedia, CardActions } from "@mui/material";
import ReactCardFlip from "react-card-flip";

import "./index.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [flipped, setFlipped] = useState(false);

  const statsData = [
    { label: "Games Played", value: 16 },
    { label: "Total Kills", value: 3 },
    { label: "Total Digs", value: 120 },
    { label: "Total Assists", value: 50 },
    { label: "Total Aces", value: 22 },
  ];

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;

  console.log(user);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <Box>
      <Header />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="0.5rem"
        justifyContent="space-between"
        display="flex"
      >
        <Box flexBasis={"22%"}>
          <Navbar />
        </Box>
        <Box flexBasis="70%" sx={{ justifyContent: "center" }}>
          <Box sx={{ display: "flex" }}>
            <ReactCardFlip
              className="flip_card"
              isFlipped={flipped}
              flipDirection="horizontal"
            >
              <Card
                sx={{
                  width: 325,
                  height: 450,
                  border: 5,
                  boxShadow: 20,
                  marginLeft: 10,
                }}
                onClick={() => handleFlip()}
                style={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image={`/assets/${user.picturePath}`}
                  alt=""
                />
                <CardActions>
                  <div
                    style={{ fontFamily: "Fugaz One" }}
                  >{`${user.firstName} ${user.lastName}`}</div>
                  <div className="number_circle">#5</div>
                </CardActions>
              </Card>
              <Card
                sx={{
                  width: 325,
                  height: 450,
                  border: 10,
                  boxShadow: 20,
                  marginLeft: 10,
                }}
                onClick={() => handleFlip()}
                style={{ cursor: "pointer" }}
              >
                <CardContent>
                  <div className="group">
                    <div className="label">DOB</div>
                    <span className="description">09/22/2000 (22)</span>
                  </div>
                  <div className="group">
                    <div className="label">Height</div>
                    <span className="description">5'7"</span>
                  </div>
                  <div className="group">
                    <div className="label">Weight</div>
                    <span className="description">142lbs</span>
                  </div>
                  <div className="group">
                    <div className="label">Handedness</div>
                    <span className="description">Right</span>
                  </div>
                  <div className="group">
                    <div className="label">Sport</div>
                    <span className="description">Volleyball</span>
                  </div>
                  <div className="group">
                    <div className="label">Position</div>
                    <span className="description">Libero</span>
                  </div>
                  <div className="group">
                    <div className="label">Current Team</div>
                    <span className="description">Boston Hurricanes</span>
                  </div>
                  <div className="group">
                    <div className="label">Hometown</div>
                    <span className="description">Newton, MA</span>
                  </div>
                </CardContent>
              </Card>
            </ReactCardFlip>
            <Box sx={{display: 'block'}}>
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem", ml: 10, mt: 10 }}
              >
                About Me
              </Typography>
              <Typography
                sx={{ mb: "1.5rem", ml: 10 }}
              >
                Hi, my name is Aaron Xu. I'm an aspiring volleyball player looking to play at the next level. I have played competitively for eight years now and would love a chance to keep progressing in college. Looking for a program that emphasizes academic excellence and growth in my sport.
              </Typography>
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem", ml: 10 }}
              >
                Contact
              </Typography>
              <Typography
                sx={{ ml: 10, mb: 1, display: 'block' }}
              >
                E: ayxu@umass.edu
              </Typography>
              <Typography
                sx={{ ml: 10, display: 'block' }}
              >
                P: (123) 456-7890
              </Typography>
              <Typography
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem", mt: 3, ml: 10 }}
              >
                Academics
              </Typography>
              <Typography
                sx={{ ml: 10, display: 'block' }}
              >
                GPA: 3.8
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 5 }}>
            <table>
              <thead>
                <tr>
                  <th>Newton North High School</th>
                  <th>Senior (2019)</th>
                </tr>
              </thead>
              <tbody>
                {statsData.map((stat) => (
                  <tr key={stat.label}>
                    <td>{stat.label}</td>
                    <td>{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
