#!/bin/sh
set -eu
cd /workspace
# :8081 is QA-only — a revive must never inherit a stale built-output preview.
# Called directly, not via npm: no node_modules needed, so nothing to wait for.
node scripts/preview.mjs stop || true
if [ -f /workspace/.grok/secrets/github-token ]; then
  GH_TOKEN=$(tr -d '\n\r' < /workspace/.grok/secrets/github-token)
  export GH_TOKEN
elif command -v gh >/dev/null 2>&1; then
  tok=$(gh auth token 2>/dev/null || true)
  if [ -n "$tok" ]; then
    export GH_TOKEN="$tok"
  fi
fi
if [ -f /workspace/.grok/secrets/pinata-jwt ]; then
  PINATA_JWT=$(tr -d '\n\r' < /workspace/.grok/secrets/pinata-jwt)
  export PINATA_JWT
fi
if [ -f /workspace/.grok/secrets/pinata-api-key ]; then
  PINATA_API_KEY=$(tr -d '\n\r' < /workspace/.grok/secrets/pinata-api-key)
  export PINATA_API_KEY
fi
if [ -f /workspace/.grok/secrets/pinata-api-secret ]; then
  PINATA_SECRET_API_KEY=$(tr -d '\n\r' < /workspace/.grok/secrets/pinata-api-secret)
  export PINATA_SECRET_API_KEY
fi
if [ -f /workspace/.grok/secrets/pinata-gateway-token ]; then
  PINATA_GATEWAY_TOKEN=$(tr -d '\n\r' < /workspace/.grok/secrets/pinata-gateway-token)
  export PINATA_GATEWAY_TOKEN
fi
export PINATA_GATEWAY="${PINATA_GATEWAY:-emoji.mypinata.cloud}"
if curl -sf -o /tmp/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
