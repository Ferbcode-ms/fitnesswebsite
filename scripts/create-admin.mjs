import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local if present, else .env
dotenv.config({ path: resolve(__dirname, "../.env.local") });
dotenv.config({ path: resolve(__dirname, "../.env") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local");
  process.exit(1);
}

const email = process.argv[2];
const password = process.argv[3];
const fullName = process.argv[4] || "Head Coach";

if (!email || !password) {
  console.log("Usage: node scripts/create-admin.mjs <email> <password> [full_name]");
  console.log("Example: node scripts/create-admin.mjs coach@fitness.com StrongPassword123! 'Head Coach'");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`🔐 Provisioning admin account for: ${email}...`);

  // 1. Create auth user with confirmed email
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (authError) {
    console.error("❌ Auth creation failed:", authError.message);
    process.exit(1);
  }

  const userId = authData.user.id;
  console.log(`✅ Auth user created with ID: ${userId}`);

  // 2. Insert into public.admin_profiles
  const { error: profileError } = await supabase.from("admin_profiles").upsert({
    id: userId,
    email,
    full_name: fullName,
    role: "super_admin",
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    console.error("❌ Failed to create admin profile record:", profileError.message);
    process.exit(1);
  }

  console.log(`🎉 Admin profile registered successfully!`);
  console.log(`You can now log in at: /admin/login`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
