const mongoose = require('mongoose');

const Artigo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: [
        {
            publicPlace: String,
            number: Number,
            district: String,
            city: String,
            state: String,
        },       {
            unique: true
        }
    ]
},
    {
        timestamps: true,
    });

mongoose.model('artigo', Artigo);
//exportando a model