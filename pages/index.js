import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  // ========= STATE MGT =========
  const [imageSrc, setImageSrc] = useState();
  const [extractedText, setExtractedText] = useState('Extracted text here');
  const [loading, setLoading] = useState(false);

  // ========= FUNCTIONS =========
  // OnChange function
  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  // OnSubmit function
  const handleOnSubmit = async (e) => {
    e.preventDefault();
  };

  // ========= RENDER UI =========
  return (
    <div>
      <Head>
        <title>NextJS OCR Starter</title>
        <meta name="description" content="Starter file for NextJS OCR Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-5 w-full max-w-4xl mx-auto">
        <h1 className="text-center font-bold text-2xl">NextJS OCR Demo</h1>

        {/* Form: to handle image upload and text extraction */}
        <form
          action="post"
          onChange={handleOnChange}
          onSubmit={handleOnSubmit}
          className="mt-5 grid gap-5 md:grid-cols-5"
        >
          {/* Image Box: to store and preview the image before text extraction begins */}
          <div className="w-full h-72 col-span-5 md:col-span-2">
            {imageSrc && (
              <img
                src={imageSrc}
                alt="uploaded image"
                className="object-contain h-full w-full"
              />
            )}
          </div>

          {/* Input: to select the image from your local directory */}
          <div className="w-full col-span-2 md:order-last relative">
            <input
              type="file"
              name="file"
              className="absolute z-10 w-32 h-12 opacity-0"
            />
            <label
              htmlFor="file"
              className="bg-blue-500 text-white rounded-lg shadow-md p-3 block relative w-32 h-12 text-center"
            >
              Select image
            </label>
          </div>

          {/* Button: to trigger text extraction using Cloudinary's OCR */}
          <div className="w-max col-span-3 justify-self-end md:justify-self-start md:order-last">
            <button
              type="submit"
              className="bg-green-500 text-white rounded-lg shadow-md p-3"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <LoadingSVG />
                  Detecting text...
                </span>
              ) : (
                <span>Detect text</span>
              )}
            </button>
          </div>

          {/* Box: to display the extracted text */}
          <div className="w-full max-h-72 overflow-hidden col-span-5 md:col-span-3 border-2 border-green-500 font-semibold text-gray-500 rounded-lg">
            <div className="overflow-y-scroll break-words w-full h-full p-5">
              {extractedText}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

// ========= LOADING SVG COMPONENT =========
const LoadingSVG = () => {
  return (
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
