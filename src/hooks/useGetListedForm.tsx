import { useEffect, useState } from "react";

interface GetListedFormData {
  name: string;
  mirrorLinks: string[];
  type: "market" | "shop" | "forum";
  pgpKeyLink: string;
  banner: File | null;
  cryptocurrencies: string[];
  description: string;
  jabberAddress: string;
  mathAnswer: string; // User's answer to the math challenge
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
    mathAnswer: "", // User's math answer
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  const [mathChallenge, setMathChallenge] = useState<{
    question: string;
    answer: number;
  }>({
    question: "",
    answer: 0,
  });

  // Generate a random math problem
  const generateMathChallenge = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const answer = num1 + num2;

    setMathChallenge({
      question: `${num1} + ${num2} = ?`,
      answer,
    });
  };
  useEffect(() => {
    generateMathChallenge(); // Generate a math challenge when the component mounts
  }, []);

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
    setFormData((prevData) => {
      const updatedValues =
        name === "type"
          ? value
          : checked
            ? [...prevData.cryptocurrencies, value]
            : prevData.cryptocurrencies.filter(
                (currency) => currency !== value
              );

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
    // Validate math challenge answer before submission
    if (parseInt(formData.mathAnswer) !== mathChallenge.answer) {
      setError("Incorrect math answer. Please try again.");
      setStatus("error");
      return;
    }
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
          mathAnswer: "",
        });
        generateMathChallenge(); // Regenerate a new math challenge after submission
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
    mathChallenge,
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
