import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import type { NewUser } from 'src/db/schema';

@Injectable()
export class UsersService {
    // Create a new user
    async create(data: NewUser) {
        const [user] = await db.insert(users).values(data).returning();
        return user;
    }
    

    // Find a user by email
    async findByEmail(email: string) {
        return db.query.users.findFirst({
            where: eq(users.email, email),
        });
    }

    // Find a user by ID
    async findById(id: string) {
        return db.query.users.findFirst({
            where: eq(users.id, id),
        });
    }

    // Find all users
    async findAll() {
        return db.query.users.findMany();
    }


    // Update a user
    async update(id: string, data: Partial<typeof users.$inferInsert>) {
        const [user] = await db
            .update(users)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(users.id, id))
            .returning();

        return user;
    }

    // Delete a user
    async delete(id: string) {
        await db.delete(users).where(eq(users.id, id));
    }

    
    // Find a user by verification token for email verification
    async findByVerificationToken(token: string) {
        return db.query.users.findFirst({
            where: eq(users.verificationToken, token),
        });
    }

    // Find a user by reset token for password reset
    async findByResetToken(token: string) {
        return db.query.users.findFirst({
            where: eq(users.resetToken, token),
        });
    }
}