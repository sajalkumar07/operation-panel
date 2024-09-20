import React, { useEffect, useState } from "react";
import Select from "@material-ui/core/Select";
import { Chip, Menu, MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { gray } from "d3";
import Paper from "@material-ui/core/Paper";

const MultiSelector = ({
  teacherAvailableCourse,
  teacherAvailableRegion,
  handleAddCourseRegion,
  handleCourseRegionChipDelete,
  courseRegionArray
}) => {
  const [selectedCourseItem, setSelectedCourseItem] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");

  const [selectedRegionItem, setSelectedRegionItem] = useState({});
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleCourseChange = event => {
    let data = JSON.parse(event.target.value);
    setSelectedCourseItem(data);
    setSelectedCourse(event.target.value);
  };

  const handleRegionChange = event => {
    let data = JSON.parse(event.target.value);
    setSelectedRegionItem(data);
    setSelectedRegion(event.target.value);
  };

  const handleAddCourseRegionLocal = event => {
    const data = [];
    event.stopPropagation();
    if (
      selectedCourseItem.course.id !== "All" &&
      selectedRegionItem.region_master.id !== "All"
    ) {
      data.push({
        id: `${selectedCourseItem.course.id}_${selectedRegionItem.region_master.id}`,
        name: `${selectedCourseItem.course.courseShortName}_${selectedRegionItem.region_master.name}`
      });
    } else if (
      selectedCourseItem.course.id === "All" &&
      selectedRegionItem.region_master.id === "All"
    ) {
      teacherAvailableCourse.map(item => {
        if (item.course.id !== "All") {
          teacherAvailableRegion.map(reagionItem => {
            if (reagionItem.region_master.id !== "All") {
              data.push({
                id: `${item.course.id}_${reagionItem.region_master.id}`,
                name: `${item.course.courseShortName}_${reagionItem.region_master.name}`
              });
            }
          });
        }
      });
    } else if (
      selectedCourseItem.course.id === "All" &&
      selectedRegionItem.region_master.id !== "All"
    ) {
      teacherAvailableCourse.map(item => {
        if (item.course.id !== "All") {
          data.push({
            id: `${item.course.id}_${selectedRegionItem.region_master.id}`,
            name: `${item.course.courseShortName}_${selectedRegionItem.region_master.name}`
          });
        }
      });
    } else if (
      selectedCourseItem.course.id !== "All" &&
      selectedRegionItem.region_master.id === "All"
    ) {
      teacherAvailableRegion.map(reagionItem => {
        if (reagionItem.region_master.id !== "All") {
          data.push({
            id: `${selectedCourseItem.course.id}_${reagionItem.region_master.id}`,
            name: `${selectedCourseItem.course.courseShortName}_${reagionItem.region_master.name}`
          });
        }
      });
    }
    handleAddCourseRegion(data);
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth={true}>
            <InputLabel id="course-label">Course</InputLabel>
            <Select
              labelId="course-label"
              id="course-id"
              value={selectedCourse}
              label="Course"
              onChange={handleCourseChange}
            >
              {teacherAvailableCourse.map((item, index) => (
                <MenuItem key={index} value={JSON.stringify(item)}>
                  {item.course.courseShortName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 220 }}>
          <FormControl fullWidth={true}>
            <InputLabel id="region-label">Region</InputLabel>
            <Select
              labelId="region-label"
              id="region"
              value={selectedRegion}
              label="Region"
              onChange={handleRegionChange}
            >
              {teacherAvailableRegion.map((item, index) => (
                <MenuItem key={index} value={JSON.stringify(item)}>
                  {item.region_master.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div>
          <button
            style={{ backgroundColor: "black" }}
            type="button"
            className="btn btn-dark mb-3 mt-3"
            onClick={handleAddCourseRegionLocal}
          >
            Add
          </button>
        </div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0
          }}
          component="ul"
          style={{ padding: 5, width: "98%", minHeight: 50 }}
        >
          {courseRegionArray.map(item => (
            <Chip
              style={{ margin: 4 }}
              key={item?.id}
              onDelete={() => handleCourseRegionChipDelete(item)}
              label={item?.name}
            />
          ))}
        </Paper>
        {/* </Box> */}
      </div>
    </div>
  );
};

export default MultiSelector;
