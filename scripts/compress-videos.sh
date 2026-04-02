#!/bin/bash
# ─────────────────────────────────────────────────────────────
# compress-videos.sh
# Compresses all videos in public/videos/ for web delivery
# Requires: ffmpeg (brew install ffmpeg)
#
# Run from project root:
#   chmod +x scripts/compress-videos.sh
#   ./scripts/compress-videos.sh
# ─────────────────────────────────────────────────────────────

INPUT_DIR="public/videos"
OUTPUT_DIR="public/videos/compressed"

mkdir -p "$OUTPUT_DIR"

# Target settings:
# - 1080p max (scale down if larger, never scale up)
# - CRF 28 = good quality/size balance for background video
# - preset slow = better compression (takes longer but worth it)
# - audio stripped (muted video)
# - faststart = moov atom at front for instant playback

VIDEOS=(
  "hero.mp4"
  "oakville.mp4"
  "rutherford.mp4"
  "calistoga.mp4"
  "yountville.mp4"
  "pritchard-hill.mp4"
  "downtown-napa.mp4"
  "dining.mp4"
  "stay.mp4"
)

echo "🍷 WS Napa Guide — Video Compression"
echo "────────────────────────────────────"

for video in "${VIDEOS[@]}"; do
  input="$INPUT_DIR/$video"
  output="$OUTPUT_DIR/$video"

  if [ ! -f "$input" ]; then
    echo "⚠️  Skipping $video — not found"
    continue
  fi

  size_before=$(du -sh "$input" | cut -f1)
  echo "▶  Compressing $video ($size_before)..."

  # Second scale forces even w/h for libx264 (odd dimensions can break encode)
  ffmpeg -i "$input" \
    -vf "scale='min(1920,iw)':-2:force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -c:v libx264 \
    -crf 28 \
    -preset slow \
    -profile:v high \
    -level 4.1 \
    -movflags +faststart \
    -an \
    -y \
    "$output" 2>/dev/null

  if [ $? -eq 0 ]; then
    size_after=$(du -sh "$output" | cut -f1)
    echo "   ✓ $video: $size_before → $size_after"
  else
    echo "   ✗ Failed to compress $video"
  fi
done

echo ""
echo "────────────────────────────────────"
echo "✓ Done. Compressed files in $OUTPUT_DIR"
echo ""
echo "Next steps:"
echo "  1. Review compressed videos in a browser"
echo "  2. If quality is acceptable, replace originals:"
echo "     cp public/videos/compressed/*.mp4 public/videos/"
echo "  3. Delete the compressed/ folder"
echo "  4. Git commit the smaller files (update LFS)"
