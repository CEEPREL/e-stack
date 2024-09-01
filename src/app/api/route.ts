// // /pages/api/fileUpload.ts

// import type { NextApiRequest, NextApiResponse } from "next";
// import fs from "fs";
// import path from "path";

// export default function fileUpload(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     try {
//       const { id, fileName, file } = req.body;

//       // Validate incoming data
//       if (!id || !fileName || !file) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Missing required fields." });
//       }

//       const fileExtension = fileName.split(".").pop();
//       if (!fileExtension) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid file name." });
//       }

//       const imagesDir = path.join(process.cwd(), "public", "images");
//       if (!fs.existsSync(imagesDir)) {
//         fs.mkdirSync(imagesDir, { recursive: true });
//       }

//       const filePath = path.join(imagesDir, `${id}.${fileExtension}`);

//       console.log(filePath);

//       const imageBuffer = Buffer.from(file, "base64");

//       fs.writeFileSync(filePath, imageBuffer);

//       res
//         .status(200)
//         .json({ success: true, path: `/images/${id}.${fileExtension}` });
//     } catch (error) {
//       console.error("Error saving image:", error);
//       res.status(500).json({ success: false, message: "Error saving image" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
