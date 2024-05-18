import { AutoGraph } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

export default function App() {
  return (
    <Box sx={{ padding: "1rem" }}>
      {/* Title bar with my name and the class its for */}
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <AutoGraph sx={{ margin: 1 }} />
          <Typography variant="h6">AoC - 2015</Typography>
          <Typography>Kristian</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <h1></h1>
    </Box>
  );
}
