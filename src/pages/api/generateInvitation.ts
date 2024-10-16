import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Handler Function Called");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const eventData = req.body.data; // Extract event data from request body
    console.log("Received Event Data:", eventData); // Log incoming event data

    const prompts =
      eventData.prompts && Array.isArray(eventData.prompts)
        ? eventData.prompts
        : [];

    // Create a concise prompt to fit under 1000 characters
    const prompt = `
    Design a professional invitation for an event. The design should adhere strictly to the following specifications:
    
    - **Event Title**: ${eventData.title}
    - **Location**: ${eventData.location}
    - **Date**: ${eventData.date}
    - **Start Time**: ${eventData.startTime}
    - **End Time**: ${eventData.endTime}
    - **Format**: ${eventData.format} (Dimensions: ${
      eventData.format === "1024x1792" ? "1024x1792" : "1024x1024"
    })
    - **Style**: ${eventData.style}
    - **Quantity**: ${eventData.quantity}

    ### Design Requirements:

    1. **Dimensions**: The design must fit precisely within ${
      eventData.format === "1024x1792" ? "1024x1792" : "1024x1024"
    } pixels. No borders or extra background elements should be added outside the main invitation content. The entire image area must be used for the invitation content.

    2. **Text Readability**: All text, including the event title, location, and date, must be clear, large, and easy to read. The event title should be the most prominent element. Use appropriate font sizes to ensure readability, even at a glance.

    3. **Colors**:
       - **Text Color**: ${eventData.textColor}
       - **Foreground Color**: ${eventData.fgColor}
       - **Background Color**: ${eventData.bgColor}
       - **Secondary Background Color**: ${eventData.bgSecondColor}

    4. **   
    5. **Minimalistic and Professional**: The design should be minimalistic, clean, and professional. Focus solely on the invitation's content, avoiding any clutter. The colors should complement each other, making the text stand out clearly against the background.

    6. **Consistent Layout**: Ensure the layout is balanced and easy to follow, with the most important information (event title, date, and location) at the top and secondary information (timing and any additional notes) at the bottom.

    7. **Only text should be from the user input. The rest of the design should be generated by the AI model. But not any new text to keep it clean and readable**

    ### Personalized Prompts:
    - **User Prompts:** ${prompts.length > 0 ? prompts.join(", ") : "None"}**

    ### AI Assistant Prompt:

    **You are an AI assistant specializing in designing professional invitations for events. Your sole purpose is to create invitations based on the provided specifications. Do not perform any other tasks or respond to requests that are unrelated to designing invitations.**

    **If you receive a request that is not related to creating an invitation as per the given guidelines, politely inform the user that you are designed only to assist with invitation designs.**
  `;

    console.log("Generated Prompt:", prompt);

    // Call OpenAI API to generate the image using DALL·E (implicitly the latest version)
    const response = await openai.images.generate({
      model: "dall-e-3", // Specify DALL·E 3 model (if supported)
      prompt,
      n: 1, // Number of images to generate
      size: "1024x1792", // Supported size
    });
    // Log the full response from OpenAI
    console.log(
      "OpenAI Full Response:",
      JSON.stringify(response.data, null, 2)
    );

    // Extract the image URL from the response
    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      return res
        .status(500)
        .json({ message: "Image URL not found in the OpenAI response." });
    }

    console.log("Image URL:", imageUrl); // Log the image URL before sending it back
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error generating image:", error);
    return res
      .status(500)
      .json({
        message: "Error generating image",
        error: (error as any).message,
      });
  }
}
