//Ezekhez az végpontokhoz nem szükséges autentikáció. Ezeket bárki elérheti
const freeApiEndpoints = [
    //Felhasználói regisztráció
    "/auth/signup",
    //Regisztráció aktiválása
    "/auth/activation",
    //Felhasználói bejelentkezés
    "/auth/login",
    //Futár bejelentkezés
    "/auth/courierlogin",
    //Csomag automaták lekérése
    "/parcelhandler/parcellocker/getparcellockersforchoice",
    //Csomag feladása feladási kód nélkül
    "/parcelhandler/parcel/sendparcelwithoutcode",
    //Automata tele van?
    "/parcelhandler/parcellocker/isparcellockerfull",
    //Rekeszek tele vannak? Kicsi, közepes és nagy
    "/parcelhandler/parcellocker/areboxesfull",
    //Csomag átvétele
    "/parcelhandler/parcel/pickupparcel",
    //Csomag keresés feladási kód szerint
    "/parcelhandler/parcel/getparcelforsendingwithcode",
    //Csomag feladása feladási kóddal
    "/parcelhandler/parcel/sendparcelwithcode",
    //Automata telítettségi adatok lekérése
    "/parcelhandler/parcellocker/getsaturationdatas",
    //Csomag követése
    "/parcelhandler/parcel/followparcel"
];

//A user szerepkör ezeket a végpontokat érheti el
const apiEndpointsForUser = [
    //Csomag küldése a weblapról feladási kóddal
    "/parcelhandler/parcel/sendparcelwithcodefromwebpage",
    //Felhasználó csomagjainak lekérése
    "/parcelhandler/parcel/getparcelsofuser",
    //Felhasználó kitörli az előzetes csomagfeladást
    "/parcelhandler/parcel/deletemyparcel"
];

//A courier szerepkör ezeket a végpontokat érheti el
const apiEndpointsForCourier = [
    //Csomagok lekérése, amik készen állnak az elszállításra
    "/parcelhandler/parcel/getparcelsforshipping",
    //Automata kiürítése. Elszállításra váró csomagok átkerülnek a futárhoz
    "/parcelhandler/parcel/emptyparcellocker",
    //Futárnál lévő csomagok lekérése
    "/parcelhandler/parcel/getparcelsforparcellocker",
    //Automata feltöltése
    "/parcelhandler/parcel/fillparcellocker",
    //Futár lead egy csomagot a központi raktárban
    "/parcelhandler/parcel/handparceltostore",
    //Futár felvesz egy csomagot a központi raktárból
    "/parcelhandler/parcel/pickupparcelfromstore"
];

//Az admin szerepkör ezeket a végpontokat érheti el
const apiEndpointsForAdmin = [
    //Új admin létrehozása
    "/auth/createadmin",
    //Új futár létrehozása
    "/auth/createcourier",
    //Központi raktárak lekérése
    "/parcelhandler/store/getstores",
    //Összes kézbesített csomagok száma
    "/statistics/parcel/numberofparcels",
    //Leggyakoribb méretű csomagok: kicsi, közepes vagy nagy,
    "/statistics/parcel/mostcommonparcelsize",
    //Csomagok száma méret szerint
    "/statistics/parcel/numberofparcelsbysize",
    //Összes bevétel a kézbesített csomagokból
    "/statistics/parcel/totalrevenue",
    //Csomagok értékének átlaga forintban
    "/statistics/parcel/averageparcelvalue",
    //Feladott csomagok száma aszerint, hogy automatából vagy online adják fel
    "/statistics/parcel/amountofparcelsfromonlineandparcellocker",
    //Honnan adják fel a legtöbb csomagot?
    "/statistics/parcel/mostcommonsendinglocation",
    //Hova érkezik a legtöbb csomag?
    "/statistics/parcel/mostcommonreceivinglocation",
    //Mennyi csomagot fizetnek ki előre? Mennyit fizetnek ki az automatánál?
    "/statistics/parcel/paymentdatas",
    //Szállítási idők
    "/statistics/parcel/averageminmaxshippingtime",
    //Csomagfeladások száma automaták szerint
    "/statistics/parcel/totalsendingbylocations",
    //Csomagátvételek száma automaták szerint
    "/statistics/parcel/totalpickingupbylocations",
    //Összes futár lekérése
    "/parcelhandler/courier/getcouriers",
    //Futár valamely adatának módosítása
    "/parcelhandler/courier/updatecourier",
    //Futár lekérése id alapján
    "/parcelhandler/courier/findcourierbyid",
    //Központi raktárak csomagjainak lekérése
    "/parcelhandler/parcel/getparcelsofstore",
    //Csomag újraindítása az automatához
    "/parcelhandler/parcel/updatepickingupexpired",
    //Futárok csomagjainak lekérése
    "/parcelhandler/parcel/getparcelsofcourier",
    //Automaták csomagjainak lekérése
    "/parcelhandler/parcel/getparcelsofparcellocker",
    //Csomagátvételi lejárati idő meghosszabbítása
    "/parcelhandler/parcel/updatepickingupexpirationdate",
    //Csomagfeladási lejárati idő meghosszabbítása
    "/parcelhandler/parcel/updatesendingexpirationdate",
    //Ügyfél elhelyezi a csomagot a feladási automatába időpont -> ügyfél átveszi a csomagot az érkezési automatából időpont
    "/statistics/parcel/placebycustomerandpickupbycustomer",
    //Ügyfél elhelyezi a csomagot a feladási automatába időpont -> futár kiveszi a csomagot a feladási automatából időpont
    "/statistics/parcel/placebycustomerandpickupbycourier",
    //Futár kiveszi a csomagot a feladási automatából időpont -> futár elhelyezi a csomagot az érkezési automatába időpont
    "/statistics/parcel/pickupbycourierandplacebycourier",
    //Futár elhelyezi a csomagot az érkezési automatába időpont -> ügyfél átveszi a csomagot az érkezési automatából időpont
    "/statistics/parcel/placebycourierandpickupbycustomer",
    //Raktárak forgalmi adatai
    "/statistics/parcel/storeturnoverdata",
    //Szállítási késések. Ami több, mint 72 óra
    "/statistics/parcel/pickupbycourierandplacebycourierdelay"
];

module.exports = {
    freeApiEndpoints,
    apiEndpointsForUser,
    apiEndpointsForCourier,
    apiEndpointsForAdmin
};