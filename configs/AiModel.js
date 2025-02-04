const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a script for a 30 second video on the topic: Interesting historical story. Along with AI image prompts in rtealistic format for each scene and give me the result in json format with the fieldsimagePrompt and  contentText. Do not include sound effects or anything other than pure narration in the script portion of the result."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scenes\": [\n    {\n      \"imagePrompt\": \"A dimly lit, dusty library.  Ancient books with leather bindings and yellowed pages line tall shelves. A single shaft of light illuminates a man with spectacles, hunched over a large manuscript, his face in concentration. Realistic, historical setting, early 1800s.\",\n      \"contentText\": \"In the early 1800s, a brilliant but eccentric librarian named Sir Thomas Phillips dedicated his life to a singular obsession: collecting manuscripts.\"\n    },\n    {\n      \"imagePrompt\": \"A chaotic scene inside a large manor house. Papers and manuscripts are strewn across the floor, piled on tables, and spilling out of drawers. A frustrated maid is attempting to tidy up, her expression a mix of exasperation and disbelief. Realistic, historical setting, 1850s, focus on the chaotic piles.\",\n      \"contentText\": \"His insatiable appetite led him to amass over 60,000 documents. His home transformed into a paper-filled labyrinth.\"\n    },\n        {\n      \"imagePrompt\": \"Close up on a hand carefully turning the yellowed page of an old manuscript, the writing faded yet intricate. Focus on the texture of the paper and the delicate handwriting. Realistic, shallow depth of field.\",\n      \"contentText\": \"These weren't just any documents. They included rare and priceless medieval texts, lost historical records, and even secret royal correspondence.\"\n    },\n    {\n       \"imagePrompt\": \"A modern day librarian in a large climate-controlled archival storage area. The room is sterile and organized with rows of shelving containing neatly boxed manuscripts. The librarian is carefully holding and examining a manuscript from one of the boxes. Realistic, modern setting.\",\n      \"contentText\": \"Sir Thomas’s obsession might seem strange, but his collection continues to be an invaluable resource for historians today, revealing untold stories of the past.\"\n    }\n\n  ]\n}\n```\n"},
          ],
        },
      ],
    });
  
    