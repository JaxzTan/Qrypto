import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount } = body;

    // Fake delay
    await new Promise((res) => setTimeout(res, 1000));

    return NextResponse.json({
      success: true,
      message: "Payment successful",
      amount,
      transactionId: `blablabla_fake_id_${Date.now()}`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 500 }
    );
  }
}
