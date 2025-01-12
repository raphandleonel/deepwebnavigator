import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import useContactForm from "@/hooks/useContactForm"; // Importing our custom hook
import Script from "next/script";
import Head from "next/head";
import { truncateUrl } from "@/utils/truncate";
const siteUrl = "https://darkwebnavigator.com";
const pageTitle = "Contact Us | Dark Web Navigator";
const pageDescription =
  "Have questions or need assistance? Contact Dark Web Navigator for inquiries about navigating the dark web, listing your service, or exploring darknet forums and tools.";
const ogImage = `${siteUrl}/logo.png`;
const ogUrl = `${siteUrl}/contact-us`;

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
    mathChallenge,
  } = useContactForm();

  return (
    <div className="min-h-screen py-12 sm:px-6 lg:px-8 bg-background text-foreground">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@darkwebnavigator" />

        {/* Canonical Tag */}
        <link rel="canonical" href={ogUrl} />
      </Head>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BBGWDRZQGK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BBGWDRZQGK');
        `}
      </Script>
      <div className="max-w-2xl mx-auto rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Jabber Address Field */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              className="shadow-sm bg-gray-50 dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
            />
          </div>

          {/* Message Field */}
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
              className="text-gray-900 dark:text-white mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500"
            />
          </div>

          {/* Math Challenge */}
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-900 dark:text-white">
              {mathChallenge.question}
            </label>
            <input
              type="number"
              name="mathAnswer"
              value={formState.mathAnswer}
              onChange={handleChange}
              required
              className="mt-2 p-3 border text-gray-900 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
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
          <h3 className="text-xl font-semibold">Useful Links</h3>
          <ul className="space-y-2">
            {[
              "darkwebnavigator@jabb3r.de",
              "dreadytofatroptsdj6io7l3xptbet6onoyno2yv7jicoxknyazubrad.onion/u/DarkWebNavigator/",
            ].map((link, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-background rounded-lg shadow-sm"
              >
                <span className="truncate">{truncateUrl(link, 45)}</span>
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
