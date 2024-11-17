import express from "express";
import { spawn } from "child_process";

const router = express.Router();

router.post("/suggestions", (req, res) => {
  const userData = req.body;

  console.log("Request body received:", userData);

  const process = spawn("python", [
    "python_api/claude_api.py",
    JSON.stringify(userData),
  ]);

  let responseData = "";

  process.stdout.on("data", (data) => {
    responseData += data.toString();
  });

  process.on("close", (code) => {
    console.log("Python script exited with code:", code);

    if (code === 0) {
      try {
        const suggestions = JSON.parse(responseData);
        res.json(suggestions);
      } catch (err) {
        console.error("Error parsing Python script response:", err);
        if (!res.headersSent) {
          res
            .status(500)
            .json({ error: "Error parsing response from Python script" });
        }
      }
    } else {
      if (!res.headersSent) {
        res.status(500).json({ error: "Python script failed" });
      }
    }
  });

  process.stderr.on("data", (error) => {
    console.error("Python script error:", error.toString());
    if (!res.headersSent) {
      res.status(500).json({ error: "Python script error" });
    }
  });
});

export default router;
