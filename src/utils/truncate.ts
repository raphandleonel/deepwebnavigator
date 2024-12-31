// Function to truncate the middle part of the URL while keeping the last 6 characters
export const truncateUrl = (url: string) => {
  const urlLength = url.length;
  const visibleChars = 6;
  if (urlLength <= visibleChars) {
    return url; // No truncation needed if the URL is shorter than the visible chars
  }
  const start = url.substring(0, urlLength - visibleChars);
  const end = url.substring(urlLength - visibleChars);
  return `${start.substring(0, 19)}...${end}`; // Customize number of chars before "..." as needed
};
