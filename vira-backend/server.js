const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const youtubedl = require('yt-dlp-exec');
const fs = require('fs');
const path = require('path');

// 1. Load the environment variables
require('dotenv').config();

// 2. DEBUG LOGS (Check your terminal after saving)
console.log("--- VIRA BACKEND STARTUP ---");
console.log("Checking SUPABASE_URL:", process.env.SUPABASE_URL ? "FOUND ✅" : "NOT FOUND ❌");
console.log("Checking SUPABASE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "FOUND ✅" : "NOT FOUND ❌");
console.log("----------------------------");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 3. Stop the crash with a helpful message
if (!supabaseUrl || !supabaseKey) {
  console.error("CRITICAL ERROR: Supabase keys are missing in .env file. Fix this and restart.");
  process.exit(1); 
}

const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
// ... rest of your code

// Endpoint to import video from URL
app.post('/api/import-url', async (req, res) => {
  const { url, userId } = req.body;

  try {
    const tempFilePath = path.join(__dirname, `temp_${Date.now()}.mp4`);
    
    // 1. Download video using yt-dlp
    await youtubedl(url, {
      output: tempFilePath,
      format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
    });

    // 2. Read file and upload to Supabase Storage
    const fileBuffer = fs.readFileSync(tempFilePath);
    const fileName = `${userId}/imports/${Date.now()}.mp4`;

    const { data, error } = await supabase.storage
      .from('vira-media')
      .upload(fileName, fileBuffer, { contentType: 'video/mp4' });

    // 3. Cleanup temp file
    fs.unlinkSync(tempFilePath);

    if (error) throw error;

    // 4. Save project to DB
    const { data: project, error: dbError } = await supabase
      .from('projects')
      .insert([{ user_id: userId, title: 'Imported Video', original_video_url: data.path }])
      .select();

    res.status(200).json({ message: 'Import successful', project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to import video' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post('/api/process-upload', async (req, res) => {
  const { storagePath, userId } = req.body;
  
  try {
    console.log(`Processing file at: ${storagePath} for user: ${userId}`);
    
    // This is where Phase 5 (FFmpeg) and Phase 6 (AI) will eventually go.
    // For now, we just acknowledge receipt.
    res.status(200).json({ message: 'File received and queued for processing' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to queue processing' });
  }
});