# Path to OpenSSL
$OPENSSL = "C:\Program Files\Git\usr\bin\openssl.exe"

# Create ssl directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "ssl"

# Generate SSL certificate
& "$OPENSSL" req -x509 `
   -nodes `
   -days 365 `
   -newkey rsa:2048 `
   -keyout "ssl/private.key" `
   -out "ssl/certificate.crt" `
   -subj "/C=PL/ST=Mazovia/L=Warsaw/O=Alledrogo/OU=IT Department/CN=localhost"

   
# Check if files were created
$certExists = Test-Path "ssl/certificate.crt"
$keyExists = Test-Path "ssl/private.key"

if ($certExists -and $keyExists) {
   Write-Host "SSL certificate generated successfully!" -ForegroundColor Green
   Write-Host "Files location:"
   Write-Host "- Certificate: $(Resolve-Path "ssl/certificate.crt")"
   Write-Host "- Private key: $(Resolve-Path "ssl/private.key")"
} else {
   Write-Host "Error occurred while generating SSL certificate!" -ForegroundColor Red
}