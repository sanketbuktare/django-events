import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import axios from "axios";
import { Box } from "@mui/material";
import EventCard from "../EventCard";

const MyEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://127.0.0.1:8000/api/events/?user_id=" + user?.id)
      .then((res) => {
        console.log(res.data);
        setAllEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {allEvents?.length === 0 ? (
        <h3>No Events Found</h3>
      ) : (
        <>
          {allEvents?.map((e) => (
            <EventCard
              event={{ ...e, type: 1 }}
              key={e.id}
              reFetch={fetchEvents}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default MyEvents;
