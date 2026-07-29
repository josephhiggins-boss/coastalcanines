#!/usr/bin/env bash
# Coastal Canines — DNS health check
# Run:  bash check-dns.sh
# Checks the website records (GitHub Pages) and the email records (MX/SPF/DKIM/DMARC).

DOMAIN="coastalcanines.ie"
DOH="https://cloudflare-dns.com/dns-query"

q() { # q <name> <type>
  curl -s -H "accept: application/dns-json" "$DOH?name=$1&type=$2" \
    | python -X utf8 -c "import json,sys
d=json.load(sys.stdin)
ans=[a['data'] for a in d.get('Answer',[])]
print('\n'.join(ans) if ans else ('NXDOMAIN' if d.get('Status')==3 else 'none'))" 2>/dev/null
}

echo "=== $DOMAIN ==="
echo
echo "--- Delegation ---"
echo "NS:   $(q $DOMAIN NS | tr '\n' ' ')"
echo
echo "--- Website (GitHub Pages) ---"
echo "Expect four A records: 185.199.108.153 .109 .110 .111"
echo "A @:      $(q $DOMAIN A | tr '\n' ' ')"
echo "CNAME www: $(q www.$DOMAIN CNAME | tr '\n' ' ')"
echo
echo "--- Email ---"
echo "MX:       $(q $DOMAIN MX | tr '\n' ' | ')"
echo "SPF:      $(q $DOMAIN TXT | grep -i 'v=spf1' || echo 'none')"
echo "DMARC:    $(q _dmarc.$DOMAIN TXT | grep -i 'v=DMARC1' || echo 'none')"
echo
echo "--- Live checks ---"
for u in "https://$DOMAIN" "https://www.$DOMAIN"; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -L --max-time 10 "$u" 2>/dev/null)
  [ "$code" = "000" ] && code="not resolving yet"
  printf "%-32s %s\n" "$u" "$code"
done
