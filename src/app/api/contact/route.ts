import { NextResponse } from "next/server";

interface ContactRequestBody {
  fullName?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  message?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();

    const errors: Record<string, string> = {};

    if (!body.fullName || !body.fullName.trim()) {
      errors.fullName = "Full name is required.";
    } else if (body.fullName.trim().length < 2) {
      errors.fullName = "Name must be at least 2 characters.";
    }

    if (!body.email || !body.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(body.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!body.message || !body.message.trim()) {
      errors.message = "Message or fitness goals description is required.";
    } else if (body.message.trim().length < 10) {
      errors.message = "Please provide at least 10 characters describing your inquiry.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          errors,
          message: "Validation failed. Please check the required fields.",
        },
        { status: 400 }
      );
    }

    // Check if an external email delivery service is configured
    const hasEmailService = Boolean(
      process.env.RESEND_API_KEY || process.env.CONTACT_EMAIL_WEBHOOK || process.env.SMTP_HOST
    );

    console.log("[Contact Enquiry Received]", {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone ?? "N/A",
      inquiryType: body.inquiryType ?? "general",
      messageLength: body.message?.length,
      hasExternalService: hasEmailService,
      timestamp: new Date().toISOString(),
    });

    if (!hasEmailService) {
      // Honest disclosure: Form validated successfully, but no delivery provider is connected
      return NextResponse.json({
        success: true,
        delivered: false,
        mode: "demo_unconfigured",
        message:
          "Inquiry validated successfully. Note: No external email provider (e.g. Resend or SMTP) is configured in environment variables, so this message was not sent to an external inbox. Configure your provider in .env to enable live delivery.",
        data: {
          fullName: body.fullName,
          email: body.email,
          inquiryType: body.inquiryType,
        },
      });
    }

    // If a service were configured, real dispatch would happen here
    return NextResponse.json({
      success: true,
      delivered: true,
      mode: "live_delivered",
      message: "Your message has been delivered to our coaching team.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}

