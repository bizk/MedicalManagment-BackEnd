const { User, People, Specialities } = require('../models');
module.exports = {
    
    createUsers() {
        User.bulkCreate([
            {userUUID: 'p-1', mail: 'testMail@gmail.com', password: "password"},
            {userUUID: 'p-2', mail: 'ziso@ewek.uz', password: "olujijev"},
            {userUUID: 'm-1',mail: 'soovunel@fewiz.uk', password: "ivoirwu1p"},
            {userUUID: 'm-2',mail: 'temaf@defo.id', password: "haffobtu4f"},
            {userUUID: 'c-1',mail: 'ohri@mot.fi', password: 'powhazgimege'}
        ])
    },

    createPeople() {
        People.bulkCreate([
            {peopleUUID: 'p-1', name: 'Susie', sureName: 'Cain', dni: '1417134111', role: 'patient'},
            {peopleUUID: 'p-2', name: 'Landon', sureName: 'Turner', dni: '3788995246', role: 'patient'},
            {peopleUUID: 'm-1', name: 'Jesus', sureName: 'Powell', dni: '4188701215', role: 'medic'},
            {peopleUUID: 'm-2', name: 'Hannah', sureName: 'Clayton', dni: '3072954121', role: 'medic'}
        ])
    },

    createSpecialities() {
        Specialities.bulkCreate([
            {specialityId: '1', type: "Hearth Disease"},
            {specialityId: '2', type: "Pulmonar Disease"},
            {specialityId: '3', type: "Bone Disease"},
        ])
    },

    addMedicToSpecialities() {
        var medic_1 = People.findOne({where: {peopleUUID: 'm-1'}});
        var medic_2 = People.findOne({where: {peopleUUID: 'm-2'}});
        var spec_1 = Specialities.findOne({where: {specialityId: '1'}});
        var spec_2 = Specialities.findOne({where: {specialityId: '2'}});
        var spec_3 = Specialities.findOne({where: {specialityId: '3'}});

        Promise.all([medic_1, medic_2])
        .then(response => {
            spec_1.then(spec => { spec.addMedic(response[0], {}) });
            spec_2.then(spec => { spec.addMedic(response[0], {}) });
            spec_2.then(spec => { spec.addMedic(response[1], {}) });
            spec_3.then(spec => {spec.addMedic(response[1], {}) });
        })
    }
}