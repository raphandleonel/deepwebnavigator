import { IncomingForm } from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { client } from "@/sanity/lib/client";

// Ensure formidable is capable of handling multipart data
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to let formidable handle the parsing
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new IncomingForm();

    // This promise is used to handle the form data parsing asynchronously
    const formData = new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const { fields, files } = await formData;

      // Create the formatted data object
      const formattedData = {
        name: fields.name[0], // Extract from fields
        mirrorLinks: fields.mirrorLinks || [], // Extract mirror links (if any)
        type: fields.type[0], // Extract type
        pgpKeyLink:
          fields.type[0] === "market" ? fields.pgpKeyLink[0] : undefined,
        banner: files.banner ? files.banner[0] : undefined, // File handling (banner)
        cryptocurrencies: fields.cryptocurrencies || [],
        description: fields.description[0], // Extract description
        jabberAddress: fields.jabberAddress[0],
        createdAt: new Date().toISOString(),
        approved: false,
      };

      // Handle file upload
      if (formattedData.banner) {
        const bannerPath = formattedData.banner.filepath;
        const imageAsset = await client.assets.upload(
          "image",
          fs.createReadStream(bannerPath),
          {
            filename: formattedData.banner.originalFilename,
          }
        );

        // Attach the image reference to the formatted data
        formattedData.banner = {
          _type: "image",
          asset: { _ref: imageAsset._id },
        };
      }

      // Now create the document in Sanity
      const submission = await client.create({
        _type: "getListedApplication",
        ...formattedData,
      });

      res.status(200).json({ success: true, data: submission });
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ success: false, error: "Failed to submit form" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
};

export default handler;
