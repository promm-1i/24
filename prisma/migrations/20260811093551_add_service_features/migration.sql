-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "features" TEXT[] DEFAULT ARRAY[]::TEXT[];
