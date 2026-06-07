# Infrastructure — shushu.be/twentytwo

The app is served at **https://shushu.be/twentytwo/** from the `shushu.be` S3
bucket behind CloudFront distribution `E2ZQARMMJVMNVU` (AWS account 022103836148).

## Deploying

```
./deploy.sh
```

Uses the scoped IAM profile `twentytwo-deploy` (user `twentytwo-deploy`,
inline policy `twentytwo-deploy-scope`): write access to the `twentytwo/*`
prefix and invalidations on this one distribution — nothing else.
Root/admin credentials are profile `hilsbos` and are only needed for
infra changes, never for deploys.

## How it's wired (changed 2026-06-07)

- **Origin Access Control** `shushu-oac` (`ENM81WJJDAH5V`): the bucket is
  private; only this CloudFront distribution can read it (bucket policy
  `AllowCloudFrontOAC`, scoped to the distribution ARN).
- **Block Public Access**: all four flags ON. **Object ownership**:
  `BucketOwnerEnforced` (ACLs disabled — the old per-object `public-read`
  ACLs no longer apply). Direct `s3.amazonaws.com` URLs return 403 by design.
- **CloudFront Function** `shushu-dir-index` (viewer-request, default
  behavior): rewrites `…/` → `…/index.html` and 301s the bare `/twentytwo`
  to `/twentytwo/`. Deliberately does NOT redirect other extensionless keys
  (the bucket root serves a live `/callback` object).
- **Compression** ON (brotli/gzip at the edge), **HTTP/2 + HTTP/3**.
- **Bucket versioning** ON (recovery from overwrites/deletes).

Cache tiers set by `deploy.sh`: hashed `assets/*` immutable 1y · icons 1d ·
`index.html` + manifest `no-cache`. Each deploy invalidates `/twentytwo/*`.

## Supabase

Production redirect URL `https://shushu.be/twentytwo/` must be in
Authentication → URL Configuration → Redirect URLs (alongside
`http://localhost:5173` for dev).

## Rollback (if some old shared direct-S3 link turns out to matter)

```sh
# Re-enable ACL evaluation (restores old public-read objects):
aws --profile hilsbos s3api put-bucket-ownership-controls --bucket shushu.be \
  --ownership-controls 'Rules=[{ObjectOwnership=ObjectWriter}]'
aws --profile hilsbos s3api delete-public-access-block --bucket shushu.be
```

CloudFront/OAC keeps working in either state, so rollback affects only
direct S3 access. The pre-2026-06-07 state had no bucket policy, no BPA,
ACL-based public reads, no compression, and an unused OAI
(`E30SCGWRF16S4M`) on the origin.
