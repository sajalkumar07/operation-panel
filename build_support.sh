#!/bin/sh

# This script fetches a list of key-value pairs from Vault and sets them as environment variables.

# Define the path to the secret in Vault
vault_path="kv/data/dev/apps/main-ops/main-ops"
VAULT_ADDR=https://internal-prod-vault.whjr.one
VAULT_TOKEN=s.gTLYozrbgfJLSsctgAvDzwI3

# Fetch the secret from Vault and save it as a JSON string

secret=$(curl -sS \
    --header "X-Vault-Token: $VAULT_TOKEN" \
    "$VAULT_ADDR/v1/$vault_path" | jq -r '.data.data | to_entries | map("\(.key)=\(.value|tostring)") | .[]')

# Loop through the key-value pairs and set them as environment variables
while IFS= read -r line; do
    echo "$line" >>.env
done <<EOF
$secret
EOF

cat .env
