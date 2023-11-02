const { Address, Box, ParcelLocker, Store } = require("../sequelize/models");




//Címek létrehozása
const initAddress = () => {
    //Raktárak címei
    const address1 = {
        city: "Veszprém",
        county: "Veszprém",
        postCode: 8200,
        street: "Dózsa György utca 11"
    }
    Address.create(address1);

    const address2 = {
        city: "Székesfehérvár",
        county: "Fejér",
        postCode: 8000,
        street: "Budai út 2/b"
    }
    Address.create(address2);

    const address3 = {
        city: "Zalaegerszeg",
        county: "Zala",
        postCode: 8900,
        street: "Ady Endre utca 2"
    }
    Address.create(address3);

    const address4 = {
        city: "Kaposvár",
        county: "Somogy",
        postCode: 7400,
        street: "Fő út 15"
    }
    Address.create(address4);

    const address5 = {
        city: "Szombathely",
        county: "Vas",
        postCode: 9700,
        street: "Körmendi út 21"
    }
    Address.create(address5);

    //Veszprém megyei automaták

    const address6 = {
        city: "Veszprém",
        county: "Veszprém",
        postCode: 8200,
        street: "Pápai út 32"
    }
    Address.create(address6);

    const address7 = {
        city: "Veszprém",
        county: "Veszprém",
        postCode: 8200,
        street: "Jutasi út 4"
    }
    Address.create(address7);

    const address8 = {
        city: "Várpalota",
        county: "Veszprém",
        postCode: 8100,
        street: "Újlaky út 8"
    }
    Address.create(address8);

    const address9 = {
        city: "Várpalota",
        county: "Veszprém",
        postCode: 8100,
        street: "Árpád utca 1"
    }
    Address.create(address9);


    //Fejér megyei automaták
    const address10 = {
        city: "Székesfehérvár",
        county: "Fejér",
        postCode: 8000,
        street: "Úrhidai út 6"
    }
    Address.create(address10);

    const address11 = {
        city: "Zámoly",
        county: "Fejér",
        postCode: 8081,
        street: "Nefelejcs utca 21"
    }
    Address.create(address11);

    const address12 = {
        city: "Lovasberény",
        county: "Fejér",
        postCode: 8093,
        street: "Zrínyi utca 1"
    }
    Address.create(address12);

    const address13 = {
        city: "Velence",
        county: "Fejér",
        postCode: 2481,
        street: "Ősz utca 13/a"
    }
    Address.create(address13);


    //Zala megyei automaták
    const address14 = {
        city: "Lenti",
        county: "Zala",
        postCode: 8960,
        street: "Béke utca 20"
    }
    Address.create(address14);

    const address15 = {
        city: "Zalavár",
        county: "Zala",
        postCode: 8392,
        street: "József Attila utca 17"
    }
    Address.create(address15);

    const address16 = {
        city: "Zalaegerszeg",
        county: "Zala",
        postCode: 8900,
        street: "Görcseji út 6"
    }
    Address.create(address16);

    const address17 = {
        city: "Teskánd",
        county: "Zala",
        postCode: 8991,
        street: "Rózsa utca 9"
    }
    Address.create(address17);

    //Somogy megyei automaták
    const address18 = {
        city: "Marcali",
        county: "Somogy",
        postCode: 8700,
        street: "Nagypincei út 15"
    }
    Address.create(address18);

    const address19 = {
        city: "Fonyód",
        county: "Somogy",
        postCode: 8640,
        street: "Domb utca 27"
    }
    Address.create(address19);

    const address20 = {
        city: "Igal",
        county: "Somogy",
        postCode: 7275,
        street: "Szent István út 8"
    }
    Address.create(address20);

    const address21 = {
        city: "Kaposvár",
        county: "Somogy",
        postCode: 7400,
        street: "Benedek Elek utca 20"
    }
    Address.create(address21);

    //Vas megyei automaták
    const address22 = {
        city: "Szombathely",
        county: "Vas",
        postCode: 9700,
        street: "Szőlős út 4"
    }
    Address.create(address22);

    const address23 = {
        city: "Sárvár",
        county: "Vas",
        postCode: 9600,
        street: "Székely út 13"
    }
    Address.create(address23);

    const address24 = {
        city: "Körmend",
        county: "Vas",
        postCode: 9900,
        street: "Dankó Pista utca 24"
    }
    Address.create(address24);

    const address25 = {
        city: "Szentgotthárd",
        county: "Vas",
        postCode: 9955,
        street: "Zöld mező utca 5"
    }
    Address.create(address25);
}

