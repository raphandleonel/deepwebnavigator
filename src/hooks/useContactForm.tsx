import { useEffect, useState } from "react";

interface FormState {
  email: string;
  message: string;
  mathAnswer: string; // User's answer to the math challenge
}

const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    message: "",
    mathAnswer: "", // User's math answer
  });
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [copiedIndex, setCopyIndex] = useState<number>(0);
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
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate math challenge answer before submission
    if (parseInt(formState.mathAnswer) !== mathChallenge.answer) {
      setStatus("Incorrect math answer. Please try again.");
      return;
    }
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
        setFormState({ email: "", message: "", mathAnswer: "" });
        generateMathChallenge();
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
    mathChallenge,
  };
};

export default useContactForm;
