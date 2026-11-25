import mongoose ,{Document} from "mongoose";



interface IPartnerprofile{
    slug?:string;

    bio?:string;

    website?:string;

    socialLinks?:ISocialLinks;

}

interface ISocialLinks{
    youtube?:string;
    instagram?:string;
    linkedin?:string;
    github?:string;

}

interface IPaymentdetails{
    method: "upi"|"bank";

    upiId?:string;

    accountHolderName?:string;

    accountNumber?:string;

    ifscCode?:string;
}





export interface IUser extends Document {
    firebaseUid:string,

    name:string,

    email:String,

    role:"partner"|"admin",
    
    partnerProfile:IPartnerprofile,
    
    paymentDetails: IPaymentdetails,

    totalSales: number;

    totalRevenue:number;

    isActive:boolean;

    createdAt: Date;

    updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
    firebaseUid:{
        type:String,
        required:true,
        unique: true,
        index:true   
    },
    name:{
        type:String,
        required:true,
        trim: true
        
    },
    email:{
        type:String,
        required:true,
        trim: true,
        unique:true,
        index:true,
        lowercase:true
    },
    role:{
        type:String,
        enum:["partner","admin"],
        default: "partner"
    },
    partnerProfile:{
        slug: {
            type:String,
            unique:true,
            sparse:true
        },
        bio:{
            type:String,
            default:"", 
        },
        website:{
            type:String,
            default:"", 
        },
        socialLinks:{
            youtube:{
                type:String,
                default:"",
            },
            instagram:{
                type:String,
                default:"",
            },
            linkedin:{
                type:String,
                default:"",
            },
            github:{
                type:String,
                default:"",
            },

        }
    },

    paymentDetails:{
        methods:{
            type:String,
            enum:["upi","bank"],
            default:"upi",
        },
        upiId:{
            type:String,
            default:"",
        },
        accountHolderName:{
            type:String,
            default:"",
        },
        accountNumber:{
            type:String,
            default:""
        },
        ifscCode:{
            type:String,
            default:""
        }
    },

    totalSales:{
        type:Number,
        default:0,
        min:0
    },

    totalRevenue:{
        type:Number,
        defaut:0,
        min:0
    },
    isActive:{
        type:Boolean,
        default:true
    },


},{timestamps:true})

// Users without a partner profile have no slug. A normal unique index also
// indexes missing/null values, so keep uniqueness only for actual string slugs.
// userSchema.index(
//     { "partnerProfile.slug": 1 },
//     {
//         unique: true,
//         partialFilterExpression: { "partnerProfile.slug": { $type: "string" } },
//     }
// );

const User = mongoose.model("User",userSchema);
export default User;
