"use client";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router

export default function Page() {
  const router = useRouter(); // Now uses the correct hook for app directory

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(to right, rgba(255, 0, 0, 0.6), rgba(255, 255, 255, 0.6))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100%",
        }}
      >
        <img
          src="/robotic.jpg"
          alt="Side image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          position: "relative",
          zIndex: 1,
          paddingLeft: "20px",
          paddingRight: "20px",
          maxWidth: "800px",
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#888",
            fontSize: "12px",
            lineHeight: "1.6",
          }}
        >
          <strong>Disclaimer:</strong> This website is a portfolio project. If
          you're weary about signing in or would like to explore the range of
          videos this site can create, you can log in using the details below:
        </p>

        <div
          style={{
            color: "#888",
            fontSize: "12px",
            lineHeight: "1.6",
          }}
        >
          <p>
            <strong>Username:</strong> aivideouser123@gmail.com
          </p>
          <p>
            <strong>Password:</strong> AIuser123
          </p>
        </div>

        <p
          style={{
            color: "#888",
            fontSize: "12px",
            lineHeight: "1.6",
            marginBottom: "20px",
          }}
        >
          Please note that to generate a video with your own prompts, you must
          create an account, as each account is limited to generating one video.
        </p>

        {/* Add success callback for SignIn */}
        <SignIn afterSignInUrl="/dashboard" />
      </div>
    </div>
  );
}
