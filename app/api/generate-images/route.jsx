import { storage } from '@/configs/FirebaseConfig';
import axios from 'axios';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import FormData from 'form-data';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const {
      prompt,
      output_format = 'webp',
      aspect_ratio,
      seed,
      negative_prompt,
      style_preset,
    } = await req.json();

    // Construct the form data for the Stability AI API
    const form = new FormData();
    form.append('prompt', prompt);
    if (aspect_ratio) form.append('aspect_ratio', aspect_ratio);
    if (negative_prompt) form.append('negative_prompt', negative_prompt);
    if (seed) form.append('seed', seed);
    if (style_preset) form.append('style_preset', style_preset);
    form.append('output_format', output_format);

    const response = await axios.post(
      'https://api.stability.ai/v2beta/stable-image/generate/core',
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          Accept: 'image/*',
        },
        responseType: 'arraybuffer', // Expect binary image data
      }
    );

    if (response.status === 200) {
      // Convert the binary data to a base64 image
      const base64Image = Buffer.from(response.data).toString('base64');
      const convertedBase64Image = `data:image/png;base64,${base64Image}`;

      // Upload the image to Firebase Storage
      const fileName = `ai-short-video-files/${Date.now()}.png`;
      const storageRef = ref(storage, fileName);
      await uploadString(storageRef, convertedBase64Image, 'data_url');

      // Get the public URL for the uploaded file
      const downloadUrl = await getDownloadURL(storageRef);

      // Return the image URL in the response
      return NextResponse.json({ image: downloadUrl }, { status: 200 });
    } else {
      throw new Error(`Error generating image: ${response.status}`);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
