import { useState } from "react";

interface FormState {
  email: string;
  message: string;
}

const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedIndex, setCopyIndex] = useState<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contactUs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus("Thank you! Your message has been sent.");
        setFormState({ email: "", message: "" });
      } else {
        setStatus("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (link: string, index: number) => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setCopyIndex(index);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    status,
    isSubmitting,
    isCopied,
    handleCopy,
    copiedIndex,
  };
};

export default useContactForm;
