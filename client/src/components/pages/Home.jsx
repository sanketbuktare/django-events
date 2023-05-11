import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Dialog } from "@mui/material";
import AllEvents from "./AllEvents";
import MyEvents from "./MyEvents";
import Tabs from "../Tabs";
import AddEvent from "../AddEvent";

const Home = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "relative",
        minHeight: "80vh",
      }}
    >
      <Tabs
        fullWidth
        tabs={[
          {
            id: 0,
            component: <AllEvents />,
            label: "All Events",
          },
          {
            id: 1,
            component: <MyEvents />,
            label: "My Events",
          },
        ]}
      />
      <Fab
        aria-label={"Add"}
        color={"primary"}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <AddEvent setOpen={setOpen} open={open} />
      </Dialog>
    </Box>
  );
};

export default Home;
