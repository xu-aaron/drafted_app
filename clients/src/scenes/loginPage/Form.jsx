import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
  dob: yup.string().required("required"),
  height: yup.string().required("required"),
  weight: yup.string().required("required"),
  handedness: yup.string().required("required"),
  sport: yup.string().required("required"),
  position: yup.string().required("required"),
  team: yup.string().required("required"),
  hometown: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  picture: "",
  dob: "",
  height: "",
  weight: "",
  handedness: "",
  sport: "",
  position: "",
  team: "",
  hometown: "",
};

const initialValuesLogin = {
  username: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Date of Birth"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.dob}
                  name="dob"
                  error={Boolean(touched.dob) && Boolean(errors.dob)}
                  helperText={touched.dob && errors.dob}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Hometown"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.hometown}
                  name="hometown"
                  error={Boolean(touched.hometown) && Boolean(errors.hometown)}
                  helperText={touched.hometown && errors.hometown}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Height"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.height}
                  name="height"
                  error={Boolean(touched.height) && Boolean(errors.height)}
                  helperText={touched.height && errors.height}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Weight"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.weight}
                  name="weight"
                  error={Boolean(touched.weight) && Boolean(errors.weight)}
                  helperText={touched.weight && errors.weight}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Sport"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sport}
                  name="sport"
                  error={Boolean(touched.sport) && Boolean(errors.sport)}
                  helperText={touched.sport && errors.sport}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Position"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.position}
                  name="position"
                  error={Boolean(touched.position) && Boolean(errors.position)}
                  helperText={touched.position && errors.position}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Team"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.team}
                  name="team"
                  error={Boolean(touched.team) && Boolean(errors.team)}
                  helperText={touched.team && errors.team}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Handedness"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.handedness}
                  name="handedness"
                  error={
                    Boolean(touched.handedness) && Boolean(errors.handedness)
                  }
                  helperText={touched.handedness && errors.handedness}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}
            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgrounColor: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
