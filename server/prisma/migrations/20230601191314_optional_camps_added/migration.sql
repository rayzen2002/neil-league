-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL,
    "customAvatarUrl" TEXT,
    "customSound" TEXT
);
INSERT INTO "new_Player" ("avatarUrl", "customAvatarUrl", "customSound", "email", "id", "name", "nickname") SELECT "avatarUrl", "customAvatarUrl", "customSound", "email", "id", "name", "nickname" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
