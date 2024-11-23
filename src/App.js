import React, { useState, useEffect } from "react";
import { validateField } from "./components/Validation";
import {
  Container,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Chip,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PlaceholderInput from "./components/PlaceholderInput";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const defaultProfile = [
    { name: "First Name", value: "" },
    { name: "Last Name", value: "" },
    { name: "Position", value: "" },
    { name: "Phone", value: "" },
    { name: "Address", value: "" },
    { name: "Interests", value: [] },
    { name: "Link", value: [] },
    { name: "Avatar", value: "" },
    { name: "Visibility", value: "Private" },
  ];

  const [profile, setProfile] = useState(defaultProfile || []);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [showInterestPlaceholder, setShowInterestPlaceholder] = useState(false);
  const [newInterest, setNewInterest] = React.useState("");
  const [newLink, setNewLink] = React.useState("");
  const [showLinks, setShowLinks] = useState(false);

  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile && Array.isArray(savedProfile)) {
      setProfile(savedProfile);
    } else {
      setProfile(defaultProfile);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prevProfile) =>
      prevProfile.map((field) =>
        field.name === name
          ? {
              ...field,
              value:
                name === "Link" && value && !value.startsWith("http")
                  ? `https://${value}`
                  : value,
            }
          : field
      )
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevProfile) =>
          prevProfile.map((field) =>
            field.name === "Avatar" ? { ...field, value: reader.result } : field
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const newErrors = {};

    profile.forEach((field) => {
      const error = validateField(field.name, field.value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("profile", JSON.stringify(profile));
      setIsEditing(false);
      setErrors({});
      console.log("Профиль успешно сохранен:", profile);
    } else {
      setErrors(newErrors);
      console.error("Ошибки валидации:", newErrors);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem("profile");

    setProfile(defaultProfile);

    setIsEditing(false);

    setErrors({});
  };

  const handleVisibilityChange = (event) => {
    setProfile((prevProfile) =>
      prevProfile.map((field) =>
        field.name === "Visibility"
          ? { ...field, value: event.target.value }
          : field
      )
    );
  };
  const onLinkClickVisibility = () => {
    setShowLinks(!showLinks);
  };
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const toggleInterestPlaceholder = () => {
    setShowInterestPlaceholder(!showInterestPlaceholder);
    setNewInterest("");
  };
  const handleInterestChange = (e) => {
    setNewInterest(e.target.value);
  };

  const handleInterestAdd = () => {
    if (newInterest.trim() === "") return;

    setProfile((prevProfile) =>
      prevProfile.map((field) =>
        field.name === "Interests"
          ? { ...field, value: [...field.value, newInterest.trim()] }
          : field
      )
    );

    toggleInterestPlaceholder();
  };

  const handleInterestRemove = (interest) => {
    setProfile((prevProfile) =>
      prevProfile.map((field) =>
        field.name === "Interests"
          ? { ...field, value: field.value.filter((i) => i !== interest) }
          : field
      )
    );
  };
  const toggleLink = () => {
    setShowLinks(!showLinks);
    setNewLink("");
  };
  const handleLinkChange = (e) => {
    setNewLink(e.target.value);
  };

  const handleLinkAdd = () => {
    if (newLink.trim() === "") return;
    const error = validateField("Link", newLink.trim());
    if (error) {
      setErrors({ newLink: error });
      return;
    }
    setProfile((prevProfile) =>
      prevProfile.map((field) =>
        field.name === "Link"
          ? { ...field, value: [...field.value, newLink.trim()] }
          : field
      )
    );

    toggleLink();
  };
  const handleLinkRemove = (link) => {
    setProfile((prevProfile) =>
      prevProfile.map((field) =>
        field.name === "Link"
          ? { ...field, value: field.value.filter((i) => i !== link) }
          : field
      )
    );
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <IconButton>
          <ArrowBackIcon
            sx={{ fontSize: 30, fontStyle: "normal", color: "black" }}
          />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Логотип
        </Typography>
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 5,
          mt: 4,
          mb: 4,
          marginLeft: "auto",
          background: "linear-gradient(to bottom, #E9F2F3, #A6C5E3)",
          padding: 5,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src={profile.find((field) => field.name === "Avatar")?.value}
              alt="Avatar"
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                bgcolor: "lightgrey",
                cursor: "pointer",
              }}
              onClick={handleAvatarClick}
            >
              {!profile.find((field) => field.name === "Avatar")?.value && (
                <IconButton sx={{ color: "#49535C" }} component="span">
                  <AddAPhotoOutlinedIcon fontSize="large" />
                </IconButton>
              )}
            </Avatar>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="avatar-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
            <ErrorMessage error={errors.Avatar} />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Profile
            </Typography>
            <Box sx={{ display: "grid", gap: 2 }}>
              {profile
                .filter(
                  (field) =>
                    field.name !== "Avatar" &&
                    field.name !== "Visibility" &&
                    field.name !== "Link" &&
                    field.name !== "Interests"
                )
                .map((field) => (
                  <PlaceholderInput
                    label={field.name}
                    key={field.name}
                    {...field}
                    error={errors[field.name]}
                    onChange={handleChange}
                  />
                ))}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h7"
                sx={{ color: "#49535C", fontSize: "18px" }}
              >
                Show your profile in Launchpad?
              </Typography>
              <RadioGroup
                sx={{ maxHeight: "32px" }}
                row
                value={
                  profile.find((field) => field.name === "Visibility")?.value ||
                  "Private"
                }
                onChange={handleVisibilityChange}
              >
                <FormControlLabel
                  value="Private"
                  control={
                    <Radio
                      sx={{
                        color: "#49535C",
                        "&.Mui-checked": {
                          color: "#49535C",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ mr: 8 }} variant="body1" color="#49535C">
                      Private
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="Public"
                  control={
                    <Radio
                      sx={{
                        color: "#49535C",
                        "&.Mui-checked": {
                          color: "#49535C",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" color="#49535C">
                      Public
                    </Typography>
                  }
                />
              </RadioGroup>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h7"
                sx={{ color: "#49535C", fontSize: "18px" }}
              >
                The scopes of your interest:
              </Typography>
              {profile
                .find((field) => field.name === "Interests")
                ?.value?.map((interest, index) => (
                  <Button
                    key={index}
                    label={interest}
                    onClick={() => handleInterestRemove(interest)}
                    sx={{
                      ml: 1,
                      maxHeight: "24px",
                      borderColor: "#49535C",
                      borderRadius: "20px",
                      border: "1px solid #49535C",
                    }}
                  >
                    <Typography sx={{ color: "#49535C", fontSize: "12px" }}>
                      {interest}
                    </Typography>
                  </Button>
                ))}
              {showInterestPlaceholder && (
                <TextField
                  value={newInterest}
                  onChange={handleInterestChange}
                  placeholder="Add your interest"
                  variant="standard"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton sx={{ ml: 1 }} onClick={handleInterestAdd}>
                          <AddIcon sx={{ color: "#3888E7" }} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              {!showInterestPlaceholder && (
                <IconButton
                  borderRadius="10px"
                  sx={{ p: 0, mb: 0.5, ml: 1 }}
                  onClick={toggleInterestPlaceholder}
                >
                  <AddIcon sx={{ color: "#3888E7" }} />
                </IconButton>
              )}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h7"
                sx={{ color: "#49535C", fontSize: "18px" }}
              >
                Add your link:
              </Typography>
              {profile
                .find((field) => field.name === "Link")
                ?.value?.map((link, index) => (
                  <Button
                    key={index}
                    sx={{
                      mb: 1,
                      ml: 1,
                      maxHeight: "24px",
                      borderColor: "#49535C",
                      borderRadius: "20px",
                    }}
                  >
                    {" "}
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#49535C",
                        textDecoration: "underline",
                        cursor: "pointer",
                        mt: 1,
                      }}
                      component="a"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </Typography>
                    <IconButton
                      sx={{ fontSize: "12px", mt: 0.5 }}
                      key={index}
                      onClick={() => handleLinkRemove(link)}
                    >
                      <CloseIcon sx={{ color: "#49535C" }} />
                    </IconButton>
                  </Button>
                ))}
              {showLinks && (
                <>
                  <TextField
                    value={newLink}
                    onChange={handleLinkChange}
                    placeholder="Add your interest"
                    variant="standard"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton sx={{ ml: 1 }} onClick={handleLinkAdd}>
                            <AddIcon sx={{ color: "#3888E7" }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessage error={errors.newLink} />
                </>
              )}
              {!showLinks && (
                <IconButton
                  borderRadius="10px"
                  sx={{ p: 0, mb: 0.5, ml: 1 }}
                  onClick={toggleLink}
                >
                  <AddIcon sx={{ color: "#3888E7" }} />
                </IconButton>
              )}
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                color="#49535C"
                sx={{
                  borderColor: "#49535C",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={handleSave}
              >
                <Typography sx={{ color: "#49535C", minWidth: "100px" }}>
                  Save
                </Typography>
              </Button>
              <Button
                variant="outlined"
                color="#49535C"
                onClick={handleCancel}
                sx={{
                  borderColor: "#49535C",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Typography sx={{ color: "#49535C", minWidth: "100px" }}>
                  {" "}
                  Cancel{" "}
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default App;
