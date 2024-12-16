docker run -p 80:80 `
    --name alledrogo-frontend `
    -e COGNITO_LOGIN_URL="https://alledrogo.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=6clmq1gpupeh75j0dsssnvoofs&response_type=token&scope=email+openid+phone&redirect_uri=https://frontend-lb-81148153.us-east-1.elb.amazonaws.com/auth" `
    -e COGNITO_LOGOUT_URL="https://alledrogo.auth.us-east-1.amazoncognito.com/logout?client_id=6clmq1gpupeh75j0dsssnvoofs&logout_uri=https://frontend-lb-81148153.us-east-1.elb.amazonaws.com" `
    -e BACKEND_URL="http://localhost:8080" `
    658583182001.dkr.ecr.us-east-1.amazonaws.com/alledrogo/frontend:latest