CREATE TABLE "AdminPasswordResetToken" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "adminId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminPasswordResetToken_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "AdminPasswordResetToken_tokenHash_key" UNIQUE ("tokenHash"),
  CONSTRAINT "AdminPasswordResetToken_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "AdminPasswordResetToken_adminId_idx" ON "AdminPasswordResetToken"("adminId");
CREATE INDEX "AdminPasswordResetToken_expiresAt_idx" ON "AdminPasswordResetToken"("expiresAt");
