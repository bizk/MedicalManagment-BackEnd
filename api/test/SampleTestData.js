const { User, People,Role, Specialities, Booking } = require('../models');

const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

module.exports = {
    
    createSampleData() {
        this.createUsers();
        this.createPeople();
        this.createRoles();
    },

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
            {userUUID: 'p-1', name: 'Susie', sureName: 'Cain', dni: '1417134111'},
            {userUUID: 'p-2', name: 'Landon', sureName: 'Turner', dni: '3788995246'},
            {userUUID: 'm-1', name: 'Jesus', sureName: 'Powell', dni: '4188701215'},
            {userUUID: 'm-2', name: 'Hannah', sureName: 'Clayton', dni: '3072954121'}
        ])
    },

    createRoles() {
        Role.bulkCreate([
            {roleUUID: '1',role: 'medic'},
            {roleUUID:'2',role: 'patient'},
            {roleUUID:'3',role: 'medicCentre'},
        ]).then(() => {
            let medicRole = Role.findOne({where: {roleUUID: '1'}});
            let med1 = People.findOne({where: {userUUID: 'm-1'}})
            let med2 = People.findOne({where: {userUUID: 'm-2'}})
            Sequelize.Promise.all([medicRole, med1, med2]).spread((Role, Medic_1, Medic_2) => {
                return Role.addPeople([Medic_1, Medic_2]);
            });

            let patientRole = Role.findOne({where: {roleUUID: '2'}});
            let pat1 = People.findOne({where: {userUUID: 'p-1'}})
            let pat2 = People.findOne({where: {userUUID: 'p-2'}})
            Sequelize.Promise.all([patientRole, pat1, pat2]).spread((Role, S_1, S_2) => {
                return Role.addPeople([S_1, S_2]);
            });
        })
    },

    createSpecialities() {
        Specialities.bulkCreate([
            {specialityId: '1', type: "Hearth Disease"},
            {specialityId: '2', type: "Pulmonar Disease"},
            {specialityId: '3', type: "Bone Disease"},
        ])
    },

    addMedicToSpecialities() {
        let medic_1 = People.findOne({where: {peopleUUID: 'm-1'}});
        let medic_2 = People.findOne({where: {peopleUUID: 'm-2'}});
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
    },

    createBookings() {
        console.log("!!!!!!!!!!!!!!!!!!!")
        Booking.bulkCreate([
            {bookingId: '1',day: '1/4/2020', time_start: '14:00', time_end: '15:00', status: ''},
            {bookingId: '2',day: '1/4/2020', time_start: '15:00', time_end: '16:00', status: ''},
            {bookingId: '3',day: '3/4/2020', time_start: '14:00', time_end: '15:00', status: ''}
        ]);
        
        var m_1 = People.findOne({where: {peopleUUID: 'm-1'}});
        var m_2 = People.findOne({where: {peopleUUID: 'm-2'}});
        var p_1 = People.findOne({where: {peopleUUID: 'p-1'}});
        var p_2 = People.findOne({where: {peopleUUID: 'p-2'}});
        
        var b_1 = Booking.findOne({where: {bookingId: '1'}});

        Promise.all([b_1, p_1])
        .then(response => {
            response[0].addMedic(m_1);
        })
        // var medic_1 = People.findOne({where: {peopleUUID: 'm-1'}});
        // Promise.all([medic_1, medic_2])
        // .then(response => {
        //     spec_1.then(spec => { spec.addMedic(response[0], {}) });
        //     spec_2.then(spec => { spec.addMedic(response[0], {}) });
        //     spec_2.then(spec => { spec.addMedic(response[1], {}) });
        //     spec_3.then(spec => {spec.addMedic(response[1], {}) });
        // })
    }
}