const initBoxes = () => {
    //200x70x50
    const box1 = {
        boxNumber: 1,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box1);

    const box2 = {
        boxNumber: 2,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box2);

    const box3 = {
        boxNumber: 3,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box3);

    const box4 = {
        boxNumber: 4,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box4);

    const box5 = {
        boxNumber: 5,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box5);

    const box6 = {
        boxNumber: 6,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box6);

    const box7 = {
        boxNumber: 7,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box7);

    const box8 = {
        boxNumber: 8,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box8);

    const box9 = {
        boxNumber: 9,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box9);

    const box10 = {
        boxNumber: 10,
        maxHeight: 50,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 70,
        size: "small"
    }
    Box.create(box10);

    //200x120x100
    const box11 = {
        boxNumber: 11,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box11);

    const box12 = {
        boxNumber: 12,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box12);

    const box13 = {
        boxNumber: 13,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box13);

    const box14 = {
        boxNumber: 14,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box14);

    const box15 = {
        boxNumber: 15,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box15);

    const box16 = {
        boxNumber: 16,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box16);

    const box17 = {
        boxNumber: 17,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box17);

    const box18 = {
        boxNumber: 18,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box18);

    const box19 = {
        boxNumber: 19,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box19);

    const box20 = {
        boxNumber: 20,
        maxHeight: 100,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 120,
        size: "medium"
    }
    Box.create(box20);

    //200x170x150
    const box21 = {
        boxNumber: 21,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box21);

    const box22 = {
        boxNumber: 22,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box22);

    const box23 = {
        boxNumber: 23,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box23);

    const box24 = {
        boxNumber: 24,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box24);

    const box25 = {
        boxNumber: 25,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box25);

    const box26 = {
        boxNumber: 26,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box26);

    const box27 = {
        boxNumber: 27,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box27);

    const box28 = {
        boxNumber: 28,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box28);

    const box29 = {
        boxNumber: 29,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box29);

    const box30 = {
        boxNumber: 30,
        maxHeight: 150,
        maxLength: 200,
        maxWeight: 5,
        maxWidth: 170,
        size: "large"
    }
    Box.create(box30);
}

//Raktárak létrehozása
const initStores = () => {

    for (let i = 1; i <= 5; i++) {

        Address.findOne({ where: { id: i } })
            .then(address => {
                Store.create({

                }).then(store => {
                    store.setLocation(address);
                }).catch(error => {

                })
            }).catch(error => {

            })
    }


}

//Csomag automaták létrehozása
const initParcelLockers = () => {

    //Veszprém megyei automaták
    Address.findOne({ where: { id: 6 } })
        .then(address => {
            Store.findOne({where: {id: 1}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })
        
        Address.findOne({ where: { id: 7 } })
        .then(address => {
            Store.findOne({where: {id: 1}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 8 } })
        .then(address => {
            Store.findOne({where: {id: 1}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 9 } })
        .then(address => {
            Store.findOne({where: {id: 1}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        //Fejér megyei automaták
        Address.findOne({ where: { id: 10 } })
        .then(address => {
            Store.findOne({where: {id: 2}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 11 } })
        .then(address => {
            Store.findOne({where: {id: 2}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 12 } })
        .then(address => {
            Store.findOne({where: {id: 2}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 13 } })
        .then(address => {
            Store.findOne({where: {id: 2}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        //Zala megyei automaták
        Address.findOne({ where: { id: 14 } })
        .then(address => {
            Store.findOne({where: {id: 3}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 15 } })
        .then(address => {
            Store.findOne({where: {id: 3}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 16 } })
        .then(address => {
            Store.findOne({where: {id: 3}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 17 } })
        .then(address => {
            Store.findOne({where: {id: 3}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })
        //Somoly megyei automaták
        Address.findOne({ where: { id: 18 } })
        .then(address => {
            Store.findOne({where: {id: 4}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 19 } })
        .then(address => {
            Store.findOne({where: {id: 4}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 20 } })
        .then(address => {
            Store.findOne({where: {id: 4}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 21 } })
        .then(address => {
            Store.findOne({where: {id: 4}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })
        //Vas megyei automaták
        Address.findOne({ where: { id: 22 } })
        .then(address => {
            Store.findOne({where: {id: 5}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 23 } })
        .then(address => {
            Store.findOne({where: {id: 5}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 24 } })
        .then(address => {
            Store.findOne({where: {id: 5}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })

        Address.findOne({ where: { id: 25 } })
        .then(address => {
            Store.findOne({where: {id: 5}})
            .then(store => {
                ParcelLocker.create({
                    amountOfBoxes: 30,
                    amountOfSmallBoxes: 10,
                    amountOfMediumBoxes: 10,
                    amountOfLargeBoxes: 10,
                }).then(parcelLocker => {
                    parcelLocker.setLocation(address);
                    parcelLocker.setStore(store);
                }).catch(error => {

                })
            }).catch(error => {

            })
        }).catch(error => {

        })


}

module.exports = {
    initAddress,
    initBoxes,
    initStores,
    initParcelLockers
};


