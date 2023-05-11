import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import EventCard from "../EventCard";

const AllEvents = () => {
  const [allEvents, setAllEvents] = useState([]);
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://127.0.0.1:8000/api/events/")
      .then((res) => {
        console.log(res.data);
        setAllEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      {allEvents?.length === 0 ? (
        <h3>No Events Found</h3>
      ) : (
        <>
          <h2 style={{ textAlign: "center" }}>All Events</h2>
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {allEvents?.map((e) => (
              <EventCard event={e} key={e.id} reFetch={fetchEvents} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllEvents;
