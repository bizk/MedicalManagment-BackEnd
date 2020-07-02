const { User, People,Role, Specialities, Booking, MedicWorkHours, WaitList } = require('../models');
var moment = require('moment');
var localDay = moment().format("YYYY-MM-DD");

const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

module.exports = {
    
    createSampleData() {
        this.createUsers();
        this.createPeople();
        this.createRoles();
        this.createSpecialities();
    },

    createUsers() {
        User.bulkCreate([
            {userUUID: 'p-1', mail: 'paciente1', password: "abc123"},
            {userUUID: 'p-2', mail: 'paciente2', password: "abc456"},
            {userUUID: 'm-1', mail: 'medico1', password: "abc123"},
            {userUUID: 'm-2',mail: 'medico2', password: "abc456"},
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

    createMedWorkHS() {
        MedicWorkHours.bulkCreate([
            {id: '1', day:moment().add(1,'day'), startHour: "08:00", finishHour: "20:00"},
            {id: '2', day:moment().add(1,'day'), startHour: "08:00", finishHour: "20:00"},
            {id: '3', day:moment().add(1,'day'), startHour: "08:00", finishHour: "20:00"},
            {id: '4',day:moment().add(1,'day'), startHour: "10:30", finishHour: "15:45"},
            {id: '5',day:moment().add(1,'day'), startHour: "10:30", finishHour: "15:45"},
        ]).then(() => {
            let med1 = People.findOne({where: {userUUID: 'm-1'}});
            let med2 = People.findOne({where: {userUUID: 'm-2'}});
            let spec_1 = Specialities.findOne({where: {specialityId: '1'}});
            let spec_2 = Specialities.findOne({where: {specialityId: '2'}});
            let spec_3 = Specialities.findOne({where: {specialityId: '3'}});
            
            let medWorkHs1 = MedicWorkHours.findOne({where: {id: '1'}});
            let medWorkHs1_2 = MedicWorkHours.findOne({where: {id: '2'}});
            let medWorkHs2 = MedicWorkHours.findOne({where: {id: '3'}});
            let medWorkHs2_2 = MedicWorkHours.findOne({where: {id: '4'}});
            // createWorkHs(medWorkHs1, med1, spec_1);
            // createWorkHs(medWorkHs1_2, med1, spec_2);
            // createWorkHs(medWorkHs2, med2, spec_2);
            // createWorkHs(medWorkHs2_2, med2, spec_3);

        });

        function createWorkHs(wkhs, med, spec) {
            Sequelize.Promise.all([wkhs, med, spec]).spread((WkHs, Medic, Spec) => {
                Medic.addMedicWorkingHours(WkHs);
                Spec.addMedicWorkingHours(WkHs);
            });
        }
    },

    createBookings() {
        let x = moment(localDay).add(2, `h`)
        
        let pata = moment().add(1,"d").add(1, "M").toDate()
        let oneMonth = moment().add(1,"M");
        let twoMonths = moment().add(2,"M").add(1,"d");

        let date = moment().toDate();
        Booking.bulkCreate([
            {bookingId: '1', day: date, time_start:'09:50', time_end:"15:30", status: ''},
            {bookingId: '2', day: date, time_start:'01:30', time_end:"02:30", status: ''},
            {bookingId: '5', day: twoMonths, time_start:'20:50', time_end:"21:30", status: 'reservado'},
            {bookingId: '3', day: oneMonth, time_start:'14:30', time_end:"15:30", status: ''},
            {bookingId: '4', day: twoMonths, time_start:'15:30', time_end:"16:30", status: 'canceledMedicCentre'},
            // {bookingId: '5', day: '10/10/2020', time_start:'10:30', time_end:"11:30", status: 'canceled'},
            {bookingId: '6', day: moment(), time_start:'13:00', time_end:"20:00", status: ''},
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
            let booking_6 = Booking.findOne({where: {bookingId: '6'}});

            let spec_1 = Specialities.findOne({where: {specialityId: '1'}})
            let spec_2 = Specialities.findOne({where: {specialityId: '2'}})
            let spec_3 = Specialities.findOne({where: {specialityId: '3'}})
            
            createBooking(booking_1, pat1, med1, spec_1);
            createBooking(booking_2, pat1, med1, spec_2);
            createBooking(booking_4, pat1, med1, spec_2);
            createBooking(booking_3, pat1, med2, spec_2);
            createBooking(booking_5, pat1, med2, spec_3);
            createBooking(booking_6, pat2, med2, spec_2);
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
        ])
        .then(() => {
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

            Sequelize.Promise.all([spec_1, spec_2, spec_3]).spread((Spec1, Spec2, Spec3) => {
                WaitList.create({id: 1}).then(wl => wl.setSpeciality(Spec1)).catch(e => console.log(e));
                WaitList.create({id: 2}).then(wl => wl.setSpeciality(Spec2)).catch(e => console.log(e));
                WaitList.create({id: 3}).then(wl => wl.setSpeciality(Spec3)).catch(e => console.log(e));            
            })
        });
    },
}