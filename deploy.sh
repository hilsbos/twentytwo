#!/usr/bin/env bash
# Deploy Twenty-Two to https://shushu.be/twentytwo/
# Uses the scoped IAM profile `twentytwo-deploy` (write access to the
# twentytwo/* prefix + invalidations on the shushu.be distribution only).
set -euo pipefail
cd "$(dirname "$0")"

PROFILE=twentytwo-deploy
BUCKET=s3://shushu.be/twentytwo
DIST_ID=E2ZQARMMJVMNVU

npm run build

# Hashed assets: immutable, long cache. Do NOT --delete: pruning old hashes means
# a cached/edge index.html that still references a previous build 404s its JS
# chunk -> a permanent black screen. Old hashes are tiny; let them linger so stale
# HTML degrades to "runs the old version" instead of breaking. Prune manually if
# the assets/ prefix ever grows large.
aws --profile "$PROFILE" s3 sync dist/assets/ "$BUCKET/assets/" \
  --cache-control "public,max-age=31536000,immutable"

# Icons: stable names, daily cache.
aws --profile "$PROFILE" s3 sync dist/icons/ "$BUCKET/icons/" \
  --cache-control "public,max-age=86400"
aws --profile "$PROFILE" s3 cp dist/favicon.svg "$BUCKET/favicon.svg" \
  --cache-control "public,max-age=86400" --content-type "image/svg+xml"

# Entry points: always revalidate.
aws --profile "$PROFILE" s3 cp dist/manifest.webmanifest "$BUCKET/manifest.webmanifest" \
  --cache-control "no-cache" --content-type "application/manifest+json"
aws --profile "$PROFILE" s3 cp dist/index.html "$BUCKET/index.html" \
  --cache-control "no-cache" --content-type "text/html; charset=utf-8"

aws --profile "$PROFILE" cloudfront create-invalidation \
  --distribution-id "$DIST_ID" --paths "/twentytwo/*" \
  --query "Invalidation.Id" --output text

echo "Deployed: https://shushu.be/twentytwo/"
