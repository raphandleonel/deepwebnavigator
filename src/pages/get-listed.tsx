import useGetListedForm from "@/hooks/useGetListedForm"; // Import the custom hook
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

  return (
    <div className="py-12 sm:px-6 lg:px-8 mx-auto p-6 max-w-3xl border bg-white text-gray-900 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">
        Get Your Market, Shop or Forum Listed
      </h1>
      <form onSubmit={handleSubmit}>
        {status === "error" && <div className="text-red-600">{error}</div>}
        {status === "success" && (
          <div className="text-green-600">
            Your application has been submitted successfully!
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="name" className="block">
            Name of Market, Shop, or Forum
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Tor Market"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mirrorLinks" className="block">
            Mirror Links
          </label>
          {formData.mirrorLinks.map((link, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="url"
                name="mirrorLinks"
                placeholder="readytofatroptsdj6io7l3xptbet6o48fv7jicoxknyazubrad.onion"
                value={link}
                onChange={(e) => handleMirrorLinkChange(e, index)}
                required
                className="w-full p-2 border border-gray-300 rounded"
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

        <div className="mb-4">
          <label className="block">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleSelectChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="market">Market</option>
            <option value="shop">Shop</option>
            <option value="forum">Forum</option>
          </select>
        </div>

        {formData.type === "market" && (
          <div className="mb-4">
            <label htmlFor="pgpKeyLink" className="block">
              PGP Key Link
            </label>
            <input
              type="url"
              id="pgpKeyLink"
              placeholder="dreadytofatroxxio7l3xptbet6onoxxyv7jicoxknyazubrad.onion/pgp.txt"
              name="pgpKeyLink"
              value={formData.pgpKeyLink}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="banner" className="block">
            Banner (1024x512, Max 1MB)
          </label>
          <input
            type="file"
            name="banner"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

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
        <div className="mb-4">
          <label htmlFor="jabberAddress" className="block">
            Jabber Address
          </label>
          <input
            type="text"
            name="jabberAddress"
            id="jabberAddress"
            placeholder="username@jabber.de"
            value={formData.jabberAddress}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

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
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block">{mathChallenge.question}</label>
          <input
            type="number"
            name="mathAnswer"
            value={formData.mathAnswer}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </div>
        <div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full p-3 bg-blue-600 text-white rounded ${status === "loading" ? "opacity-50" : ""}`}
          >
            {status === "loading" ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetListedPage;
