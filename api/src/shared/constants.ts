import { config } from './config'

export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
} as const

export type statusTypes = 'active' | 'blocked'
export type verificationTypes = 'accepted' | 'rejected' | 'pending'
export type TRole = 'customer' | 'admin' | 'vendor'

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  TOO_MANY_REQUESTS: 429,

  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in',
  REGISTRATION_SUCCESS: 'Registration completed',
  OTP_SEND_SUCCESS: 'OTP sent',
  OTP_VERIFIED: 'OTP verified',
  VERIFICATION_SUCCESS: 'Verification done',
  OPERATION_SUCCESS: 'Action completed',
  PASSWORD_RESET_SUCCESS: 'Password reset',
  LOGOUT_SUCCESS: 'Logged out',
  EMAIL_SENT_SUCCESSFULLY: 'Email sent',
  APPROVAL_REQUEST_SENT: 'Approval request send to the admin',
  PROFILE_FETCHED_SUCCESSFULLY: ' Profile fetched successfully',
  PROFILE_UPDATED_SUCCESSFULLY: 'Profile updated successfully',
  UPDATED: 'Successfully Updated.',
  FILE_UPLOAD_SUCCESS: 'File upload successfully.',
  USER_LOGOUT_SUCCESS: 'Logged out successfully.',
  REFRESH_TOKEN_REFRESHED_SUCCESS: 'Refresh Token Refreshed Successfully',
  USERS_FOUND: 'Users Found Successfully',
  BLOCK_STATUS_OF_USER_CHANGED_SUCCESSFULLY:
    'Block Status Changed Successfully.',
}

export const ERROR_MESSAGES = {
  TOKEN_EXPIRED: 'Session expired, please log in again', //----------
  TOKEN_BLACKLISTED: 'Token is blacklisted', //---------
  EMAIL_NOT_FOUND: 'Email not found',
  EMAIL_EXISTS: 'Email already registered',
  INVALID_ROLE: 'Access denied',
  DATABASE_ERROR: 'Database Error',
  VENDOR_PERMISSION_DENIED:
    'Access denied. Your account is not approved to join.',
  NOT_ALLOWED: "You can't do this action",
  LATITUDE_LONGITUDE_REQUIRED: 'Latitude and longitude are required',
  ACCOUNT_UNDER_VERIFICATION:
    'Your account is under verification. Please wait for admin approval.',
  FAILED_TO_FETCH_TURF_DETAILS: 'Failed to fetch turf details',
  PENDING_ADMIN_APPROVAL: 'Your request is not approved by admin',
  SERVER_ERROR: 'Something went wrong try again later',
  VALIDATION_ERROR: 'Check your inputs and try again',
  UNAUTHORIZED_ACCESS: 'Unathorized access', //-----------------
  BLOCKED: 'Your account has been blocked.', //----------------
  INVALID_CREDENTIALS: 'Wrong email or password',
  INVALID_OTP: 'Invalid or expired otp',
  USER_NOT_FOUND: 'User not found',
  INVALID_TOKEN: 'Invalid session please login again',
  SAME_CURR_NEW_PASSWORD:
    'New password must be different from current password',
  UPDATE_FAILED: 'failed to update profile',
  FILE_NOT_FOUND: 'File not found.',
  PASSWORD_REQUIRED: 'Password required',
  USERS_NOT_FOUND: 'Users not found',
  STATUS_ALREADY_EXISTS: 'Status already exists.',
}

export const VERIFICATION_MAIL_CONTENT = (otp: string) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
  <!-- Logo and Brand -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 46px; font-weight: bold; margin: 0;">
      🛠️ <span style="color: #007BFF;">Fixora</span>
    </h1>
  </div>

  <h2 style="color: #007BFF; text-align: center; margin-bottom: 25px;">
    Welcome to Fixora – Your Trusted Service Partner! ⚡
  </h2>

  <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
    From home repairs to appliance services, we’ve got you covered! Book expert technicians in just a few clicks and enjoy hassle-free service at your doorstep. 🏡🔧
  </p>

  <div style="background-color: #f9f9f9; border-radius: 8px; padding: 25px; margin: 25px 0; text-align: center;">
    <p style="margin-bottom: 10px; font-size: 16px;">Your verification code is:</p>
    <h1 style="background-color: #eef5ff; color: #007BFF; font-size: 36px; margin: 10px 0; padding: 20px; border-radius: 8px; letter-spacing: 5px;">
      ${otp.trim()}
    </h1>
    <p style="color: #666; font-size: 14px;">
      ⏰ This code will expire in 1 minute.
    </p>
  </div>

  <p style="font-size: 14px; color: #666; margin-top: 15px;">
    🔒 Please do not share this code with anyone for your account’s security.
  </p>

  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
    <p style="font-size: 14px; color: #888;">
      Need assistance? Our support team is ready to help 💬<br>
      Contact us at 
      <a href="mailto:support@fixora.in" style="color: #007BFF; text-decoration: none;">support@fixora.in</a>
    </p>
  </div>

  <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
    © ${new Date().getFullYear()} Fixora. All rights reserved.
  </div>
