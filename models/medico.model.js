const {Schema, model} = require('mongoose');


const MedicoSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId, // related to user
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId, // related to user
        ref: 'Hospital'
    }
});

MedicoSchema.method('toJSON', function () {
    const {__v, ...object} = this.toObject();
    return {...object};
});

module.exports = model('Medico', MedicoSchema);
