const { Store, Address } = require("../sequelize/models");

const getStores = (req, res) => {

    Store.findAll({
        include: {
            model: Address,
            as: "location"
        }
    }).then(stores => {
        const responseDTO = [];

        stores.map(store => {
            const storeDTO = {
                id: store.id,
                postCode: store.location.postCode,
                county: store.location.county,
                city: store.location.city,
                street: store.location.street,
            };
            responseDTO.push(storeDTO);
        });
        res.status(200).json(responseDTO);
    })
}

module.exports = {
    getStores,
};