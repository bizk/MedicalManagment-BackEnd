const { User, People,Role, Specialities, Booking } = require('../models');

const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

module.exports = {
    
    createSampleData() {
        this.createUsers();
        this.createPeople();
        this.createRoles();
        this.createSpecialities();
        this.createBookings();
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

    createBookings() {
        Booking.bulkCreate([
            {bookingId: '1', day: '10/04/2020', time_start:'14:30', time_end:"15:30", status: ''},
            {bookingId: '2', day: '04/15/2020', time_start:'14:30', time_end:"15:30", status: ''},
            {bookingId: '3', day: '04/30/2020', time_start:'14:30', time_end:"15:30", status: ''},
            {bookingId: '4', day: '04/04/2020', time_start:'15:30', time_end:"16:30", status: ''},
            {bookingId: '5', day: '10/10/2020', time_start:'10:30', time_end:"11:30", status: 'canceled'},
            {bookingId: '6', day: '4/16/2020', time_start:'20:30', time_end:"22:30", status: 'canceled'},
        ]).then(() =>{
            let med1 = People.findOne({where: {userUUID: 'm-1'}});
            let med2 = People.findOne({where: {userUUID: 'm-2'}});
            let pat1 = People.findOne({where: {userUUID: 'p-1'}});
            let pat2 = People.findOne({where: {userUUID: 'p-2'}});
            
            let booking_1 = Booking.findOne({where: {bookingId: '1'}});
            let booking_2 = Booking.findOne({where: {bookingId: '2'}});
            let booking_3 = Booking.findOne({where: {bookingId: '3'}});
            let booking_4 = Booking.findOne({where: {bookingId: '4'}});
            let booking_5 = Booking.findOne({where: {bookingId: '5'}});

            let spec_1 = Specialities.findOne({where: {specialityId: '1'}})
            createBooking(booking_1, pat1, med1, spec_1);
        });

        function createBooking(booking, patient, medic, spec) {
            Sequelize.Promise.all([booking, patient, medic, spec]).spread((Booking, Patient, Medic, Spec) => {
                Booking.setPatient(Patient);
                Booking.setMedic(Medic);
                Booking.setSpeciality(Spec);
            });
        }
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
        ]).then(() => {
            var spec_1 = Specialities.findOne({where: {specialityId: '1'}});
            var spec_2 = Specialities.findOne({where: {specialityId: '2'}});
            var spec_3 = Specialities.findOne({where: {specialityId: '3'}});
            let med1 = People.findOne({where: {userUUID: 'm-1'}})
            let med2 = People.findOne({where: {userUUID: 'm-2'}})

            Sequelize.Promise.all([spec_1, med1]).spread((Spec, Medic_1) => {
                return Spec.addMedic([Medic_1]);
            });

            Sequelize.Promise.all([spec_2, med1, med2]).spread((Spec, Medic_1, Medic_2) => {
                return Spec.addMedic([Medic_1, Medic_2]);
            });

            
            Sequelize.Promise.all([spec_3, med2]).spread((Spec, Medic) => {
                return Spec.addMedic([Medic]);
            });
        });
    },
}