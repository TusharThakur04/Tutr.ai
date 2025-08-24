-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'ready',

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chunks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "document_id" TEXT,

    CONSTRAINT "chunks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_key_key" ON "Documents"("key");

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chunks" ADD CONSTRAINT "chunks_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
