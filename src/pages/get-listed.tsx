import useGetListedForm from "@/hooks/useGetListedForm"; // Importing our custom hook
import { ogImage, siteUrl } from "@/utils/constants";
import Head from "next/head";
import Script from "next/script";

const cryptocurrenciesList = [
  { value: "BTC", label: "Bitcoin (BTC)" },
  { value: "ETH", label: "Ethereum (ETH)" },
  { value: "XMR", label: "Monero (XMR)" },
  { value: "LTC", label: "Litecoin (LTC)" },
];

const GetListedPage = () => {
  const {
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
    mathChallenge,
  } = useGetListedForm();
  const pageDescription =
    "Apply to get listed on Dark Web Navigator, the trusted resource for exploring the dark web. Showcase your marketplace, service, or forum to our growing audience.";
  const pageTitle = "Get Listed on Dark Web Navigator - Join the Network";
  return (
    <div className="py-12 sm:px-6 lg:px-8 mx-auto p-6 max-w-3xl bg-background text-foreground rounded-lg">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@darkwebnav" />
        {/* Canonical Tag */}
        <link rel="canonical" href={`${siteUrl}/get-listed`} />
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
      <h1 className="text-2xl font-bold mb-4">
        Get Your Market, Shop or Forum Listed
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Status Message */}
        {status === "error" && <div className="text-red-600">{error}</div>}
        {status === "success" && (
          <div className="text-green-600">
            Your application has been submitted successfully!
          </div>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name of Market, Shop, or Forum
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            placeholder="Tor Market"
            onChange={handleChange}
            required
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Mirror Links Field */}
        <div className="mb-4">
          <label htmlFor="mirrorLinks" className="block">
            Mirror Links
          </label>
          {formData.mirrorLinks.map((link, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="url"
                name="mirrorLinks"
                value={link}
                onChange={(e) => handleMirrorLinkChange(e, index)}
                required
                placeholder="readytofatroptsdj6io7l3xptbet6o48fv7jicoxknyazubrad.onion"
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {formData.mirrorLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMirrorLink(index)}
                  className="ml-2 text-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMirrorLink}
            className="text-blue-600"
          >
            Add Another Link
          </button>
        </div>

        {/* Type Field */}
        <div className="mb-4">
          <label className="block">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="market">Market</option>
            <option value="shop">Shop</option>
            <option value="forum">Forum</option>
          </select>
        </div>

        {/* PGP Key Link Field (for Market only) */}
        {formData.type === "market" && (
          <div className="mb-4">
            <label htmlFor="pgpKeyLink" className="block">
              PGP Key Link
            </label>
            <input
              type="url"
              id="pgpKeyLink"
              name="pgpKeyLink"
              value={formData.pgpKeyLink}
              onChange={handleChange}
              placeholder="dreadytofatroxxio7l3xptbet6onoxxyv7jicoxknyazubrad.onion/pgp.txt"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {/* Banner Upload Field */}
        <div className="mb-4">
          <label htmlFor="banner" className="block">
            Banner (1024x512, Max 1MB)
          </label>
          <input
            type="file"
            name="banner"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Cryptocurrencies Field */}
        <div className="mb-4">
          <label className="block">Cryptocurrencies Accepted</label>
          <div className="space-y-2">
            {cryptocurrenciesList.map((crypto) => (
              <div key={crypto.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="cryptocurrencies"
                  value={crypto.value}
                  onChange={handleSelectChange}
                  checked={formData.cryptocurrencies.includes(crypto.value)}
                  className="mr-2"
                />
                <label>{crypto.label}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Jabber Address Field */}
        <div className="mb-4">
          <label htmlFor="jabberAddress" className="block">
            Jabber Address
          </label>
          <input
            type="text"
            name="jabberAddress"
            id="jabberAddress"
            value={formData.jabberAddress}
            onChange={handleChange}
            placeholder="username@jabber.de"
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            minLength={50}
            maxLength={1000}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        {/* Math Challenge */}
        <div className="mb-4">
          <label className="block">{mathChallenge.question}</label>
          <input
            type="number"
            name="mathAnswer"
            value={formData.mathAnswer}
            onChange={handleChange}
            required
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full p-3 bg-blue-600 text-white rounded-lg ${status === "loading" ? "opacity-50" : ""}`}
          >
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetListedPage;
