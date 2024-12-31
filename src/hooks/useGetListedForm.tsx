import { useState } from "react";

interface GetListedFormData {
  name: string;
  mirrorLinks: string[];
  type: "market" | "shop" | "forum";
  pgpKeyLink: string;
  banner: File | null;
  cryptocurrencies: string[];
  description: string;
  jabberAddress: string;
}

const useGetListedForm = () => {
  const [formData, setFormData] = useState<GetListedFormData>({
    name: "",
    mirrorLinks: [""], // Start with one link field
    type: "market",
    pgpKeyLink: "",
    banner: null,
    cryptocurrencies: [],
    description: "",
    jabberAddress: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { name, value, checked } = e.target;
    console.log({ name, value, checked });
    setFormData((prevData) => {
      const updatedValues = checked
        ? [...prevData.cryptocurrencies, value]
        : prevData.cryptocurrencies.filter((currency) => currency !== value);

      return { ...prevData, [name]: updatedValues };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFormData((prevData) => ({ ...prevData, banner: file }));
    }
  };

  const handleMirrorLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLinks = [...formData.mirrorLinks];
    updatedLinks[index] = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      mirrorLinks: updatedLinks,
    }));
  };

  const addMirrorLink = () => {
    setFormData((prevData) => ({
      ...prevData,
      mirrorLinks: [...prevData.mirrorLinks, ""], // Add a new empty link
    }));
  };

  const removeMirrorLink = (index: number) => {
    const updatedLinks = formData.mirrorLinks.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      mirrorLinks: updatedLinks,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const formDataToSubmit = new FormData();

    // Append text fields directly
    Object.keys(formData).forEach((key) => {
      if (key === "mirrorLinks" || key === "cryptocurrencies") {
        // Handle arrays (mirrorLinks and cryptocurrencies)
        formData[key].forEach((item: string) =>
          formDataToSubmit.append(key, item)
        );
      } else if (key === "banner" && formData[key]) {
        // Handle the file upload (banner)
        formDataToSubmit.append("banner", formData[key]);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (formData[key] !== "") formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("/api/get-listed", {
        method: "POST",
        body: formDataToSubmit,
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({
          name: "",
          mirrorLinks: [""],
          type: "market",
          pgpKeyLink: "",
          banner: null,
          cryptocurrencies: [],
          description: "",
          jabberAddress: "",
        });
      } else {
        throw new Error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setError("Failed to submit form. Please try again later.");
    }
  };

  return {
    formData,
    status,
    error,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleMirrorLinkChange,
    addMirrorLink,
    removeMirrorLink,
    handleSubmit,
  };
};

export default useGetListedForm;
