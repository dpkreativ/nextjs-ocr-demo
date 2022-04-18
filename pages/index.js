import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  // ========= STATE MGT =========
  const [imageSrc, setImageSrc] = useState();
  const [extractedText, setExtractedText] = useState('Extracted text here');

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
  const handleOnSubmit = (e) => {
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
              Detect text
            </button>
          </div>

          {/* Box: to display the extracted text */}
          <div className="w-full col-span-5 md:col-span-3 border-2 border-green-500 font-semibold text-gray-500 rounded-lg p-5">
            {extractedText}
          </div>
        </form>
      </main>
    </div>
  );
}
