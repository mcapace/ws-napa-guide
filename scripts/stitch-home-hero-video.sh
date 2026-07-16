#!/usr/bin/env bash
# Stitch Adobe Stock hero clips into one looping homepage video.
# Requires: ffmpeg (brew install ffmpeg)
#
# Default sources: Desktop Adobe Stock .mov files (order matters).
# Run from project root:
#   ./scripts/stitch-home-hero-video.sh
#   ./scripts/stitch-home-hero-video.sh /path/to/clip1.mov /path/to/clip2.mov ...

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../" && pwd)"
OUT_DIR="$ROOT/public/images/homepage/hero"
FADE="${FADE:-0.75}"

if [[ $# -ge 1 ]]; then
  CLIPS=("$@")
else
  DESKTOP="${HOME}/Desktop"
  CLIPS=(
    "${DESKTOP}/AdobeStock_307786054 (1).mov"
    "${DESKTOP}/AdobeStock_329642123.mov"
    "${DESKTOP}/AdobeStock_779364069.mov"
    "${DESKTOP}/AdobeStock_198233607.mov"
  )
fi

for clip in "${CLIPS[@]}"; do
  if [[ ! -f "$clip" ]]; then
    echo "Missing clip: $clip"
    exit 1
  fi
done

mkdir -p "$OUT_DIR"

N=${#CLIPS[@]}
if [[ $N -lt 2 ]]; then
  echo "Need at least 2 clips."
  exit 1
fi

# Build per-clip normalize filters and xfade chain
INPUT_ARGS=()
FILTER=""
for i in "${!CLIPS[@]}"; do
  INPUT_ARGS+=(-i "${CLIPS[$i]}")
  FILTER+="[${i}:v]fps=24,scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,format=yuv420p[v${i}];"
done

# Durations for offset math
DURATIONS=()
for clip in "${CLIPS[@]}"; do
  d=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$clip")
  DURATIONS+=("$d")
done

PREV="v0"
ACC="${DURATIONS[0]}"
for i in $(seq 1 $((N - 1))); do
  OFFSET=$(python3 -c "print(${ACC} - ${FADE})")
  OUT="vx${i}"
  FILTER+="[${PREV}][v${i}]xfade=transition=fade:duration=${FADE}:offset=${OFFSET},format=yuv420p[${OUT}];"
  ACC=$(python3 -c "print(${ACC} + ${DURATIONS[$i]} - ${FADE})")
  PREV="$OUT"
done

SOURCE="$OUT_DIR/video-source.mp4"
FINAL="$OUT_DIR/video.mp4"
POSTER="$OUT_DIR/poster.jpg"

echo "Stitching ${N} clips (${FADE}s crossfade) → $FINAL"

ffmpeg -y "${INPUT_ARGS[@]}" \
  -filter_complex "${FILTER}[${PREV}]format=yuv420p[vout]" \
  -map "[vout]" \
  -c:v libx264 -crf 23 -preset slow -profile:v high -level 4.1 -movflags +faststart -an \
  "$SOURCE"

ffmpeg -y -i "$SOURCE" \
  -c:v libx264 -crf 26 -preset slow -profile:v high -level 4.1 -movflags +faststart -an \
  "$FINAL"

ffmpeg -y -i "$FINAL" -ss 00:00:01.5 -vframes 1 -update 1 -q:v 2 "$POSTER"

rm -f "$SOURCE"

echo "✓ $FINAL ($(du -sh "$FINAL" | cut -f1), $(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$FINAL")s)"
echo "✓ $POSTER"
