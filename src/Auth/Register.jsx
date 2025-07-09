import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";

const defaultValues = {
  username: "",
  email: "",
  password: "",
};

const registerSchema = yup.object().shape({
  username: yup.string().required("Usrename is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
});
const Register = () => {
  const methods = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to bottom right, #deecdd, #c1dfc4 )",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "white",
            p: 5,
            borderRadius: 2,
            textAlign: "center",
            width: { md: "400px" },
          }}
        >
          <Stack spacing={2}>
            <Typography sx={{ fontSize: 24, color: "#606060" }}>
              Sign Up
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              {...register("email")}
              error={!!errors?.username}
              helperText={errors?.username?.message}
            />
            <TextField
              label="Email"
              variant="outlined"
              {...register("password")}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              {...register("password")}
              error={!!errors?.password}
              helperText={errors?.password?.message}
            />
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
            <Typography sx={{ color: "#606060" }}>
              Already a User? Sign In <Link to={"/login"}>Here</Link>{" "}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Register;
