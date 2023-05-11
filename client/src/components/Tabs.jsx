import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const TabComponent = ({ tabs, fullWidth, bottomNavigation }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={fullWidth && "fullWidth"}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            hidden: true,
          }}
          sx={{
            "&button": {
              backgroundColor: "#fff",
              color: "#626262",
              textTransform: "none",
              fontWeight: 500,
            },
            "& button:hover": { filter: "brightness(95%)" },
            border: "none",
          }}
        >
          {tabs?.map((tab, index) => {
            return (
              <Tab
                icon={tab.icon}
                iconPosition="start"
                key={tab.id}
                label={tab.label}
                {...a11yProps(index)}
                sx={{
                  width: "33.3%",
                  "&.Mui-selected": {
                    backgroundColor: "#D3F1FF",
                    color: "#000",
                  },
                  "&:hover": {
                    backgroundColor: "#FFBF71",
                  },
                }}
              />
            );
          })}
        </Tabs>
      </Box>
      {tabs?.map((tab, index) => {
        return (
          <TabPanel value={value} index={index} key={tab.id}>
            {tab.component}
          </TabPanel>
        );
      })}
      {bottomNavigation?.isActive && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            p: 4,
          }}
        >
          {value !== 0 ? (
            <Button
              color="warning"
              variant="outlined"
              sx={{
                p: 1,
                display: "flex",
                textTransform: "none",
                alignItems: "center",
              }}
              onClick={() => setValue((prev) => prev - 1)}
            >
              {" "}
              <ArrowLeftIcon /> {bottomNavigation.prevText}
            </Button>
          ) : (
            <div></div>
          )}

          {value !== tabs?.length - 1 && (
            <Button
              color="warning"
              variant="outlined"
              sx={{
                p: 1,
                textTransform: "none",
              }}
              onClick={() => setValue((prev) => prev + 1)}
            >
              {bottomNavigation.nextText} <ArrowRightIcon />{" "}
            </Button>
          )}
        </Box>
      )}

      
    </Box>
  );
};

export default TabComponent;
