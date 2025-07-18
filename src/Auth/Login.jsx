import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import FormProvider from "../utils/FormProvider";
import useAuth from "./hook/useAuth";
import { useSnackbar } from "notistack";

const defaultValues = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loginUser } = useAuth();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      const token = localStorage.getItem("accessToken");
      if (token) {
        enqueueSnackbar("Login SuccessFul", { variant: "success" });
        navigate("/home");
      } else {
        console.log("Invalid Credntials");
        
        enqueueSnackbar("Invalid Credntials", { variant: "error" });
      }
    } catch (err) {
      enqueueSnackbar("An unexpected error occurred", { variant: "error" });
    }
  };
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage:
            "linear-gradient(to right Bottom , #c1dfc4, #deecdd )",
          // backgroundImage:"linear-gradient(to bottom right , #fad0c4, #ffd1ff )"
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
            width: { sm: "400px" },
            textAlign: "center",
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Typography sx={{ fontSize: 24, color: "#606060" }}>
                Sign In
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                {...register("email")}
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
              <Button type="submit" variant="contained">
                Sign In
              </Button>
              <Typography sx={{ color: "#606060" }}>
                New User? Register <Link to={"/register"}>here</Link>
              </Typography>
            </Stack>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
};

export default Login;
