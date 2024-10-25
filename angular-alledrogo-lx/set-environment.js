const fs = require('fs');
const path = require('path');

// Ścieżka do pliku environment.ts
const environmentPath = path.join(__dirname, 'src/environments/environment.ts');

// Odczytanie zmiennych środowiskowych
const cognitoLoginUrl = process.env.COGNITO_LOGIN_URL || '';
const backendUrl = process.env.BACKEND_URL || '';

// Tworzenie zawartości pliku environment.ts
const environmentFileContent = `
export const environment = {
  production: true,
  cognitoLoginUrl: '${cognitoLoginUrl}',
  backendUrl: '${backendUrl}'
};
`;

// Nadpisywanie pliku environment.ts
fs.writeFile(environmentPath, environmentFileContent, (err) => {
  if (err) {
    console.error('Błąd zapisu pliku environment.ts:', err);
    process.exit(1);
  } else {
    console.log('Pomyślnie zaktualizowano environment.ts');
  }
});
