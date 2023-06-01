-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "customAvatarUrl" TEXT NOT NULL,
    "customSound" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Games" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "_GamesToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_GamesToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "Games" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GamesToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Games_id_key" ON "Games"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPlayer_AB_unique" ON "_GamesToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPlayer_B_index" ON "_GamesToPlayer"("B");
