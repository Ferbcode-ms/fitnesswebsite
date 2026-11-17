# Admin User Setup & Provisioning Guide

## Overview
This document explains how to securely provision the initial administrator account for the women's fitness coaching platform.

To maintain strict security:
- **Public registration is disabled.**
- Anyone visiting `/admin/login` can only authenticate with credentials that exist in both Supabase Auth (`auth.users`) and the internal `public.admin_profiles` table.
- Standard users cannot promote themselves to administrators.

---

## Method 1: Using the CLI Provisioning Script (Recommended)

A secure CLI script is provided in `scripts/create-admin.mjs`.

### Requirements
Ensure `.env.local` contains your Supabase project keys:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

### Execution
Run the script with the desired email, password, and full name:

```bash
node scripts/create-admin.mjs coach@fitness.com YourStrongPassword123! "Head Coach"
```

The script will:
1. Create the user in `auth.users` with `email_confirm: true`.
2. Insert a corresponding record into `public.admin_profiles` with `role: 'super_admin'`.
3. Output a success confirmation.

You can then immediately log in at `/admin/login`.

---

## Method 2: Manual Provisioning via Supabase Dashboard

If you prefer to provision manually via the Supabase Dashboard:

1. **Create Auth User:**
   - In your Supabase Dashboard, navigate to **Authentication -> Users**.
   - Click **Add User** -> **Create user**.
   - Enter your email and a strong password.
   - Check **Auto Confirm User?** and click **Create user**.
   - Copy the generated **User UID** (e.g. `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

2. **Register Admin Profile:**
   - Navigate to the **SQL Editor** in the Supabase Dashboard.
   - Execute the following query (replace the UID and email with your values):

```sql
INSERT INTO public.admin_profiles (id, email, full_name, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890', -- Replace with the User UID from Step 1
  'coach@fitness.com',
  'Head Coach',
  'super_admin'
)
ON CONFLICT (id) DO UPDATE
SET role = 'super_admin';
```

---

## 3. Logging into the Dashboard

1. Navigate to `http://localhost:3000/admin/login` (or your production URL `/admin/login`).
2. Enter your administrator email and password.
3. Upon authentication, you will be redirected to `/admin` overview dashboard.

---

## 4. Resetting Admin Passwords

If an administrator forgets their password:
1. The super-admin can send a password recovery email via Supabase Auth Dashboard -> **Send password recovery**.
2. Alternatively, use the Supabase Dashboard user management panel to update the password directly.

