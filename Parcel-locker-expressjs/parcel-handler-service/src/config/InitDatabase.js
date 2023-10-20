const { Address } = require("../sequelize/models");




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

module.exports = {
    initAddress,
};



const box1 = {
    boxNumber: 1,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box2 = {
    boxNumber: 2,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box3 = {
    boxNumber: 3,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box4 = {
    boxNumber: 4,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box5 = {
    boxNumber: 5,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box6 = {
    boxNumber: 6,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box7 = {
    boxNumber: 7,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box8 = {
    boxNumber: 8,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box9 = {
    boxNumber: 9,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

const box10 = {
    boxNumber: 10,
    maxHeight: 50,
    maxLength: 200,
    maxWeight: 5,
    maxWidth: 70,
    size: "small"
}

//Rekeszek létrehozása
/*
@Bean
public void initBox(){

//200x70x50
Box box1 = new Box();
box1.setBoxNumber(1);
box1.setMaxHeight(50);
box1.setMaxLength(200);
box1.setMaxWeight(5);
box1.setMaxWidth(70);
box1.setSize("small");
boxService.save(box1);

Box box2 = new Box();
box2.setBoxNumber(2);
box2.setMaxHeight(50);
box2.setMaxLength(200);
box2.setMaxWeight(5);
box2.setMaxWidth(70);
box2.setSize("small");
boxService.save(box2);

Box box3 = new Box();
box3.setBoxNumber(3);
box3.setMaxHeight(50);
box3.setMaxLength(200);
box3.setMaxWeight(5);
box3.setMaxWidth(70);
box3.setSize("small");
boxService.save(box3);

Box box4 = new Box();
box4.setBoxNumber(4);
box4.setMaxHeight(50);
box4.setMaxLength(200);
box4.setMaxWeight(5);
box4.setMaxWidth(70);
box4.setSize("small");
boxService.save(box4);

Box box5 = new Box();
box5.setBoxNumber(5);
box5.setMaxHeight(50);
box5.setMaxLength(200);
box5.setMaxWeight(5);
box5.setMaxWidth(70);
box5.setSize("small");
boxService.save(box5);

Box box6 = new Box();
box6.setBoxNumber(6);
box6.setMaxHeight(50);
box6.setMaxLength(200);
box6.setMaxWeight(5);
box6.setMaxWidth(70);
box6.setSize("small");
boxService.save(box6);

Box box7 = new Box();
box7.setBoxNumber(7);
box7.setMaxHeight(50);
box7.setMaxLength(200);
box7.setMaxWeight(5);
box7.setMaxWidth(70);
box7.setSize("small");
boxService.save(box7);

Box box8 = new Box();
box8.setBoxNumber(8);
box8.setMaxHeight(50);
box8.setMaxLength(200);
box8.setMaxWeight(5);
box8.setMaxWidth(70);
box8.setSize("small");
boxService.save(box8);

Box box9 = new Box();
box9.setBoxNumber(9);
box9.setMaxHeight(50);
box9.setMaxLength(200);
box9.setMaxWeight(5);
box9.setMaxWidth(70);
box9.setSize("small");
boxService.save(box9);

Box box10 = new Box();
box10.setBoxNumber(10);
box10.setMaxHeight(50);
box10.setMaxLength(200);
box10.setMaxWeight(5);
box10.setMaxWidth(70);
box10.setSize("small");
boxService.save(box10);

//200x120x100
Box box11 = new Box();
box11.setBoxNumber(11);
box11.setMaxHeight(100);
box11.setMaxLength(200);
box11.setMaxWeight(5);
box11.setMaxWidth(120);
box11.setSize("medium");
boxService.save(box11);

Box box12 = new Box();
box12.setBoxNumber(12);
box12.setMaxHeight(100);
box12.setMaxLength(200);
box12.setMaxWeight(5);
box12.setMaxWidth(120);
box12.setSize("medium");
boxService.save(box12);

Box box13 = new Box();
box13.setBoxNumber(13);
box13.setMaxHeight(100);
box13.setMaxLength(200);
box13.setMaxWeight(5);
box13.setMaxWidth(120);
box13.setSize("medium");
boxService.save(box13);

Box box14 = new Box();
box14.setBoxNumber(14);
box14.setMaxHeight(100);
box14.setMaxLength(200);
box14.setMaxWeight(5);
box14.setMaxWidth(120);
box14.setSize("medium");
boxService.save(box14);

Box box15 = new Box();
box15.setBoxNumber(15);
box15.setMaxHeight(100);
box15.setMaxLength(200);
box15.setMaxWeight(5);
box15.setMaxWidth(120);
box15.setSize("medium");
boxService.save(box15);

Box box16 = new Box();
box16.setBoxNumber(16);
box16.setMaxHeight(100);
box16.setMaxLength(200);
box16.setMaxWeight(5);
box16.setMaxWidth(120);
box16.setSize("medium");
boxService.save(box16);

Box box17 = new Box();
box17.setBoxNumber(17);
box17.setMaxHeight(100);
box17.setMaxLength(200);
box17.setMaxWeight(5);
box17.setMaxWidth(120);
box17.setSize("medium");
boxService.save(box17);

Box box18 = new Box();
box18.setBoxNumber(18);
box18.setMaxHeight(100);
box18.setMaxLength(200);
box18.setMaxWeight(5);
box18.setMaxWidth(120);
box18.setSize("medium");
boxService.save(box18);

Box box19 = new Box();
box19.setBoxNumber(19);
box19.setMaxHeight(100);
box19.setMaxLength(200);
box19.setMaxWeight(5);
box19.setMaxWidth(120);
box19.setSize("medium");
boxService.save(box19);

Box box20 = new Box();
box20.setBoxNumber(20);
box20.setMaxHeight(100);
box20.setMaxLength(200);
box20.setMaxWeight(5);
box20.setMaxWidth(120);
box20.setSize("medium");
boxService.save(box20);

//200x170x150
Box box21 = new Box();
box21.setBoxNumber(21);
box21.setMaxHeight(150);
box21.setMaxLength(200);
box21.setMaxWeight(5);
box21.setMaxWidth(170);
box21.setSize("large");
boxService.save(box21);

Box box22 = new Box();
box22.setBoxNumber(22);
box22.setMaxHeight(150);
box22.setMaxLength(200);
box22.setMaxWeight(5);
box22.setMaxWidth(170);
box22.setSize("large");
boxService.save(box22);

Box box23 = new Box();
box23.setBoxNumber(23);
box23.setMaxHeight(150);
box23.setMaxLength(200);
box23.setMaxWeight(5);
box23.setMaxWidth(170);
box23.setSize("large");
boxService.save(box23);

Box box24 = new Box();
box24.setBoxNumber(24);
box24.setMaxHeight(150);
box24.setMaxLength(200);
box24.setMaxWeight(5);
box24.setMaxWidth(170);
box24.setSize("large");
boxService.save(box24);

Box box25 = new Box();
box25.setBoxNumber(25);
box25.setMaxHeight(150);
box25.setMaxLength(200);
box25.setMaxWeight(5);
box25.setMaxWidth(170);
box25.setSize("large");
boxService.save(box25);

Box box26 = new Box();
box26.setBoxNumber(26);
box26.setMaxHeight(150);
box26.setMaxLength(200);
box26.setMaxWeight(5);
box26.setMaxWidth(170);
box26.setSize("large");
boxService.save(box26);

Box box27 = new Box();
box27.setBoxNumber(27);
box27.setMaxHeight(150);
box27.setMaxLength(200);
box27.setMaxWeight(5);
box27.setMaxWidth(170);
box27.setSize("large");
boxService.save(box27);

Box box28 = new Box();
box28.setBoxNumber(28);
box28.setMaxHeight(150);
box28.setMaxLength(200);
box28.setMaxWeight(5);
box28.setMaxWidth(170);
box28.setSize("large");
boxService.save(box28);

Box box29 = new Box();
box29.setBoxNumber(29);
box29.setMaxHeight(150);
box29.setMaxLength(200);
box29.setMaxWeight(5);
box29.setMaxWidth(170);
box29.setSize("large");
boxService.save(box29);

Box box30 = new Box();
box30.setBoxNumber(30);
box30.setMaxHeight(150);
box30.setMaxLength(200);
box30.setMaxWeight(5);
box30.setMaxWidth(170);
box30.setSize("large");
boxService.save(box30);

}
*/