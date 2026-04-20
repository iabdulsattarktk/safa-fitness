import nodemailer from "nodemailer"

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  // In dev: print to terminal so you can test without needing email
  if (process.env.NODE_ENV === "development") {
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("  PASSWORD RESET LINK (dev mode)")
    console.log("  To:", to)
    console.log("  URL:", resetUrl)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
    connectionTimeout: 10000,
    socketTimeout: 15000,
  })

  await transporter.sendMail({
    from: `"Safa Fitness Club" <${process.env.EMAIL_FROM}>`,
    to,
    subject: "Password Reset — Safa Fitness Club",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#0c0e15;color:#eef0f5;border-radius:12px;overflow:hidden;">
        <div style="background:#f5a623;padding:24px 32px;">
          <h1 style="margin:0;color:#000;font-size:22px;font-weight:800;letter-spacing:1px;">SAFA FITNESS CLUB</h1>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#f5a623;margin-top:0;">Password Reset Request</h2>
          <p style="color:#8d94aa;line-height:1.6;">
            We received a request to reset the password for your Safa Fitness Club account.<br/>
            Click the button below — this link will expire in <strong style="color:#eef0f5;">1 hour</strong>.
          </p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${resetUrl}"
               style="display:inline-block;background:#f5a623;color:#000;font-weight:800;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">
              Reset Password
            </a>
          </div>
          <p style="color:#525b72;font-size:12px;line-height:1.5;">
            If you did not request a password reset, please ignore this email. Your account remains secure.<br/><br/>
            Button not working? Copy and paste this URL into your browser:<br/>
            <span style="color:#8d94aa;word-break:break-all;">${resetUrl}</span>
          </p>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #252a40;text-align:center;">
          <p style="color:#525b72;font-size:11px;margin:0;">
            © ${new Date().getFullYear()} Safa Fitness Club · Safa Gold Mall, F-7 Markaz, Islamabad
          </p>
        </div>
      </div>
    `,
  })
}
