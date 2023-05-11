import { Box, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import FileUpload from "./FileUpload";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";

const styles = {
  entity: {
    width: "100%",
    display: "grid",
    alignItems: "flex-start",
    gridTemplateColumns: "40% 60%",
    textAlign: "right",
    gap: "10px",
    paddingRight: "20px",
  },
};

const AddEvent = ({ setOpen, open }) => {
  const [formFields, setFormFields] = useState({
    event_name: "",
    date: "",
    time: "",
    description: "",
    location: "",
    image: "",
    created_by: null,
  });
  const { user } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    const reqBody = {
      ...formFields,
      created_by: user?.id,
    };
    console.log(reqBody);

    axios
      .post("http://127.0.0.1:8000/api/events/", reqBody)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "22px",
        alignItems: "center",
        padding: "18px",
      }}
    >
      <div style={styles.entity}>
        <label>Event Name:</label>
        <TextField
          label="Event Name"
          variant="outlined"
          name="event_name"
          required
          value={formFields.event_name}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </div>

      <div style={styles.entity}>
        <label>Date:</label>
        <TextField
          // label="Date"
          variant="outlined"
          name="date"
          required
          value={formFields.date}
          onChange={handleChange}
          type="date"
          size="small"
          fullWidth
        />
      </div>

      <div style={styles.entity}>
        <label>Time:</label>
        <TextField
          // label="Time"
          variant="outlined"
          name="time"
          required
          value={formFields.time}
          onChange={handleChange}
          size="small"
          type="time"
          fullWidth
        />
      </div>

      <div style={styles.entity}>
        <label>Location:</label>
        <TextField
          label="Location"
          variant="outlined"
          name="location"
          required
          value={formFields.location}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </div>

      <FileUpload
        btnText={{
          uploadText: "Upload",
          reUploadText: "Re-Upload",
        }}
        value={formFields.image}
        keyName="image"
        setState={setFormFields}
        type="image"
        width={180}
        id="valueId"
        previewBy="thumbnail"
      />

      <div style={styles.entity}>
        <label>Description</label>
        <textarea
          name="description"
          value={formFields.description}
          onChange={handleChange}
          placeholder="Description"
          width="100%"
          rows={4}
        />
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="error"
        >
          Close
        </Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </div>
    </Box>
  );
};

export default AddEvent;
