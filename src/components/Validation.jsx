export const validateField = (name, value) => {
  switch (name) {
    case "First Name": // First Name
      if (!value) return "This field is required";
      if (value.length < 2 || value.length > 50)
        return "Must be between 2 and 50 characters";
      if (!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value))
        return "Only letters and spaces are allowed (e.g., 'Anna-Maria')";
      break;

    case "Last Name": // Last Name
      if (!value) return "This field is required";
      if (value.length < 2 || value.length > 50)
        return "Must be between 2 and 50 characters";
      if (!/^[A-Za-zА-Яа-яЁё\s-]+$/.test(value))
        return "Only letters and spaces are allowed";
      break;

    case "Position": // Position
      if (value && value.length > 100)
        return "Position cannot exceed 100 characters";
      if (value && !/^[A-Za-zА-Яа-яЁё0-9\s]+$/.test(value))
        return "Only letters, numbers, and spaces are allowed";
      break;

    case "Phone": // Phone Number
      if (!value) return "This field is required";
      if (!/^\+?\d{10,15}$/.test(value))
        return "Invalid phone number format (e.g., +79999999999)";
      break;

    case "Address": // Address
      if (value && value.length > 200)
        return "Address cannot exceed 200 characters";
      if (value && !/^[A-Za-zА-Яа-яЁё0-9\s,.\-]+$/.test(value))
        return "Only letters, numbers, commas, periods, hyphens, and spaces are allowed";
      break;

    case "Interests": // Interests
      if (value) {
        if (value.length > 10) return "Maximum of 10 tags";
        if (value.some((tag) => tag.length > 30))
          return "Each tag must not exceed 30 characters";
        if (value.some((tag) => !/^[A-Za-zА-Яа-яЁё0-9\s.,]+$/.test(tag)))
          return "Only letters, numbers, spaces, commas, and periods are allowed";
      }
      break;

    case "Link": // Link
      if (value && value.length > 200)
        return "Link cannot exceed 200 characters";
      if (value && !/^https?:\/\/\S+$/.test(value))
        return "Invalid URL (must start with http:// or https://)";
      break;

    // case "Avatar": // Avatar
    //   if (value) {
    //     const validFormats = /\.(jpg|jpeg|png)$/i;
    //     const maxSize = 5 * 1024 * 1024;
    //     if (!validFormats.test(value.name))
    //       return "Only .jpg, .jpeg, and .png formats are supported";
    //     if (value.size > maxSize) return "File size must not exceed 5 MB";
    //   }
    //   break;

    case "Visibility": // Public/Private Profile
      if (value !== "Public" && value !== "Private")
        return "Value must be 'Public' or 'Private'";
      break;

    default:
      return "";
  }
  return "";
};