</div>
`
export const PASSWORD_RESET_MAIL_CONTENT = (resetLink: string) => `
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; background: #fff;">

  <!-- Logo Section -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 48px; font-weight: bold; margin: 0;">
      🛠️ <span style="color: #1E90FF;">Fixora</span>
    </h1>
  </div>

  <!-- Heading -->
  <div style="text-align: center; margin-bottom: 30px;">
    <h2 style="color: #1E90FF; font-size: 28px; margin: 0;">
      Password Reset Request 🔐
    </h2>
    <p style="color: #666; font-size: 16px; margin: 10px 0 0 0;">
      Don't worry, we'll help you get back to booking services in no time! ✨
    </p>
  </div>

  <!-- Message Box -->
  <div style="border-radius: 15px; padding: 25px; margin-bottom: 25px; background: linear-gradient(to bottom, #fff, #f6f9ff);">
    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
      We received a request to reset your password for your Fixora account. 
      Your security is our top priority! 🛡️
    </p>

    <!-- Action Button -->
    <div style="border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center;">
      <p style="margin-bottom: 20px; font-size: 16px; color: #444;">
        Click the button below to securely reset your password:
      </p>
      <a href="${resetLink}" 
         style="background-color: #1E90FF; color: white; padding: 16px 40px; 
                text-decoration: none; border-radius: 8px; font-weight: 500; 
                display: inline-block; margin: 10px 0; font-size: 16px; 
                box-shadow: 0 2px 4px rgba(30, 144, 255, 0.2); transition: all 0.3s ease;
                max-width: 100%;"
         onmouseover="this.style.backgroundColor='#1C86EE'"
         onmouseout="this.style.backgroundColor='#1E90FF'"
         rel="noopener noreferrer"
      >
        Reset Password 🔐
      </a>
      <p style="color: #666; font-size: 14px; margin-top: 20px;">
        ⏰ For security, this link expires in 10 minutes
      </p>
    </div>
  </div>

  <!-- Security Tips -->
  <div style="border-radius: 8px; padding: 20px; margin: 25px 0; background-color: #E8F0FE; box-shadow: 0 2px 8px rgba(30, 144, 255, 0.15);">
    <div style="text-align: left; margin-bottom: 15px; display: flex; align-items: center;">
      <span style="font-size: 24px; margin-right: 10px;">⚠️</span>
      <h3 style="color: #0B3D91; margin: 0; font-size: 18px;">Security Reminders</h3>
    </div>
    <ul style="list-style: none; padding: 0; margin: 0;">
      <li style="font-size: 14px; color: #0B3D91; margin: 8px 0; display: flex; align-items: center;">
        <span style="color: #1E90FF; margin-right: 8px;">•</span> Never share this link with anyone
      </li>
      <li style="font-size: 14px; color: #0B3D91; margin: 8px 0; display: flex; align-items: center;">
        <span style="color: #1E90FF; margin-right: 8px;">•</span> Fixora will never ask for your password
      </li>
      <li style="font-size: 14px; color: #0B3D91; margin: 8px 0; display: flex; align-items: center;">
        <span style="color: #1E90FF; margin-right: 8px;">•</span> Ensure you're on our official website before logging in
      </li>
    </ul>
  </div>

  <!-- Footer -->
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
    <p style="font-size: 14px; color: #888;">
      Need help? We're here for you! 💡<br>
      Contact us at <a href="mailto:support@fixora.com" style="color: #1E90FF; text-decoration: none;">support@fixora.com</a>
    </p>
  </div>

  <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
    © ${new Date().getFullYear()} Fixora. All rights reserved.<br>
    <span style="color: #1E90FF;">✦</span> Your Services, Our Priority <span style="color: #1E90FF;">✦</span>
  </div>

</div>
`
