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


  let isInFreeApiEndpoints = false;

  const valami = jwtAuthFilter.freeApiEndpoints.find(url => req.url.startsWith(url));


  jwtAuthFilter.freeApiEndpoints.some(url => {
    //Bejövő url keresés a freeApiEndpoints listában
    if (url === req.url) {
      isInFreeApiEndpoints = true;
    }

  });

  //Ebben az esetben nem szükséges jwt token, a kérést elirányítom az adott service-hez
  if (isInFreeApiEndpoints) {
    //Következő middleware feldolgozása, elirányítás az adott service-hez
    console.log("okééééééééé");
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
        const decodedToken = jwt.verify(jwtToken, jwtSecret);

        //Ha a kérés szerepkörei tartalmazzák: user
        if (decodedToken.roles.includes("user")) {
          //A user jogosult eléri a végpontot
          if (jwtAuthFilter.apiEndpointsForUser.includes(req.url)) {
            //Mehetsz a következő middleware-re
            next();
          }
          //A user nem jogosult elérni a végpontot
          //Az elérni kívánt végpont nincs benne az 'apiEndpointsForUser' listában
          else {
            res.status(401).send("unauthorized");
          }
        }
        //Ha a kérés szerepkörei tartalmazzák: courier
        if (decodedToken.roles.includes("courier")) {
        }
        //Ha a kérés szerepkörei tartalmazzák: admin
        if (decodedToken.roles.includes("admin")) {
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

app.use('/parcelhandler', parcelHandlerProxy);
app.use('/auth', authenticationProxy);
app.use('/notification', notificationProxy);
app.use('/statistics', statisticsProxy);


app.listen(port, () => console.log('app listening on port ' + port));
