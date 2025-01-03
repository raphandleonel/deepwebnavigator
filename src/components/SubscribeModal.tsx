import { useState } from "react";

export default function SubscribeModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  // Open Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle the subscription logic here
    console.log("Email subscribed:", email);
    setEmail(""); // Clear email field
    closeModal();
  };

  return (
    <>
      {/* Subscribe Button */}
      <button
        onClick={openModal}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Subscribe
      </button>

      {/* Modal with Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 m-0 flex justify-center items-center overflow-y-auto overflow-x-hidden bg-gray-800 bg-opacity-50"
          onClick={closeModal}
          style={{ margin: 0 }}
        >
          <div
            className="relative w-full max-w-md max-h-full mx-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Subscribe to our Newsletter
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Enter your email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-2 p-3 border border-gray-300 rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-lg text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
