import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import useContactForm from "@/hooks/useContactForm"; // Importing our custom hook

export default function ContactUsPage() {
  const {
    formState,
    handleChange,
    handleSubmit,
    status,
    isSubmitting,
    isCopied,
    handleCopy,
    copiedIndex,
  } = useContactForm();

  return (
    <div className="min-h-screen bg-background py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-foreground rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-background mb-6">
          Contact Us
        </h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-background"
            >
              Jabber Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formState.email}
              placeholder="username@jab.de"
              onChange={handleChange}
              required
              className="mt-2 p-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-sm font-medium text-background"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formState.message}
              onChange={handleChange}
              required
              className="text-gray-900 mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 text-white rounded-lg ${isSubmitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} transition-all`}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {/* Status Message */}
        {status && (
          <div
            className={`mt-6 text-center py-4 px-6 rounded-md ${
              status.includes("Thank you")
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            <p>{status}</p>
          </div>
        )}

        {/* Market Links Section */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold text-background">
            Useful Links
          </h3>
          <ul className="space-y-2">
            {[
              "dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion",
              "anubismarket@jabb3r.de",
            ].map((link, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-background p-4 rounded-lg shadow-sm"
              >
                <span className="truncate">{link}</span>
                <button
                  onClick={() => handleCopy(link, index)}
                  className="ml-4 p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {isCopied && copiedIndex === index ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <ClipboardDocumentIcon className="w-5 h-5" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}