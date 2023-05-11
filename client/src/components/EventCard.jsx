import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { AppContext } from "../contexts/AppContext";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export default function EventCard({ event, reFetch }) {
  const {
    event_name,
    date,
    time,
    description,
    image,
    liked_by,
    created_by,
    type,
    id,
  } = event;
  const { user } = React.useContext(AppContext);

  const is_liked = liked_by?.includes(user?.id);

  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/api/events/${id}/`)
      .then((res) => {
        console.log(res.data);
        if (reFetch) reFetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    const reqBody = {
      user: user?.id,
      event: id,
      is_liked: is_liked,
    };
    if (is_liked) {
      console.log("Delete");
      axios
        .put(`http://127.0.0.1:8000/api/like-event/`, reqBody)
        .then((res) => {
          console.log(res.data);
          if (reFetch) reFetch();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("New");
      axios
        .post(`http://127.0.0.1:8000/api/like-event/`, reqBody)
        .then((res) => {
          console.log(res.data);
          if (reFetch) reFetch();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
      }}
    >
      <CardHeader title={event_name} subheader={`${date}, ${time}`} />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {user && (
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
            checked={is_liked}
            color="error"
            onChange={handleLike}
          />
        )}

        {type === 1 && (
          <IconButton sx={{ marginLeft: "auto" }} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}
