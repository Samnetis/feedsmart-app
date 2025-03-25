import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Simulate a successful response for PIN resend
    return NextResponse.json({
      success: true,
      message: "PIN resent successfully",
    });
  } catch (error) {
    console.error("PIN resend error:", error);
    return NextResponse.json(
      { message: "An error occurred while resending PIN" },
      { status: 500 }
    );
  }
}

