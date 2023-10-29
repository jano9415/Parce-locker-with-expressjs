const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtAuthFilter = require("./src/filter/JwtAuthFilter");


const app = express();

const port = 8080;

//Jwt token titkosítása
const jwtSecret = "secretkey";

app.use(cors());


// Célszerver (parcel-handler-service)
const parcelHandlerProxy = createProxyMiddleware('/parcelhandler', {
  target: 'http://localhost:8081',
  changeOrigin: true,
});

// Célszerver (authentication-service)
const authenticationProxy = createProxyMiddleware('/auth', {
  target: 'http://localhost:8082',
  changeOrigin: true,
});

// Célszerver (notification-service)
const notificationProxy = createProxyMiddleware('/notification', {
  target: 'http://localhost:8083',
  changeOrigin: true,
});

// Célszerver (statistics-service)
const statisticsProxy = createProxyMiddleware('/statistics', {
  target: 'http://localhost:8084',
  changeOrigin: true,
});

//Jogosultság ellenőrzése
app.use((req, res, next) => {

  //Ellenőrzöm, hogy a bejövő url benne van-e a freeApiEndPoints listában
  const isAllowed = jwtAuthFilter.freeApiEndpoints.some(endpoint => req.url.startsWith(endpoint));

  //Ebben az esetben benne van és nem szükséges jwt token, a kérést elirányítom az adott service-hez
  if (isAllowed) {
    //Következő middleware feldolgozása, elirányítás az adott service-hez
    next();
  }
  //Jwt token szükséges
  else {
    //Jwt token kiolvasás a header részből
    const jwtToken = req.headers['authorization'];

    //Van token
    //Token validációja
    //Végpont ellenőrzése, hogy az adott szerepkör elérheti-e
    if (jwtToken) {
      try {
        let authorized = false;
        const decodedToken = jwt.verify(jwtToken, jwtSecret);

        //Ha a kérés szerepkörei tartalmazzák: user
        if (decodedToken.roles.includes("user")) {
          const isAllowedForUser = jwtAuthFilter.apiEndpointsForUser.some(endpoint => req.url.startsWith(endpoint));
          //A user jogosult eléri a végpontot
          if (isAllowedForUser) {
            authorized = true;
            //Mehetsz a következő middleware-re
            next();
          }

        }
        //Ha a kérés szerepkörei tartalmazzák: courier
        if (decodedToken.roles.includes("courier")) {
          const isAllowedForCourier = jwtAuthFilter.apiEndpointsForCourier.some(endpoint => req.url.startsWith(endpoint));
          //A courier jogosult eléri a végpontot
          if (isAllowedForCourier) {
            authorized = true;
            //Mehetsz a következő middleware-re
            next();
          }

        }
        //Ha a kérés szerepkörei tartalmazzák: admin
        if (decodedToken.roles.includes("admin")) {
          const isAllowedForAdmin = jwtAuthFilter.apiEndpointsForAdmin.some(endpoint => req.url.startsWith(endpoint));
          //Az admin jogosult eléri a végpontot
          if (isAllowedForAdmin) {
            authorized = true;
            //Mehetsz a következő middleware-re
            next();
          }

        }

        //Az elérni kívánt végpont nincs benne egyik listában sem
        if (authorized === false) {
          res.status(401).send("unauthorized");
        }

      }
      //Hibás vagy lejárt token
      catch (error) {
        res.status(400).send("badrequest");
      }

    }
    //Nincs token
    else {
      res.status(401).send("unauthorized");
    }

  }

});

//A jogosultság utáni következő middleware
app.use('/parcelhandler', parcelHandlerProxy);
app.use('/auth', authenticationProxy);
app.use('/notification', notificationProxy);
app.use('/statistics', statisticsProxy);


app.listen(port, () => console.log('app listening on port ' + port));
