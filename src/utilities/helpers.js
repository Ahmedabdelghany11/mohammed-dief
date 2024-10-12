export const handleChange = (e, setFormData) => {
  setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};
