export const URL = "http://localhost:5000";

export const createConfigObj = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
