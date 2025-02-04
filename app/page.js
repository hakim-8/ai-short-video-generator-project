"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        backgroundImage: "url('/home.jpg')", // Path to your AI-themed background image
        backgroundSize: "cover", // Ensure the image covers the entire screen
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center", // Center the background image
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column", // Vertical layout for content
        justifyContent: "center", // Center content vertically
        alignItems: "flex-start", // Align text to the left
        padding: "40px", // Add padding for spacing
        color: "white", // Ensure text is visible against the background
        textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)", // Add text shadow for better contrast
      }}
    >
      {/* Welcome Text */}
      <div
        style={{
          maxWidth: "600px", // Limit width for better readability
          marginBottom: "30px", // Add space between text and buttons
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Welcome to META CLIPS AI
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
          }}
        >
          META CLIPS AI is your one-stop platform for generating AI-powered
          short videos tailored to your needs. Choose a topic or customize your
          prompt, select your preferred style, and set the duration to create
          engaging video clips effortlessly.
        </p>
      </div>

      {/* Buttons Section */}
      <div
        style={{
          display: "flex",
          gap: "20px", // Space between buttons
          marginTop: "10px", // Add spacing above buttons
        }}
      >
        <Button
          onClick={() => router.push("/sign-in")}
          style={{
            padding: "15px 40px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundColor: "#ff2625",
            color: "white",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.3s ease",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#174bdb";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ff2625";
            e.target.style.transform = "scale(1)";
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => router.push("/sign-up")}
          style={{
            padding: "15px 40px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            borderRadius: "10px",
            backgroundColor: "#ff2625",
            color: "white",
            cursor: "pointer",
            transition: "transform 0.2s ease, background-color 0.3s ease",
            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#174bdb";
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ff2625";
            e.target.style.transform = "scale(1)";
          }}
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
