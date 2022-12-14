import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { setCookie } from "cookies-next";

const theme = createTheme();

const Login = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (userInfo) => {
      return await axios.post("http://localhost:4000/user/login", userInfo);
    },
    onSuccess: (res) => {
      setCookie("ut", res.data.token, {});
      setOpen(false);
      router.push("/");
    },
    onError: (err) => {
      setOpen(true);
    },
  });
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(userInfo);
    setUserInfo({ username: "", password: "" });
  };

  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            username or password is wrong !
          </Alert>
        </Snackbar>
      )}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(../images/login.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, username: e.target.value })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="text-blue-600 hover:text-white"
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Typography
                      color={"primary"}
                      sx={{ marginTop: ".25em" }}
                      variant="body2"
                    >
                      password is 1111
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Login;
