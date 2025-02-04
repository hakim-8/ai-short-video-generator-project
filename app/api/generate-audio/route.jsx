import { storage } from "@/configs/FirebaseConfig";
import textToSpeech from "@google-cloud/text-to-speech";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NextResponse } from "next/server";

const client = new textToSpeech.TextToSpeechClient({
    apiKey: process.env.GOOGLE_CLOUD_API_KEY,
});

export async function POST(req) {
    const { text, id } = await req.json();
    console.log('Request payload:', text, id);

    if (!text || !id) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const storageRef = ref(storage, `ai-short-video-files/${id}.mp3`);

    const request = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [response] = await client.synthesizeSpeech(request);

        if (!response.audioContent) {
            throw new Error("No audio content received from Google TTS");
        }

        const audioBuffer = Buffer.from(response.audioContent, 'binary');
        await uploadBytes(storageRef, audioBuffer, { contentType: 'audio/mp3' });

        const downloadUrl = await getDownloadURL(storageRef);
        console.log('Download URL:', downloadUrl);

        return NextResponse.json({ result: downloadUrl });
    } catch (error) {
        console.error('Error in GenerateAudio API:', error.stack || error);
        return NextResponse.json({ error: 'Google TTS failed' }, { status: 500 });
    }
}
