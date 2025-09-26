import crypto from "crypto";
import bcrypt from "bcrypt";
import { getCollection, closeDb } from "@/lib/db";
import { UserDoc } from "@/types/model";

export async function generateAdminCredentials() {
  try {
    const email = "admin@example.com";
    const password = crypto.randomBytes(16).toString("base64url");
    const hashed = await bcrypt.hash(password, 12);

    const users = await getCollection<UserDoc>("users");

    // const existingAdmin = await users.findOne({ email });
    // if (existingAdmin) {
    //   console.log("Admin user already exists. No changes made.");
    //   await closeDb();
    //   return;
    // }

    const now = new Date();

    await users.updateOne(
      { email },
      {
        $set: {
          password: hashed,
          updatedAt: now,
        },
        $setOnInsert: {
          email,
          createdAt: now,
        },
      },
      { upsert: true }
    );

    console.log("=========  ADMIN CREDENTIALS  =========");
    console.log("Admin user credentials:");
    console.log(`✉️ Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log("=======================================");

    await closeDb();


  } catch (error) {
    console.error("Error generating admin credentials:", error);
  }
}