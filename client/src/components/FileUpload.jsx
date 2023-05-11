/* eslint-disable */
import { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { Button, Box, Typography } from "@mui/material";

const fileData = {
  image: {
    accept: "image/*",
    icon: <InsertPhotoIcon />,
    type: "image",
    exe: ".jpg",
  },
  video: {
    accept: "video/*",
    icon: <VideoCameraBackIcon />,
    type: "video",
    exe: ".mp4",
  },
  audio: {
    accept: "audio/*",
    icon: <AudioFileIcon />,
    type: "audio",
    exe: ".mp3",
  },
};

const fileToBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(null, reader.result);
  };
  reader.onerror = function (error) {
    cb(error, null);
  };
};

const FileUpload = ({
  type,
  keyName,
  value,
  setState,
  id,
  sx,
  btnText,
  previewBy,
  fileName,
  width,
  dataItem,
  customFunction,
}) => {
  const [loading, setLoading] = useState(false);
  // const [fileName, setFileName] = useState("")
  const styles = {
    twrapper: {
      height: width - 10,
      width: width - 10,
      borderTop: "3px solid #626262",
      borderLeft: "3px solid #626262",
      borderRight: "3px solid #626262",
    },
    fwrapper: {
      borderTop: "3px solid #626262",
      borderBottom: "3px solid #626262",
      borderLeft: "3px solid #626262",
      height: "100%",
      display: "flex",
      alignItems: "stretch",
      fontSize: "18px",
      fontWeight: "700",
      color: "#626262",
      textAlign: "center",
    },
  };

  const handleFileUpload = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }

    fileToBase64(target.files[0], (err, result) => {
      if (result) {
        if (customFunction) {
          customFunction(dataItem, downloadURL);
          return;
        }
        setState((prev) => ({
          ...prev,
          [keyName]: result,
        }));

        // console.log(result, target.files[0].name);
      } else if (err) {
        console.log(err);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: previewBy === "thumbnail" ? "column" : "row",
        alignItems: "center",
        m: 2,
      }}
    >
      {previewBy === "thumbnail" && (
        <Box sx={value && value !== "" && styles.twrapper}>
          {value !== "" && (
            <>
              {type === "image" && (
                <img
                  src={value}
                  style={{ width: "100%", height: "100%" }}
                  alt="Not Found"
                />
              )}
              {type === "video" && (
                <video
                  src={value}
                  style={{ width: "100%", height: "100%" }}
                  alt="Not Found"
                  controls
                />
              )}
              {type === "audio" && (
                <audio src={value} alt="Not Found" controls />
              )}
            </>
          )}
        </Box>
      )}
      {previewBy === "filename" && (
        <Box sx={value && value !== "" && styles.fwrapper}>
          {<Typography p>{fileName}</Typography>}
        </Box>
      )}
      <Box>
        <input
          type="file"
          name={keyName}
          onChange={handleFileUpload}
          accept={fileData[type].accept}
          style={{ display: "none" }}
          id={id}
        />
        <label htmlFor={id}>
          <Button
            sx={{
              ...sx,
              // minWidth: 220,
              height: 46,
              width: width,
              margin: "0px !important",
              color: "#FF8C00",
              fontSize: "18px",
              fontWeight: "700",
              textTransform: "none",
              border: "3px solid #FF8C00",
              "&:hover": {
                backgroundColor: "#FFCD85",
                boxShadow: "none",
              },
            }}
            component="span"
          >
            {fileData[type].icon} &nbsp;{" "}
            {value === "" ? btnText.uploadText : btnText.reUploadText}
          </Button>
        </label>
      </Box>
    </Box>
  );
};

export default FileUpload;

{
  /* <FileUpload
        btnText={{
          uploadText: "Upload",
          reUploadText: "Re-Upload"
        }}
        value={value.img}
        keyName="img"
        setState={setValue}
        type="image"
        id="valueId"
        previewBy="thumbnail"
      /> */
}
