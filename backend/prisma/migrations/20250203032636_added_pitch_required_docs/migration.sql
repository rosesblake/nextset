-- CreateTable
CREATE TABLE "pitch_required_docs" (
    "id" SERIAL NOT NULL,
    "pitch_id" INTEGER NOT NULL,
    "w9_required" BOOLEAN NOT NULL DEFAULT false,
    "rider_required" BOOLEAN NOT NULL DEFAULT false,
    "epk_required" BOOLEAN NOT NULL DEFAULT false,
    "stage_plot_required" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pitch_required_docs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pitch_required_docs_pitch_id_key" ON "pitch_required_docs"("pitch_id");

-- AddForeignKey
ALTER TABLE "pitch_required_docs" ADD CONSTRAINT "pitch_required_docs_pitch_id_fkey" FOREIGN KEY ("pitch_id") REFERENCES "pitches"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
