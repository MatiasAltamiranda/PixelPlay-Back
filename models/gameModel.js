const { Schema, model} = require ("mongoose");
const slugify = require ("slugify");
const gameSchema = new Schema ({
    tittle : {
        type : String,
        require : [true, "El titulo es obligatorio"],
        minlength : 2,
        maxlength :50,
        trim: true
    },
    description : {
        type : String,
        require : [true, "La descripcion es obligatoria"],
        minlength : 10,
        maxlength :250,
        trim: true
    },
    franchise : {
        type : String,
        require : [true, "La franquisia es obligatoria"],
        minlength : 2,
        maxlength :50,
        trim: true
    },
    price:{
        type : Number,
        require : [true, "El precio es obligatorio"],
        maxlength :5,
        default : 0
    },
    isInOffer : {
        type : Boolean,
        default : false
    },
    developer : {
        type : String,
        minlength : 2,
        maxlength :150,
        require : [true, "El desarrollador es obligatorio"],
        trim: true
    }, 
    coverImage :{
        type : String
    },
    images:{
        type : Array
    },
    category:{
        type : Array
    },
    comments:{
        type : Array
    },
    slug : {
        type : String,
        unique : true
    }
},{
    timestamps : true
})

gameSchema.pre('save', function(next){
    this.slug = slugify(this.tittle,{lower : true})
    next();
})


const Game = model("Game", gameSchema);


module.exports = Game;