# Gmail SMTP Setup and Verification

## Current status

- The enquiry endpoint is accepting requests successfully.
- However, email delivery can fail if the Gmail SMTP credentials are not valid.
- Current error from the server log may include:
  - `Error: Invalid login: 535 Authentication Failed`

## What this means

The app is configured to use Gmail SMTP, but Google may reject the login credentials.
The backend is still saving enquiries, but the mail is not being sent to `yathirai.in@gmail.com`.

## Current `.env` configuration

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=yathirai.in@gmail.com
EMAIL_PASS=swoxvzwpdzlvvpfw
EMAIL_FROM=yathirai.in@gmail.com
ENQUIRY_TO=yathirai.in@gmail.com
```

## Required fix

Gmail usually requires an app password instead of the account login password.

### Steps to fix

1. Sign in to your Google Account.
2. Enable two-factor authentication if it is not already enabled.
3. Create a Google app password for mail.
4. Replace `EMAIL_PASS` in `yathirai-mern/.env` with that app password.
5. Restart the backend server.

## How to verify

Run a dummy enquiry request against the API:

```powershell
Invoke-RestMethod -Uri http://localhost:5002/api/enquiry -Method Post -ContentType 'application/json' -Body (ConvertTo-Json @{name='Dummy Test'; email='dummy-test@yathirai.in'; phone='0000000000'; course='Dummy Course'; message='This is a dummy mail test for Zoho SMTP destination.'}) | ConvertTo-Json
```

Then check the server log:

- Successful email: no SMTP auth error and message sent.
- Failed email: `535 Authentication Failed` remains.

## Notes

- The API will continue to save enquiries even if the email send fails.
- For real delivery, Gmail SMTP credentials must be valid and allowed for SMTP use.
